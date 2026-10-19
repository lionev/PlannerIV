import { useEffect, useMemo, useState } from "react";
import { SLOTS } from "../data/slots";
import { compareParseToBuild } from "../lib/match";
import { imageFileToImage, recognizeItemImage } from "../lib/ocr";
import { parseTooltipText } from "../lib/parseTooltip";
import { SYNTHETIC_CASES, renderSyntheticTooltip } from "../lib/synthetic";
import type { Build, CompareResult, SlotId, SyntheticCase } from "../types";
import { MatchBoard } from "./MatchBoard";

type CaseRun = {
  id: string;
  preview: string;
  ocrText: string;
  result?: CompareResult;
  truth?: CompareResult;
  passed?: boolean;
  error?: string;
};

type Props = {
  build: Build;
  selectedSlot: SlotId;
};

function sameRequiredHits(a?: CompareResult, b?: CompareResult): boolean {
  if (!a || !b) return false;
  const ids = (result: CompareResult, status: "hit" | "miss") =>
    result.matches.filter((match) => match.status === status).map((match) => match.affixId).sort().join("|");
  return ids(a, "hit") === ids(b, "hit") && ids(a, "miss") === ids(b, "miss");
}

function truthFromCase(spec: SyntheticCase, desired: string[]): CompareResult {
  return compareParseToBuild(parseTooltipText(spec.affixes.join("\n"), spec.itemName), desired);
}

export function OcrLab({ build, selectedSlot }: Props) {
  const desired = build.slots[selectedSlot];
  const [runs, setRuns] = useState<CaseRun[]>(() =>
    SYNTHETIC_CASES.map((spec) => ({
      id: spec.id,
      preview: "",
      ocrText: "",
    })),
  );
  const [busy, setBusy] = useState(false);
  const [uploadResult, setUploadResult] = useState<CompareResult | undefined>();
  const [uploadText, setUploadText] = useState("");
  const [uploadPreview, setUploadPreview] = useState("");

  useEffect(() => {
    setRuns(
      SYNTHETIC_CASES.map((spec) => ({
        id: spec.id,
        preview: renderSyntheticTooltip(spec).toDataURL("image/png"),
        ocrText: "",
      })),
    );
  }, []);

  const score = useMemo(() => {
    const done = runs.filter((run) => run.passed !== undefined);
    const passed = done.filter((run) => run.passed).length;
    return { done: done.length, passed };
  }, [runs]);

  async function runAll() {
    setBusy(true);
    try {
      const next: CaseRun[] = [];
      for (const spec of SYNTHETIC_CASES) {
        const canvas = renderSyntheticTooltip(spec);
        const truth = truthFromCase(spec, desired);
        try {
          const text = await recognizeItemImage(canvas);
          const result = compareParseToBuild(parseTooltipText(text, spec.itemName), desired);
          next.push({
            id: spec.id,
            preview: canvas.toDataURL("image/png"),
            ocrText: text,
            result,
            truth,
            passed: sameRequiredHits(result, truth),
          });
        } catch (error) {
          next.push({
            id: spec.id,
            preview: canvas.toDataURL("image/png"),
            ocrText: "",
            truth,
            passed: false,
            error: error instanceof Error ? error.message : "Falha no OCR",
          });
        }
        setRuns([...next, ...SYNTHETIC_CASES.slice(next.length).map((pending) => ({
          id: pending.id,
          preview: renderSyntheticTooltip(pending).toDataURL("image/png"),
          ocrText: "",
        }))]);
      }
    } finally {
      setBusy(false);
    }
  }

  async function onUpload(file: File) {
    setBusy(true);
    try {
      setUploadPreview(URL.createObjectURL(file));
      const image = await imageFileToImage(file);
      const text = await recognizeItemImage(image);
      setUploadText(text);
      setUploadResult(compareParseToBuild(parseTooltipText(text, file.name), desired));
    } finally {
      setBusy(false);
    }
  }

  const slotLabel = SLOTS.find((slot) => slot.id === selectedSlot)?.labelPt ?? selectedSlot;

  return (
    <div>
      <div className="ocr-head">
        <div>
          <div className="eyebrow">Protótipo</div>
          <h2>10 prints sintéticos + print real</h2>
          <p className="lede">
            Comparando contra <strong>{build.name}</strong> / slot <strong>{slotLabel}</strong>. O OCR precisa
            chegar no mesmo verde/vermelho que a leitura perfeita do texto desenhado.
          </p>
        </div>
        <div>
          <div className="score">
            {score.passed}/{score.done || 10} casos
          </div>
          <button className="btn" onClick={runAll} disabled={busy || desired.length === 0}>
            {busy ? "Lendo tooltips..." : "Rodar OCR nos 10"}
          </button>
        </div>
      </div>

      {desired.length === 0 && <p className="lede">Escolha afixos no slot da build antes de testar o OCR.</p>}

      <div className="cases">
        {SYNTHETIC_CASES.map((spec, index) => {
          const run = runs[index];
          return (
            <article className="panel case-card" key={spec.id}>
              <span className={`badge ${run?.passed === true ? "ok" : run?.passed === false ? "bad" : ""}`}>
                {spec.difficulty === "hard" ? "difícil" : "controle"}
                {run?.passed === true ? " · passou" : run?.passed === false ? " · divergiu" : ""}
              </span>
              <h3>{spec.title}</h3>
              {run?.preview && <img src={run.preview} alt={spec.title} />}
              <MatchBoard result={run?.result} emptyLabel="Ainda não rodou." />
              <p className="lede" style={{ marginTop: 8 }}>OCR bruto</p>
              <pre className="raw">{run?.error || run?.ocrText || "—"}</pre>
            </article>
          );
        })}
      </div>

      <section className="panel upload">
        <div>
          <h2>Print real do D4</h2>
          <p className="lede">
            Recorte só o tooltip e envie. Isto é o teste que importa: o sintético só prova o matcher.
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void onUpload(file);
            }}
          />
          {uploadPreview && <img className="preview" src={uploadPreview} alt="Print enviado" style={{ marginTop: 12 }} />}
        </div>
        <div>
          <MatchBoard result={uploadResult} emptyLabel="Envie um recorte de tooltip para comparar com a build." />
          <p className="lede" style={{ marginTop: 12 }}>OCR bruto</p>
          <pre className="raw">{uploadText || "—"}</pre>
        </div>
      </section>
    </div>
  );
}
