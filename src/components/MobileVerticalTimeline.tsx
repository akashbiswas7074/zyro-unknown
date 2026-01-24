// app/components/MobileVerticalTimeline.tsx
// app/components/StepTimeline.tsx
'use client';
import React, { useState, useEffect, useRef } from 'react';

const MobileVerticalTimeline = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
   const timelineRef = useRef<HTMLDivElement | null>(null);

  const events = [
    { id: 1, title: 'Project Kickoff', description: 'Initial planning and team assembly', date: 'Jan 2024' },
    { id: 2, title: 'Research Phase', description: 'Market analysis and user research', date: 'Feb 2024' },
    { id: 3, title: 'Design Sprint', description: 'UI/UX design and prototyping', date: 'Mar 2024' },
    { id: 4, title: 'Development', description: 'Core feature implementation', date: 'Apr 2024' },
    { id: 5, title: 'Testing', description: 'QA and bug fixes', date: 'May 2024' },
    { id: 6, title: 'Beta Launch', description: 'Limited release to test users', date: 'Jun 2024' },
    { id: 7, title: 'Final Launch', description: 'Public release and marketing', date: 'Jul 2024' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

     const timeline = timelineRef.current;
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const timelineStart = -rect.top + windowHeight * 0.2;
      const timelineHeight = timeline.offsetHeight - windowHeight * 0.4;
      
      const progress = (timelineStart / timelineHeight) * 100;
      const clampedProgress = Math.max(0, Math.min(100, progress));
      
      setScrollProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getEventProgress = (index:number) => {
    const eventProgress = (index / (events.length - 1)) * 100;
    return scrollProgress >= eventProgress;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-white mb-4">Project Timeline</h1>
       
      </div>

      {/* Timeline Container */}
      <div ref={timelineRef} className="relative max-w-6xl mx-auto px-4 pb-32">
        {/* Center Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1">
          {/* Background line */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 opacity-30"></div>
          
          {/* Progress line with glow effect */}
          <div 
           className="absolute top-0 left-0 right-0 
  bg-gradient-to-b from-[#00ff99] via-[#00E08F] to-[#00cc66]
  transition-all duration-300 ease-out
  shadow-[0_0_35px_rgba(0,255,153,0.9)]"
            style={{ height: `${scrollProgress}%` }}
          >
             <div className="absolute inset-0 
    bg-gradient-to-b from-[#00ff99] via-[#00E08F] to-[#00cc66]
    blur-md opacity-80">
  </div>
          </div>
          
          {/* Animated loading dot */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300"
            style={{ top: `${scrollProgress}%` }}
          >
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-lime-400 animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 rounded-full 
bg-[#00ff99] blur-md opacity-80 animate-ping"></div>

            </div>
          </div>
        </div>

        {/* Events */}
        <div className="space-y-32 pt-8">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;
            const isActive = getEventProgress(index);
            
            return (
              <div key={event.id} className="relative">
                {/* Event Point on Timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className={`relative transition-all duration-700 ${isActive ? 'scale-100' : 'scale-0'}`}>
                    {/* Outer ring */}
                    <div
  className={`w-10 h-10 rounded-full border-4 ${
    isActive
      ? 'border-[#00ff99] bg-black shadow-lg shadow-[0_0_25px_rgba(0,   255,153,0.9)]'
      : 'border-green-900 bg-black'
  } transition-all duration-700`}
>

                      {/* Inner glow */}
                     <div
  className={`absolute inset-2 rounded-full ${
    isActive
      ? 'bg-gradient-to-br from-[#00ff99] via-[#00E08F] to-[#00cc66] animate-pulse shadow-[0_0_20px_rgba(0,255,153,0.9)]'
      : 'bg-green-950'
  }`}
></div>
                    </div>
                    
                    {/* Ripple effect */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-75"></div>
                    )}
                  </div>
                </div>

                {/* Event Content */}
                <div className={`flex ${isLeft ? 'justify-end pr-12' : 'justify-start pl-12'} items-center`}>
                  <div 
                    className={`w-5/12 transition-all duration-700 delay-200 ${
                      isActive 
                        ? 'opacity-100 translate-x-0' 
                        : `opacity-0 ${isLeft ? 'translate-x-8' : '-translate-x-8'}`
                    }`}
                  >
                    <div className={`relative ${isLeft ? 'text-right' : 'text-left'}`}>
                      {/* Connection line to center */}
                      <div className={`absolute top-1/2 ${
                        isLeft ? 'left-full ml-6' : 'right-full mr-6'
                      } w-6 h-0.5 bg-gradient-to-${isLeft ? 'r' : 'l'} ${
                        isActive 
                          ? 'from-cyan-400 to-transparent' 
                          : 'from-purple-700 to-transparent'
                      }`}></div>

                      {/* Card */}
                     <div
  className={`p-6 rounded-xl backdrop-blur-sm border transition-all duration-500 ${
    isActive
      ? 'bg-gradient-to-br from-green-950/90 via-black/70 to-green-900/60 border-[#00ff99]/50 shadow-xl shadow-[0_0_25px_rgba(0,255,153,0.25)]'
      : 'bg-black/50 border-green-900/40'
  }`}
>

                       <div
  className={`text-sm font-semibold mb-2 ${
    isActive ? 'text-[#00ff99]' : 'text-green-500'
  }`}
>
                          {event.date}
                        </div>
                       <h3
  className={`text-2xl font-bold mb-2 transition-colors ${
    isActive ? 'text-white' : 'text-green-200'
  }`}
>
                          {event.title}
                        </h3>
                        <p className={`transition-colors ${
                          isActive ? 'text-green-200' : 'text-green-400'
                        }`}>
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileVerticalTimeline;