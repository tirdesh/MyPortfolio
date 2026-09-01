// src/components/InteractiveSkills.tsx

import { skillCategories } from "@/content/SkillList";
import {
  ActiveElement,
  ArcElement,
  ChartEvent,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const BORDER_PADDING = 10;
const MIN_BUBBLE_SIZE = 48;
const MAX_BUBBLE_SIZE = 120;
const NARROW_BREAKPOINT = 480;

type ContainerSize = { width: number; height: number };
type BubbleState = { x: number; y: number; vx: number; vy: number; size: number };

// On a phone the play area is under 300px wide. Sizing bubbles off a fixed
// 60-120px range leaves them no room to travel, so they collapse into one
// overlapping column. Cap them against the width they actually have.
const bubbleSizeFor = (
  skillCount: number,
  maxSkillCount: number,
  containerWidth: number
) => {
  const usable = containerWidth - 2 * BORDER_PADDING;
  const ceiling = Math.min(
    MAX_BUBBLE_SIZE,
    Math.max(MIN_BUBBLE_SIZE, usable / 2.6)
  );
  const floor = ceiling * 0.66;
  const ratio = maxSkillCount > 0 ? skillCount / maxSkillCount : 1;
  return Math.round(floor + (ceiling - floor) * ratio);
};

const InteractiveSkills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof skillCategories)[0] | null
  >(null);
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    trivia: string;
    fact: string;
  } | null>(null);
  const [containerSize, setContainerSize] = useState<ContainerSize>({
    width: 0,
    height: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const bubblesRef = useRef<BubbleState[]>([]);

  // ResizeObserver rather than a window listener: this panel sits inside an
  // animated card and a tab that mounts on demand, so its box settles well
  // after the window has stopped firing resize events.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const measure = () =>
      setContainerSize((prev) =>
        prev.width === node.offsetWidth && prev.height === node.offsetHeight
          ? prev
          : { width: node.offsetWidth, height: node.offsetHeight }
      );

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isNarrow = containerSize.width > 0 && containerSize.width < NARROW_BREAKPOINT;

  const maxSkillCount = useMemo(
    () =>
      Math.max(...skillCategories.map((category) => category.skills.length)),
    []
  );

  const sizes = useMemo(
    () =>
      skillCategories.map((category) =>
        bubbleSizeFor(category.skills.length, maxSkillCount, containerSize.width)
      ),
    [containerSize.width, maxSkillCount]
  );

  // One rAF loop for every bubble, so they can bounce off each other instead
  // of drifting through each other and hiding their own labels. The previous
  // version gave each bubble its own 50ms setInterval whose effect depended on
  // the position it set, which tore the timer down and re-rendered every tick.
  useEffect(() => {
    const { width, height } = containerSize;
    if (width <= 0 || height <= 0 || selectedCategory) return;

    const speed = width < NARROW_BREAKPOINT ? 26 : 42; // px per second
    const limitFor = (size: number) => ({
      maxX: Math.max(BORDER_PADDING, width - size - BORDER_PADDING),
      maxY: Math.max(BORDER_PADDING, height - size - BORDER_PADDING),
    });

    const clampAll = () => {
      for (const bubble of bubblesRef.current) {
        const { maxX, maxY } = limitFor(bubble.size);
        bubble.x = Math.min(Math.max(bubble.x, BORDER_PADDING), maxX);
        bubble.y = Math.min(Math.max(bubble.y, BORDER_PADDING), maxY);
      }
    };

    const renormalize = (bubble: BubbleState) => {
      const magnitude = Math.hypot(bubble.vx, bubble.vy) || 1;
      bubble.vx = (bubble.vx / magnitude) * speed;
      bubble.vy = (bubble.vy / magnitude) * speed;
    };

    // Equal-mass elastic response: push the pair apart, and when asked, swap
    // the velocity components along the collision normal.
    const resolveCollisions = (withImpulse: boolean) => {
      const bubbles = bubblesRef.current;
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const a = bubbles[i];
          const b = bubbles[j];
          const ra = a.size / 2;
          const rb = b.size / 2;
          let dx = b.x + rb - (a.x + ra);
          let dy = b.y + rb - (a.y + ra);
          let dist = Math.hypot(dx, dy);
          if (dist === 0) {
            dx = 1;
            dy = 0;
            dist = 1;
          }
          const minDist = ra + rb;
          if (dist >= minDist) continue;

          const nx = dx / dist;
          const ny = dy / dist;
          const shift = (minDist - dist) / 2;
          a.x -= nx * shift;
          a.y -= ny * shift;
          b.x += nx * shift;
          b.y += ny * shift;

          if (!withImpulse) continue;
          const va = a.vx * nx + a.vy * ny;
          const vb = b.vx * nx + b.vy * ny;
          if (vb - va < 0) {
            const diff = vb - va;
            a.vx += diff * nx;
            a.vy += diff * ny;
            b.vx -= diff * nx;
            b.vy -= diff * ny;
            renormalize(a);
            renormalize(b);
          }
        }
      }
    };

    const paint = () => {
      bubblesRef.current.forEach((bubble, i) => {
        const node = nodeRefs.current[i];
        if (node) {
          node.style.transform = `translate3d(${bubble.x}px, ${bubble.y}px, 0)`;
        }
      });
    };

    // Seed on first run (or when the category count changes), otherwise keep
    // the bubbles where they are and just re-fit them to the new box.
    if (bubblesRef.current.length !== sizes.length) {
      bubblesRef.current = sizes.map((size, i) => {
        const { maxX, maxY } = limitFor(size);
        let x = 0;
        let y = 0;
        // Rejection-sample a starting spot that does not already overlap.
        for (let attempt = 0; attempt < 80; attempt++) {
          x = BORDER_PADDING + Math.random() * Math.max(0, maxX - BORDER_PADDING);
          y = BORDER_PADDING + Math.random() * Math.max(0, maxY - BORDER_PADDING);
          const clear = bubblesRef.current.slice(0, i).every((other) => {
            const dx = x + size / 2 - (other.x + other.size / 2);
            const dy = y + size / 2 - (other.y + other.size / 2);
            return Math.hypot(dx, dy) >= (size + other.size) / 2 + 4;
          });
          if (clear) break;
        }
        const angle = Math.random() * Math.PI * 2;
        return {
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
        };
      });
    } else {
      bubblesRef.current.forEach((bubble, i) => {
        bubble.size = sizes[i];
      });
    }

    // Settle any residual overlap from seeding, then paint immediately.
    // rAF never fires in a hidden tab, so waiting for the first frame to write
    // a transform would leave all six bubbles stacked at the top-left corner.
    clampAll();
    for (let pass = 0; pass < 24; pass++) resolveCollisions(false);
    clampAll();
    paint();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      for (const bubble of bubblesRef.current) {
        bubble.x += bubble.vx * dt;
        bubble.y += bubble.vy * dt;

        const { maxX, maxY } = limitFor(bubble.size);
        if (bubble.x <= BORDER_PADDING) {
          bubble.x = BORDER_PADDING;
          bubble.vx = Math.abs(bubble.vx);
        } else if (bubble.x >= maxX) {
          bubble.x = maxX;
          bubble.vx = -Math.abs(bubble.vx);
        }
        if (bubble.y <= BORDER_PADDING) {
          bubble.y = BORDER_PADDING;
          bubble.vy = Math.abs(bubble.vy);
        } else if (bubble.y >= maxY) {
          bubble.y = maxY;
          bubble.vy = -Math.abs(bubble.vy);
        }
      }

      resolveCollisions(true);
      resolveCollisions(true);
      clampAll();
      paint();

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [containerSize, sizes, selectedCategory]);

  const pieData = useMemo(
    () => ({
      labels: selectedCategory?.skills.map((skill) => skill.name) || [],
      datasets: [
        {
          data: selectedCategory?.skills.map(() => 1) || [],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    }),
    [selectedCategory]
  );

  const pieOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          // A right-hand legend takes almost the whole width on a phone and
          // the labels get clipped, so move it under the chart when narrow.
          position: (isNarrow ? "bottom" : "right") as "bottom" | "right",
          labels: {
            color: "white",
            boxWidth: isNarrow ? 12 : 20,
            padding: isNarrow ? 6 : 10,
            font: {
              size: isNarrow ? 11 : 14,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context: { dataIndex: number }) => {
              const skill = selectedCategory?.skills[context.dataIndex];
              return skill ? skill.name : "";
            },
          },
        },
      },
      onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          setSelectedSkill(selectedCategory?.skills[index] || null);
        }
      },
    }),
    [selectedCategory, isNarrow]
  );

  return (
    <div className="relative flex flex-col items-center bg-gradient-to-br from-gray-900 to-black p-2 sm:p-4 md:p-6 rounded-lg">
      <p className="text-white text-sm sm:text-base mb-3 text-center">
        {isNarrow
          ? "Tap a skill category to learn more"
          : "Click on a skill category to learn more"}
      </p>
      <div
        ref={containerRef}
        className="relative overflow-hidden border-4 border-purple-500 rounded-lg w-full h-[70vh] min-h-[360px] max-h-[620px]"
      >
        {!selectedCategory &&
          containerSize.width > 0 &&
          skillCategories.map((category, index) => (
            // The outer node owns the rAF translate; the button owns the
            // hover/press scale, so the two never fight over `transform`.
            <div
              key={category.category}
              ref={(el) => {
                nodeRefs.current[index] = el;
              }}
              className="absolute left-0 top-0 will-change-transform"
              style={{ width: sizes[index], height: sizes[index] }}
            >
              <button
                type="button"
                aria-label={`Show ${category.category} skills`}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedSkill(null);
                }}
                className="w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white cursor-pointer hover:from-purple-600 hover:to-purple-700 hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg px-1.5"
              >
                <span className="text-center text-xs sm:text-sm leading-tight break-words">
                  {category.category}
                </span>
              </button>
            </div>
          ))}

        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col p-3 sm:p-5"
            >
              <div className="flex items-start justify-between gap-2 mb-2 shrink-0">
                <p className="text-white text-sm sm:text-base font-semibold">
                  {isNarrow
                    ? "Tap a slice to learn more"
                    : "Click on a skill slice to learn more"}
                </p>
                <button
                  type="button"
                  aria-label="Close category"
                  className="shrink-0 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedSkill(null);
                  }}
                >
                  X
                </button>
              </div>

              <div className="relative flex-1 min-h-0 w-full">
                <Pie data={pieData} options={pieOptions} />

                {selectedSkill && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center p-2"
                  >
                    <div className="relative bg-gray-800/95 backdrop-blur-sm rounded-2xl border-2 border-purple-400 w-full max-w-xs max-h-full overflow-y-auto p-4 pt-7 text-center shadow-xl">
                      <button
                        type="button"
                        aria-label="Close skill"
                        className="absolute top-1.5 right-1.5 text-white z-10 bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        onClick={() => setSelectedSkill(null)}
                      >
                        X
                      </button>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                        {selectedSkill.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 mb-2">
                        {selectedSkill.trivia}
                      </p>
                      <p className="text-[11px] sm:text-xs text-gray-400 italic">
                        {selectedSkill.fact}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveSkills;
