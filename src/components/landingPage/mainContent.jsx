import { useDispatch } from "react-redux";
import { setDemoMode, setHoveredRect } from "../../slices/landingPage.slice";
import { FaArrowRightLong } from "react-icons/fa6";

const LandingPageMainContent = () => {
  const dispatch = useDispatch();

  return (
    <div className="item-center mx-auto mt-30 flex max-w-6xl flex-col justify-center py-10">
      <p className="text-center text-[60px] leading-17 font-bold tracking-wider text-white">
        <span className="bg-linear-to-r from-yellow-600 to-white bg-clip-text text-transparent">
          Visual Inspector
        </span>{" "}
        Built for <br /> React, Next.js & Vite
      </p>

      <p className="z-100 mt-8 text-center text-xl text-neutral-400">
        See CSS, Tailwind classes, spacing, typography and live styles by
        <br />
        clicking any element during development.
      </p>

      <div className="z-100 mt-5 flex w-full transform-gpu justify-center gap-20 px-10 py-10 perspective-distant">
        <button className="group -z-20 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r from-amber-400 to-white px-8 py-3 text-lg font-semibold transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-amber-300 active:scale-95">
          Get Started
          <span className="transition-all duration-300 ease-out group-hover:translate-x-1">
            <FaArrowRightLong fontSize={20} color="black" />
          </span>
        </button>
      </div>

      <button
        className="group absolute right-5 bottom-10 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-8 py-3 text-xl font-semibold"
        onClick={() => {
          dispatch(setDemoMode(true));
        }}
      >
        try now
      </button>
    </div>
  );
};

export default LandingPageMainContent;
