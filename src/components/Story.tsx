import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners";
import Button from "./Button";

import { openPortfolio } from "../utils";
import { useRef, type MouseEventHandler } from "react";

const Story = () => {
  const frameRef = useRef<HTMLImageElement | null>(null);

  const handleMouse = () => {
    const element = frameRef.current;
    if (!element) return;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  };

  const handleMouseMove: MouseEventHandler<HTMLImageElement> = (e) => {
    const element = frameRef.current;
    if (!element) return;

    const { clientX, clientY } = e;
    const { top, left, width, height } = element.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    const centerX = width / 2;
    const centerY = height / 2;

    const offset = 10;

    const rotateX = ((y - centerY) / centerY) * -offset;
    const rotateY = ((x - centerX) / centerX) * offset;

    gsap.to(element, {
      duration: 0.3,
      ease: "power1.inOut",
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 500,
    });
  };
  return (
    <section
      id="projects"
      className="min-h-dvh w-screen bg-black text-blue-50 overflow-hidden"
    >
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-xs">
          The story of a hidden realm
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="The St<b>o</b>ry Behind the C<b>o</b>de"
            containerClassName="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  src="/img/entrance.webp"
                  alt="entrance"
                  className="object-contain"
                  onMouseLeave={handleMouse}
                  onMouseUp={handleMouse}
                  onMouseEnter={handleMouse}
                  onMouseMove={handleMouseMove}
                />
              </div>
            </div>
            <RoundedCorners />
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 mb-5 md:text-start">
              From experimenting with game mods to building full-stack
              platforms, every project is a quest for better design and cleaner
              code.
            </p>
            <Button
              id="realm-button"
              title="Explore My Journey"
              className="mt-5"
              onClick={openPortfolio}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
