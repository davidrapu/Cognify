
import { motion } from "framer-motion";

export default function DigitalSpan() {
  return (
    <div className="flex flex-1 w-full items-center justify-center backdrop-blur-sm drop-shadow-xl/30">
      <motion.div initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}} transition={{ duration: 0.7 }} className="bg-secondary min-h-170 aspect-video rounded-2xl border">

      </motion.div>
    </div>
  )
}
