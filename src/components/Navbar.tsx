import clsx from "clsx";
import Button from "./Button";
import gsap from "gsap";

import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";

const navItems = ["Home", "Nexus", "Vault", "About", "Contact"];

const Navbar = () => {
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const audioIndicatorRef = useRef<HTMLAudioElement | null>(null);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const { y: currentScrollY } = useWindowScroll();

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioIndicatorRef.current?.play();
    } else {
      audioIndicatorRef.current?.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
      ease: "power2.out",
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full px-6 -translate-y-1/2">
        <nav className="flex size-full items-center justify-between">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClassName="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block ">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              className="relative ml-10 w-20 p-2 border border-blue-50 rounded-full flex items-center cursor-pointer"
              title={isAudioPlaying ? "Pause Audio" : "Play Audio"}
              onClick={toggleAudioIndicator}
            >
              <audio ref={audioIndicatorRef} src="/audio/loop.mp3" loop />
              {isAudioPlaying ? (
                <FaRegCirclePause className="text-blue-50 size-4" />
              ) : (
                <FaRegCirclePlay className="text-blue-50 size-4" />
              )}
              <span className="absolute left-11 -top-1 space-x-0.5 scale-200">
                {[1, 2, 3, 4].map((bar) => (
                  <span
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  ></span>
                ))}
              </span>
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
