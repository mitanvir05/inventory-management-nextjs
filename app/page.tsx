import Link from "next/link";
import { ArrowRight, Box, CheckCircle2, TrendingUp } from "lucide-react";

export default async function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-indigo-500 selection:text-white overflow-hidden relative">
      {/* Background Gradients & Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>

      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto z-10 relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            v2.0 is now live
          </div>

          {/* Hero Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            Inventory control <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
              for modern teams.
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
            Stop guessing and start scaling. Real-time tracking, AI-driven
            predictions, and automated reordering in one stunning dashboard.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/sign-in"
              className="group flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_-5px_rgba(79,70,229,0.6)]"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-semibold backdrop-blur-sm transition-all duration-200"
            >
              View Demo
            </Link>
          </div>

          {/* Social Proof / Stats */}
          <div className="mt-12 flex items-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>14-day free trial</span>
            </div>
          </div>
        </div>

        {/* Abstract Dashboard Visual (CSS Only) */}
        <div className="mt-20 relative mx-auto max-w-5xl">
          {/* Glow behind the dashboard */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20"></div>

          <div className="relative bg-[#131722] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            {/* Window Header */}
            <div className="h-10 border-b border-white/5 bg-[#1A1F2E] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>

            {/* Dashboard Content Mockup */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white/5 border border-white/5 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                    <Box size={18} />
                  </div>
                  <span className="text-slate-400 text-sm">Total Products</span>
                </div>
                <div className="text-2xl font-bold text-white">1,284</div>
              </div>
              {/* Card 2 */}
              <div className="bg-white/5 border border-white/5 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                    <TrendingUp size={18} />
                  </div>
                  <span className="text-slate-400 text-sm">Revenue</span>
                </div>
                <div className="text-2xl font-bold text-white">$48,290</div>
              </div>
              {/* Card 3 */}
              <div className="bg-white/5 border border-white/5 p-4 rounded-lg">
                <div className="h-2 w-24 bg-white/10 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-white/5 rounded"></div>
                  <div className="h-1.5 w-3/4 bg-white/5 rounded"></div>
                </div>
              </div>
            </div>

            {/* Fake Table Lines */}
            <div className="px-6 pb-6 space-y-3 opacity-50">
              <div className="h-12 w-full bg-white/5 rounded-lg border border-white/5"></div>
              <div className="h-12 w-full bg-white/5 rounded-lg border border-white/5"></div>
              <div className="h-12 w-full bg-white/5 rounded-lg border border-white/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
