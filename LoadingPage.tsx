import { motion } from 'motion/react';

export function LoadingPage() {
  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-[#E9F0F1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col items-center"
        style={{ gap: '0px' }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* ORDINO Logo */}
        <motion.h1 
          className="font-bold text-[#E9F0F1] leading-normal"
          style={{ 
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontVariationSettings: "'opsz' 14, 'wdth' 100",
            textShadow: 'rgba(0,0,0,0.33) 0px 3px 10px',
            marginBottom: '-8px',
            fontSize: 'clamp(64px, 12vw, 96px)'
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          ORDINO
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-[#686867] leading-normal"
          style={{ 
            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
            marginLeft: '10px',
            fontSize: 'clamp(16px, 3vw, 24px)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Financial Insights Made Easy
        </motion.p>

        {/* Loading Animation */}
        <motion.div
          className="flex gap-1 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="size-3 rounded-full bg-[#686867]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}