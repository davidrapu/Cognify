export default function ScoreMeter({
  score,
  max = 30,
}: {
  score: number;
  max?: number;
}) {
  //   const percent = (score / max) * 100;
  const [interpretation, context] = getScoreInterpretation(score);
  return (
    <div className="space-y-3">
      <div className="space-y-1 flex flex-col w-fit">
        <div className="flex gap-1 flex-wrap">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={`h-5 w-3 rounded-sm ${
                i < score ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <p className="font-medium ">
          <span className="text-primary">{score}</span> / {max} points
        </p>
      </div>
      <ul className="font-medium list-decimal pl-4 text-muted-foreground space-y-2 ">
        <li>{interpretation}</li>
        <li>{context}</li>
      </ul>
    </div>
  );
}

function getScoreInterpretation(score: number): [string, string] {
  if (score >= 26) {
    return [
      "This score suggests performance within the typical range across the assessed cognitive domains. Responses indicate generally intact attention, memory, and reasoning skills at the time of assessment.",
      "Cognitive performance can vary depending on factors such as fatigue, stress, and test familiarity.",
    ];
  } else if (score >= 20) {
    return [
      "This score indicates performance below the typical range on some aspects of the screening. Variability in attention, memory, or processing speed may have influenced the result.",
      "Temporary factors such as tiredness, distraction, or anxiety can affect performance on short cognitive tasks.",
    ];
  }
  return [
    "This score suggests reduced performance across several areas assessed in this screening. While this result alone does not indicate a diagnosis, it may be useful to seek further evaluation or repeat the assessment under different conditions.",
    "Only qualified healthcare professionals can provide clinical assessment or diagnosis.",
  ];
}
