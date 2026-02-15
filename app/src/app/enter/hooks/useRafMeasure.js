"use client";

import { useEffect } from "react";

const subscribers = new Set();
let rafId = null;

function loop() {
  subscribers.forEach((fn) => fn());
  rafId = requestAnimationFrame(loop);
}

function startLoop() {
  if (rafId === null) {
    rafId = requestAnimationFrame(loop);
  }
}

function stopLoop() {
  if (subscribers.size === 0 && rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

export function useRafMeasure(callback, active) {
  useEffect(() => {
    if (!active) return;

    subscribers.add(callback);
    startLoop();

    return () => {
      subscribers.delete(callback);
      stopLoop();
    };
  }, [callback, active]);
}
