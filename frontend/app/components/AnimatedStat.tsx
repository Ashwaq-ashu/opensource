'use client';

import { useState, useEffect } from 'react';

interface AnimatedStatProps {
  value: string; // The original value string from stats array (e.g., '25+', '100%')
}

export default function AnimatedStat({ value }: AnimatedStatProps) {
  // Extract number and the suffix ('+', '%')
  const numMatches = value.match(/\d+/);
  const targetNumber = numMatches ? parseInt(numMatches[0], 10) : 0;
  const suffix = value.replace(/\d+/g, '');

  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000; // Animation duration in milliseconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Calculate current value using easeOut function
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setCurrentNumber(Math.floor(easeOutProgress * targetNumber));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [targetNumber]);

  return (
    <>
      {currentNumber}{suffix}
    </>
  );
}
