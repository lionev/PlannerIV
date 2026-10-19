import type { AffixMatch, CompareResult } from "../types";

function Mark({ status }: { status: AffixMatch["status"] }) {
  return <i className={`mark ${status}`} aria-hidden="true" />;
}

export function MatchBoard({ result, emptyLabel }: { result?: CompareResult; emptyLabel: string }) {
  if (!result) {
    return <p className="lede">{emptyLabel}</p>;
  }

  return (
    <div>
      <p className="score">
        {result.hits}/{result.required}
      </p>
      <div className="squares" style={{ marginTop: 10 }}>
        {result.matches.map((match) => (
          <div className={`square ${match.status}`} key={`${match.status}-${match.affixId}-${match.sourceLine ?? ""}`}>
            <Mark status={match.status} />
            <span>
              {match.label}
              {match.status === "miss" ? " — faltando" : ""}
              {match.status === "extra" ? " — extra" : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
