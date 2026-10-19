import { useMemo, useState } from "react";
import { affixLabel } from "../data/affixes";
import { SAMPLE_IMPORT } from "../data/sampleBuild";
import { SLOTS } from "../data/slots";
import { searchAffixes } from "../lib/identify";
import { parseBuildText, serializeBuild } from "../lib/build";
import type { Build, SlotId } from "../types";

type Props = {
  build: Build;
  selectedSlot: SlotId;
  onSelectSlot: (slot: SlotId) => void;
  onChange: (build: Build) => void;
};

export function BuildStudio({ build, selectedSlot, onSelectSlot, onChange }: Props) {
  const [query, setQuery] = useState("");
  const [importText, setImportText] = useState(SAMPLE_IMPORT);
  const selected = build.slots[selectedSlot];
  const results = useMemo(() => searchAffixes(query).slice(0, 18), [query]);

  function patch(partial: Partial<Build>) {
    onChange({ ...build, ...partial });
  }

  function setSlot(ids: string[]) {
    onChange({ ...build, slots: { ...build.slots, [selectedSlot]: ids } });
  }

  function addAffix(id: string) {
    if (selected.includes(id)) return;
    setSlot([...selected, id]);
  }

  return (
    <div className="layout">
      <section className="panel">
        <h2>Slots</h2>
        <div className="slot-grid">
          {SLOTS.map((slot) => {
            const count = build.slots[slot.id].length;
            return (
              <button
                key={slot.id}
                className="slot-btn"
                aria-pressed={selectedSlot === slot.id}
                onClick={() => onSelectSlot(slot.id)}
              >
                {slot.labelPt}
                <small>
                  <span className="slot-count">{count}</span> afixos alvo
                </small>
              </button>
            );
          })}
        </div>
      </section>

      <section className="panel">
        <h2>{SLOTS.find((slot) => slot.id === selectedSlot)?.labelPt} — linhas da build</h2>
        <p className="lede">
          Estas são as linhas que o OCR vai procurar no tooltip. Verde se o item tiver, vermelho se faltar.
        </p>
        <div className="affix-list">
          {selected.length === 0 && <p className="lede">Nenhum afixo neste slot. Busque à direita e adicione.</p>}
          {selected.map((id) => (
            <div className="affix-row" key={id}>
              <div>
                <strong>{affixLabel(id, "en")}</strong>
                <div className="sub" style={{ color: "var(--muted)", fontSize: 13 }}>
                  {affixLabel(id, "pt")}
                </div>
              </div>
              <button className="remove" onClick={() => setSlot(selected.filter((item) => item !== id))}>
                remover
              </button>
            </div>
          ))}
        </div>
        <input
          className="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar afixo: dexterity, vulnerable, crítica..."
        />
        <div className="picker">
          {results.map((affix) => (
            <button key={affix.id} onClick={() => addAffix(affix.id)} disabled={selected.includes(affix.id)}>
              {affix.name}
              <div className="sub">{affix.namePt}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Importar build</h2>
        <div className="meta">
          <input value={build.name} onChange={(event) => patch({ name: event.target.value })} placeholder="Nome da build" />
          <input
            value={build.className}
            onChange={(event) => patch({ className: event.target.value })}
            placeholder="Classe"
          />
        </div>
        <textarea value={importText} onChange={(event) => setImportText(event.target.value)} />
        <div className="row-actions">
          <button className="btn" onClick={() => onChange(parseBuildText(importText))}>
            Importar texto
          </button>
          <button className="btn-ghost" onClick={() => setImportText(serializeBuild(build))}>
            Exportar atual
          </button>
        </div>
        <p className="lede" style={{ marginTop: 12 }}>
          Formato: um slot entre colchetes e uma linha de afixo por linha. Import de URL Maxroll fica para a próxima fase.
        </p>
      </section>
    </div>
  );
}
