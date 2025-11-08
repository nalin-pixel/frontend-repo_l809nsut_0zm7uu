import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero3D() {
  return (
    <section className="relative w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/80" />

      <div className="relative z-10 h-full flex items-end p-6 md:p-10">
        <div className="max-w-2xl text-white/90">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs md:text-sm mb-3 border border-white/10">
            <Rocket className="h-3.5 w-3.5" />
            <span>Minimal, glass-morphic finance dashboard</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight leading-tight">
            Track your money daily with effortless swipes
          </h1>
          <p className="mt-2 text-sm md:text-base text-white/70">
            Review transactions, apply smart rules, and keep categories clean. Optimized for fast, delightful micro-interactions.
          </p>
        </div>
      </div>
    </section>
  );
}
