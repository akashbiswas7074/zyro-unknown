
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const SineWaveTimeline = () => {
  const [phases] = useState([
    { year: '2021', title: 'Foundation', desc: 'Company established', color: 'from-blue-500 to-cyan-500' },
    { year: '2022', title: 'Seed Round', desc: '$5M funding secured', color: 'from-purple-500 to-pink-500' },
    { year: '2023', title: 'Product Launch', desc: 'Version 1.0 released', color: 'from-green-500 to-emerald-500' },
    { year: '2024', title: 'Series A', desc: '$15M investment', color: 'from-orange-500 to-red-500' },
    { year: '2025', title: 'Global Expansion', desc: 'Entered 10+ markets', color: 'from-indigo-500 to-blue-500' },
    { year: '2026', title: 'AI Scaling', desc: 'Infrastructure grows worldwide', color: 'from-pink-500 to-red-500' },
  ]);

  // Duplicate for infinite loop
  const infinitePhases = [...phases, ...phases];

  const pathRef = useRef<SVGPathElement>(null);

  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  // ✅ Smooth Motion Value (no lag)
  const x = useMotionValue(0);

  // Calculate curve points
  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    const calculatedPoints = infinitePhases.map((_, i) => {
      const point = path.getPointAtLength(
        (length / (infinitePhases.length - 1)) * i
      );
      return { x: point.x, y: point.y };
    });

    setPoints(calculatedPoints);
  }, []);

  // ✅ Smooth Trackpad Swipe Scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();

        // Smooth update (no React re-render)
        x.set(x.get() - e.deltaX * 0.9);

        // Infinite wrap
        if (x.get() < -1000) x.set(0);
        if (x.get() > 0) x.set(-1000);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => window.removeEventListener('wheel', handleWheel);
  }, [x]);

  return (
  <div className="w-screen h-screen bg-black p-0 overflow-hidden flex items-center justify-center">

      <div className="w-full h-full">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-8xl md:text-5xl font-bold text-white mb-4">
          Events
          </h2>
        
        </div>

        {/* Timeline */}
        <div className="relative h-[600px] overflow-hidden">
          {/* Smooth Road Wrapper */}
          <motion.div style={{ x }} className="absolute inset-0 w-[200%]">
            {/* SVG Road */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 2000 200"
              preserveAspectRatio="none"
            >
              <path
                ref={pathRef}
                d="
                  M 0,100
                  C 200,30 300,170 500,100
                  S 800,30 1000,100
                  S 1300,170 1500,100
                  S 1800,30 2000,100
                "
                stroke="url(#roadGradient)"
                strokeWidth="5"
                fill="none"
                strokeDasharray="15 15"
                strokeLinecap="round"
              >
                {/* Moving Road Animation */}
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-300"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>

              <defs>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>

            {/* Pins */}
            <div className="relative h-full">
              {points.map((p, index) => {
                const phase = infinitePhases[index];

                const curveX = (p.x / 2000) * 100;
                const curveY = (p.y / 200) * 100;

                return (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      left: `${curveX}%`,
                      top: `${curveY}%`,
                      transform: 'translate(-50%, 0%)',
                    }}
                  >
                    {/* Stick */}
                    <div className="absolute left-1/2 w-[2px] h-[35px] bg-blue-400 bottom-0 -translate-x-1/2" />

                    {/* Orb */}
                    <div className="absolute left-1/2 bottom-[35px] -translate-x-1/2 group">
                      <div
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center border-4 border-gray-900 shadow-xl group-hover:scale-125 transition-transform`}
                      >
                        <span className="text-white font-bold">
                          {phase.year.slice(2)}
                        </span>
                      </div>

                      {/* Hover Card */}
                      <div className="absolute left-1/2 -translate-x-1/2 w-60 p-4 bg-gray-800 rounded-xl mt-5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="text-white font-bold">{phase.title}</h3>
                        <p className="text-gray-300 text-sm">{phase.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default SineWaveTimeline;
