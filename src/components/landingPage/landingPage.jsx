import { FaArrowRightLong } from "react-icons/fa6";
import Navbar from "./navbar";
import { MarginBottom, MarginLeft, MarginRight, MarginTop } from "./viewMargin";
import {
  PaddingBottom,
  PaddingLeft,
  PaddingRight,
  PaddingTop,
} from "./viewPadding";
import { useSelector } from "react-redux";

import HoverlayPopUp from "./overlayPopUp";

import { UseVisualInspector } from "../../hooks/useVisualInspector";
import LandingPageMainContent from "./mainContent";

const LandingPage = () => {
  const { hoveredRect, locked } = UseVisualInspector();
  const { demoMode } = useSelector((store) => store.landingPage);

  const isNonZero = (value) => {
    if (!value) return false;
    return parseFloat(value) !== 0;
  };

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
              className={`absolute z-100 border border-dashed border-blue-500 bg-blue-500/10 transition-all duration-300`}
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
            {<HoverlayPopUp rect={hoveredRect} />}
          </>
        )}
        <LandingPageMainContent />
      </div>
    </>
  );
};

export default LandingPage;
