import { motion } from 'motion/react';
import { Target, Zap, TrendingDown } from 'lucide-react';

export function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="py-20 px-6 text-center max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-100 p-3 rounded-2xl">
            <Target className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 font-sans">
          Stop Burning Your Startup's Runway on <span className="text-emerald-600">AI Overspend.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Get a 2-minute financial audit of your AI stack. Discover hidden savings, plan downgrades, and credit opportunities that your CFO will love.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onStart}
            id="cta-start-audit"
            className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 text-lg shadow-lg shadow-emerald-200"
          >
            Audit My Stack — Free <Zap className="w-5 h-5 fill-current" />
          </button>
          <div className="flex items-center gap-2 px-4 py-2 text-gray-500 text-sm italic">
            <TrendingDown className="w-4 h-4" />
            Average savings: $2,400/yr
          </div>
        </div>
      </motion.div>
    </section>
  );
}
