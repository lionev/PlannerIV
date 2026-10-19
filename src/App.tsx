import { useEffect, useState } from "react";
import { BuildStudio } from "./components/BuildStudio";
import { OcrLab } from "./components/OcrLab";
import { loadBuild, saveBuild } from "./lib/build";
import type { Build, SlotId } from "./types";

type View = "build" | "ocr";

export default function App() {
  const [view, setView] = useState<View>("build");
  const [build, setBuild] = useState<Build>(loadBuild);
  const [selectedSlot, setSelectedSlot] = useState<SlotId>("gloves");

  useEffect(() => {
    saveBuild(build);
  }, [build]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">PlannerIV · fase 0</div>
          <h1>Comparar item com a build</h1>
          <p className="lede">
            Importe as linhas que a build pede em cada slot. Depois rode o laboratório de OCR em 10
            tooltips sintéticos — o mesmo caminho que um Ctrl+D usaria no jogo, sem overlay ainda.
          </p>
        </div>
        <nav className="tabs" aria-label="Seções">
          <button className="tab" aria-selected={view === "build"} onClick={() => setView("build")}>
            Build
          </button>
          <button className="tab" aria-selected={view === "ocr"} onClick={() => setView("ocr")}>
            Laboratório OCR
          </button>
        </nav>
      </header>

      {view === "build" ? (
        <BuildStudio
          build={build}
          selectedSlot={selectedSlot}
          onSelectSlot={setSelectedSlot}
          onChange={setBuild}
        />
      ) : (
        <OcrLab build={build} selectedSlot={selectedSlot} />
      )}
    </div>
  );
}
