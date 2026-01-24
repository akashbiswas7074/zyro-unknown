
'use client';

import { motion } from 'framer-motion';
import { Reveal } from './AdvancedAnimations';
import ForestTimeline from "./ForestTimeline";
import MobileVerticalTimeline from "./MobileVerticalTimeline";


const businessComponents = [
  {
    id: 1,
    number: '01',
    date: 'Phase 1',
    title: 'Node Pools',
    description: 'Distributed computing network',
    color: '#00E08F',
    position: { top: '5%', left: '18%' }, // ✅ fixed
    border: 'right-bottom',
    lineAngle: 35,
    lineLength: 100,
  },
  {
    id: 2,
    number: '02',
    date: 'Core',
    title: 'Zyro AI Infrastructure DePIN',
    description: 'Decentralized infrastructure',
    color: '#00E08F',
    position: { top: '0%', left: '42%', transform: 'translateX(-50%)' }, // ✅ fixed
    border: 'bottom',
    lineAngle: 90,
    lineLength: 80,
  },
  {
    id: 3,
    number: '03',
    date: 'Phase 2',
    title: 'Zyro Protocol',
    description: 'Security and consensus layer',
    color: '#00E08F',
    position: { top: '5%', right: '18%' }, // ✅ fixed
    border: 'left-bottom',
    lineAngle: 145,
    lineLength: 100,
  },
  {
    id: 4,
    number: '04',
    date: 'Ecosystem',
    title: 'Infrastructure & Technology',
    description: 'Development framework',
    color: '#00E08F',
    position: { top: '72%', left: '15%' }, // ✅ fixed
    border: 'right-top',
    lineAngle: -35,
    lineLength: 90,
  },
  {
    id: 5,
    number: '05',
    date: 'Security',
    title: 'Secure Computing Power',
    description: 'Protected processing units',
    color: '#00E08F',
    position: { top: '72%', right: '15%' }, // ✅ fixed
    border: 'left-top',
    lineAngle: -145,
    lineLength: 90,
  },
];

export default function BusinessModelSection() {
  return (
    <section className="section relative overflow-hidden bg-black flex flex-col">

      {/* ================= VIDEO BACKGROUND SECTION ================= */}
      <div className="relative min-h-screen flex items-center">

        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
          >
            <source
              src="https://res.cloudinary.com/dlrlet9fg/video/upload/v1769270495/9a163233-0ae9-4c7d-873f-220ab0943ea0_e5wthk.mp4"
              type="video/webm"
            />
          </video>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Left Circuit Decoration */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <svg width="120" height="600" viewBox="0 0 120 600" className="opacity-90">
            <line x1="60" y1="0" x2="60" y2="200" stroke="#00E08F" strokeWidth="2" />
            <line x1="60" y1="200" x2="90" y2="230" stroke="#00E08F" strokeWidth="2" />
            <line x1="90" y1="230" x2="90" y2="370" stroke="#00E08F" strokeWidth="2" />
            <line x1="90" y1="370" x2="60" y2="400" stroke="#00E08F" strokeWidth="2" />
            <line x1="60" y1="400" x2="60" y2="600" stroke="#00E08F" strokeWidth="2" />
          </svg>
        </div>

        {/* Right Circuit Decoration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <svg width="120" height="600" viewBox="0 0 120 600" className="opacity-90">
            <line x1="60" y1="0" x2="60" y2="200" stroke="#00E08F" strokeWidth="2" />
            <line x1="60" y1="200" x2="30" y2="230" stroke="#00E08F" strokeWidth="2" />
            <line x1="30" y1="230" x2="30" y2="370" stroke="#00E08F" strokeWidth="2" />
            <line x1="30" y1="370" x2="60" y2="400" stroke="#00E08F" strokeWidth="2" />
            <line x1="60" y1="400" x2="60" y2="600" stroke="#00E08F" strokeWidth="2" />
          </svg>
        </div>

        {/* Heading */}
        <div className="absolute top-[4%] left-[15%] z-10 mb-20">
          <Reveal direction="up">
            <h2 className="text-6xl md:text-7xl font-bold text-white uppercase mb-20">
              Timeline
            </h2>
          </Reveal>
        </div>

        {/* Main Visualization Container */}
        {/* ✅ FIX: overflow-visible so lines don’t break */}
        <div className="relative w-full h-[650px] mt-32 z-10 overflow-visible">

          {/* Component Labels */}
          {businessComponents.map((component, index) => {

            const angleRad = (component.lineAngle * Math.PI) / 180;
            const endX = Math.cos(angleRad) * component.lineLength;
            const endY = Math.sin(angleRad) * component.lineLength;

            const svgWidth = Math.abs(endX) + 80;  // ✅ increased
            const svgHeight = Math.abs(endY) + 80; // ✅ increased
            const startX = svgWidth / 2;
            const startY = 10;

            return (
              <motion.div
                key={component.id}
                className="absolute overflow-visible"  // ✅ FIX
                style={component.position}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Label Box */}
                <div
                  className="px-6 py-4 text-white relative"
                  style={{
                    borderLeft: component.border.includes('left')
                      ? '1px solid rgb(59, 67, 67)'
                      : 'none',
                    borderRight: component.border.includes('right')
                      ? '1px solid rgb(59, 67, 67)'
                      : 'none',
                    borderBottom: component.border.includes('bottom')
                      ? '1px solid rgb(59, 67, 67)'
                      : 'none',
                    borderTop: component.border.includes('top')
                      ? '1px solid rgb(59, 67, 67)'
                      : 'none',
                    minWidth: '200px',
                  }}
                >
                  {/* Number badge */}
                  <div
                    className="absolute -top-3 -left-3 w-7 h-7 flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: component.color,
                      color: '#000',
                      borderRadius: '4px',
                      boxShadow: '0 0 10px rgba(0, 224, 143, 0.6)',
                    }}
                  >
                    {component.number}
                  </div>

                  {/* Date */}
                  <div className="text-xs font-semibold mb-2" style={{ color: component.color }}>
                    {component.date}
                  </div>

                  {/* Title */}
                  <div className="text-base md:text-lg font-bold mb-1">
                    {component.title}
                  </div>

                  {/* Description */}
                  <div className="text-xs text-gray-400">
                    {component.description}
                  </div>
                </div>

                {/* Connecting Line */}
                {/* ✅ FIX: overflow-visible so green line never breaks */}
                <svg
                  className={`absolute left-1/2 -translate-x-1/2 pointer-events-none overflow-visible ${
                    component.lineAngle < 0 ? '-top-4' : 'top-full'
                  }`}
                  width={svgWidth}
                  height={svgHeight}
                >
                  <motion.line
                    x1={startX}
                    y1={startY}
                    x2={startX + endX}
                    y2={startY + endY}
                    stroke="#00E08F"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  />

                  <motion.circle
                    cx={startX + endX}
                    cy={startY + endY}
                    r="4"
                    fill="#00E08F"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.8 }}
                  />
                </svg>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ================= EMPTY DARK SPACE BELOW VIDEO ================= */}
      {/* <div className="relative w-full bg-black py-40 z-20">
        <ForestTimeline />
      </div> */}
      <div className="relative w-full bg-black py-40 z-20">

  {/* ✅ Desktop Timeline */}
  <div className="hidden lg:block">
    <ForestTimeline />
  </div>

  {/* ✅ Mobile Timeline */}
  <div className="block lg:hidden">
    <MobileVerticalTimeline />
  </div>

</div>

    </section>
  );
}
