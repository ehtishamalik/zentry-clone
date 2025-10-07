import { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

const BentoTilt = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!itemRef.current) return;

    const offset = 5;

    const { top, left, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeX - 0.5) * offset;
    const tiltY = (relativeY - 0.5) * offset;

    const newTransformStyle = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;

    setTransformStyle(newTransformStyle);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  children,
  description,
  src,
}: {
  children: React.ReactNode;
  src: string;
  description?: string;
}) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        autoPlay
        loop
        muted
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{children}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="nexus" className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the metagame layer
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50/50">
            Immerse yourself in the experience. Explore the depths of the game
            mechanics and uncover hidden strategies. Engage with a community of
            like-minded players and elevate your gameplay to new heights.
          </p>
        </div>

        <div className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="/videos/feature-1.mp4"
            description="A cross-platform metagame app, turining your activities across Web2 and Wbe3 games into rewarding adventures."
          >
            radia<b>n</b>t
          </BentoCard>
        </div>

        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="/videos/feature-2.mp4"
              description="Discover new games and experiences tailored to your interests and playstyle."
            >
              Zig<b>m</b>a
            </BentoCard>
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="/videos/feature-3.mp4"
              description="Connect with friends and share your gaming experiences across platforms."
            >
              N<b>e</b>xus
            </BentoCard>
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="/videos/feature-4.mp4"
              description="Track your progress and achievements across all your games in one place."
            >
              Az<b>u</b>l
            </BentoCard>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font max-w-64">
                M<b>o</b>re Co<b>m</b>ing So<b>o</b>n
              </h1>
              <TiLocationArrow className="m-5 scale-2000 self-end" />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <video
              src="/videos/feature-5.mp4"
              loop
              muted
              autoPlay
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
