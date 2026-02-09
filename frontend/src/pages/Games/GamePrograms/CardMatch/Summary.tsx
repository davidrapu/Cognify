
export default function Summary() {
  return (
    <div
      className="bg-secondary/25 w-180 p-3 rounded-[30px] space-y-5 animate-in fade-in slide-in-from-right-30 duration-500"
    >
      <p>Game Complete</p>
      <p>Rank: X</p>
      <p>Memory Level: X</p>
      <div className="flex flex-col">
        <p>Score: X</p>
        <p>Time: X</p>
        <p>Accuracy: X%</p>
      </div>
      <div className="flex flex-col">
        <p>Stats</p>
        <ul>
            <li>Moves: X</li>
            <li>Best Streak: X</li>
        </ul>
      </div>
      <p>Difficulty: X</p>
    </div>
  );
}
