import { useRef, type MouseEventHandler } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners";
import Button from "./Button";

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
      id="vault"
      className="min-h-dvh w-screen bg-black text-blue-50 overflow-hidden"
    >
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-xs">
          The multi-dimensional gaming experience
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="The st<b>o</b>ry of <br /> a hidden real<b>m</b>"
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
              Where realms converge, lies zentry and the boundless pillar.
              Discover it's secrets and unlock the mysteries within.
            </p>
            <Button
              id="realm-button"
              title="Discover prologue"
              className="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
