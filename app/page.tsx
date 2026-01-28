import Navbar from "@/components/navbar";
import { getCurrentUser } from "@/lib/auth"; 
import { ArrowRight, Box, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();
  
  const heroButtonHref = user ? "/dashboard" : "/handler/sign-in";
  const heroButtonText = user ? "Go to Dashboard" : "Get Started Free";

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 overflow-hidden relative">
      
      {/* 1. Add Navbar */}
      <Navbar />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-100/50 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-100/50 rounded-full blur-[100px] -z-10" />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 -z-10"></div>

      <div className="container mx-auto px-4 pt-32 pb-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto z-10 relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            v2.0 is now live
          </div>

          {/* Hero Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight text-slate-900">
            Inventory control <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x">
              for modern teams.
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
            Stop guessing and start scaling. Real-time tracking, AI-driven
            predictions, and automated reordering in one stunning dashboard.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href={heroButtonHref} // 👈 Dynamic link based on login status
              className="group flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
            >
              {heroButtonText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-sm"
            >
              View Demo
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex items-center gap-8 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>14-day free trial</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview Image/Mockup */}
        <div className="mt-20 relative mx-auto max-w-5xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10"></div>

          <div className="relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xl shadow-slate-200/50">
            <div className="h-10 border-b border-slate-100 bg-slate-50/50 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/20"></div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white">
              {/* Card 1 */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <Box size={18} />
                  </div>
                  <span className="text-slate-500 text-sm">Total Products</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">1,284</div>
              </div>
              {/* Card 2 */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <TrendingUp size={18} />
                  </div>
                  <span className="text-slate-500 text-sm">Revenue</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">$48,290</div>
              </div>
              {/* Card 3 */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                <div className="h-2 w-24 bg-slate-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-slate-200 rounded"></div>
                  <div className="h-1.5 w-3/4 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}