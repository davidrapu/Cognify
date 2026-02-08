import { motion } from "framer-motion";

export default function Summary() {
  return (
    <motion.div
      key="3"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary/25 w-180 p-3 rounded-[30px] space-y-5"
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
    </motion.div>
  );
}
