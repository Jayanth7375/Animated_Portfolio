import React, { useState } from 'react';
import { Skiper10 } from '@/components/ui/skiper10';
import { Button } from '@/components/common/Button';

export default function Skiper10Demo() {
  const [key, setKey] = useState(0);

  const restartPreloader = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-[#05070b] text-white flex flex-col items-center justify-center p-8">
      {/* Skiper10 Double Stairs Preloader instance */}
      <Skiper10
        key={key}
        brandName="JAYANTH E"
        brandRole="AI & DATA SCIENCE"
        duration={2.0}
        numberOfColumns={5}
      />

      <div className="text-center z-10 max-w-lg">
        <span className="font-mono text-xs text-slate-300 tracking-widest uppercase">
          [COMPONENT DEMO: @skiper-ui/skiper10]
        </span>
        <h2 className="text-4xl font-bold mt-2 mb-4">Double Stairs Preloader</h2>
        <p className="text-neutral-400 mb-6">
          Centered high-contrast preloader with dual-direction staircase curtain transition.
        </p>
        <Button onClick={restartPreloader} variant="primary">
          [Replay Double Stairs Transition &orarr;]
        </Button>
      </div>
    </div>
  );
}
