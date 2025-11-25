import { motion } from "framer-motion";

export function VoiceVisualizer({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex items-center justify-center gap-1 h-8">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-primary rounded-full"
          animate={
            isActive
              ? {
                  height: [8, 24, 8],
                  opacity: [0.5, 1, 0.5],
                }
              : {
                  height: 4,
                  opacity: 0.3,
                }
          }
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
