import { FaArrowRightLong } from "react-icons/fa6";
import Navbar from "./navbar";
import { MarginBottom, MarginLeft, MarginRight, MarginTop } from "./viewMargin";
import {
  PaddingBottom,
  PaddingLeft,
  PaddingRight,
  PaddingTop,
} from "./viewPadding";
import { useDispatch, useSelector } from "react-redux";
import {
  setDemoMode,
  setHoveredRect,
  setLocked,
  setPosition,
} from "../../slices/landingPage.slice";
import HoverlayPopUp from "./overlayPopUp";
import { useEffect, useRef, useCallback } from "react";
import ResolutionBar from "./resolutionChange";

const LandingPage = () => {
  const { demoMode, hoveredRect, locked } = useSelector(
    (store) => store.landingPage,
  );

  const dispatch = useDispatch();
  const lockedRef = useRef(null);
  const hoveredRef = useRef(null);

  const isNonZero = (value) => {
    if (!value) return false;
    return parseFloat(value) !== 0;
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!demoMode || lockedRef.current) return;

      const target = e.target;
      hoveredRef.current = target;
      if (!target) return;
      dispatch(
        setPosition({
          x: e.clientX,
          y: e.clientY,
        }),
      );

      const rect = target.getBoundingClientRect();
      const styles = getComputedStyle(target);

      const childRect = [];
      const spacing = {
        marginTop: parseFloat(styles.marginTop),
        marginRight: parseFloat(styles.marginRight),
        marginBottom: parseFloat(styles.marginBottom),
        marginLeft: parseFloat(styles.marginLeft),

        paddingTop: parseFloat(styles.paddingTop),
        paddingRight: parseFloat(styles.paddingRight),
        paddingBottom: parseFloat(styles.paddingBottom),
        paddingLeft: parseFloat(styles.paddingLeft),
      };

      if (styles.display === "flex") {
        Array.from(target.children).forEach((child) => {
          const r = child.getBoundingClientRect();
          childRect.push({
            width: r.width,
            height: r.height,
            left: r.left + window.scrollX,
            top: r.top + window.scrollY,
          });
        });
      }

      dispatch(
        setHoveredRect({
          width: rect.width,
          height: rect.height,
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY,

          flex: {
            display: styles.display,
            direction: styles.flexDirection,
            justify: styles.justifyContent,
            align: styles.alignItems,
            wrap: styles.flexWrap,
            gap: styles.gap || `${styles.rowGap} ${styles.columnGap}`,
          },
          spacing,
          childRect,
        }),
      );
    },
    [demoMode, dispatch],
  );

  const handleWindowMouseOut = useCallback(
    (e) => {
      if (!demoMode || lockedRef.current) return;
      if (!e.relatedTarget && !e.toElement) {
        dispatch(setHoveredRect(null));
      }
    },
    [demoMode, dispatch],
  );

  const handleClick = useCallback(
    (e) => {
      if (!demoMode) return;
      if (hoveredRect) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (locked) {
        lockedRef.current = null;
        dispatch(setLocked(false));
        dispatch(setHoveredRect(null));
        console.log(hoveredRect);
      } else if (hoveredRect) {
        lockedRef.current = hoveredRef.current;
        dispatch(setLocked(true));
      }
    },
    [demoMode, hoveredRect, dispatch, locked],
  );

  const handleResize = useCallback(() => {
    const target = lockedRef.current;
    console.log(lockedRef);

    if (lockedRef.current && target) {
      console.log(target);
      const rect = target.getBoundingClientRect();

      const newChildRect = Array.from(target.children).map((child) => {
        const r = child.getBoundingClientRect();
        return {
          width: r.width,
          height: r.height,
          left: r.left + window.scrollX,
          top: r.top + window.scrollY,
        };
      });

      dispatch(
        setHoveredRect({
          ...hoveredRect,
          width: rect.width,
          height: rect.height,
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY,
          childRect: newChildRect,
        }),
      );
    }
  }, [hoveredRect, dispatch]);

  useEffect(() => {
    if (demoMode) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseout", handleWindowMouseOut);
      window.addEventListener("resize", handleResize);
      window.addEventListener("click", handleClick, { capture: true });
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleWindowMouseOut);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick, { capture: true });
    };
  }, [
    demoMode,
    handleMouseMove,
    handleWindowMouseOut,
    handleClick,
    handleResize,
  ]);

  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden bg-neutral-900 pt-10">
        <div className="relative flex w-full items-center justify-center">
          <div className="fixed -top-15 mx-auto size-20 rounded-full bg-neutral-100 blur-2xl" />
        </div>
        <Navbar />
        {demoMode && hoveredRect && (
          <>
            <div
              className={`absolute z-1000 border border-dashed border-blue-500 bg-blue-500/10 transition-all duration-300`}
              data-overlay="true"
              style={{
                top: hoveredRect.top,
                left: hoveredRect.left,
                width: hoveredRect.width,
                height: hoveredRect.height,
                pointerEvents: "none",
                opacity: locked ? 1 : 0.8,
              }}
            >
              {isNonZero(hoveredRect.spacing.paddingTop) && <PaddingTop />}

              {isNonZero(hoveredRect.spacing.marginTop) && <MarginTop />}

              {isNonZero(hoveredRect.spacing.paddingRight) && <PaddingRight />}

              {isNonZero(hoveredRect.spacing.marginRight) && <MarginRight />}

              {isNonZero(hoveredRect.spacing.paddingBottom) && (
                <PaddingBottom />
              )}

              {isNonZero(hoveredRect.spacing.marginBottom) && <MarginBottom />}

              {isNonZero(hoveredRect.spacing.paddingLeft) && <PaddingLeft />}

              {isNonZero(hoveredRect.spacing.marginLeft) && <MarginLeft />}

              {hoveredRect.childRect?.map((c, i) => (
                <div
                  key={i}
                  className="pointer-events-none absolute border border-dashed border-red-500"
                  style={{
                    left: c.left - hoveredRect.left,
                    top: c.top - hoveredRect.top,
                    width: c.width,
                    height: c.height,
                  }}
                />
              ))}
            </div>
            {<HoverlayPopUp rect={hoveredRect} data-overlay="true" />}
          </>
        )}
        {locked && <ResolutionBar />}

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

          <div className="z-100 mt-5 flex w-full justify-center gap-20 px-10 py-10">
            <button className="group -z-20 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-300 px-8 py-3 text-lg font-bold">
              Get Started
              <span className="shadow-lg transition-all duration-300 ease-out group-hover:translate-x-1 hover:shadow-amber-300">
                <FaArrowRightLong fontSize={20} color="black" />
              </span>
            </button>
          </div>

          <button
            className="group absolute right-5 bottom-10 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-300 px-8 py-3 text-lg font-bold"
            onClick={() => dispatch(setDemoMode())}
          >
            Live Demo
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
