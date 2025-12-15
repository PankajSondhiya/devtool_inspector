import { easeOut, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { MdFormatListBulletedAdd, MdOutlineLineStyle } from "react-icons/md";
import {
  setDemoMode,
  setHoveredRect,
  setLocked,
} from "../../slices/landingPage.slice";
import { useState } from "react";

const HoverlayPopUp = () => {
  const { position, hoveredRect, locked, lockedRef, stylesApplied } =
    useSelector((store) => store.landingPage);
  const dispatch = useDispatch();
  const left = Math.min(position.x + 30, window.innerWidth - 400 - 20);

  const top = Math.min(position.y + 10, window.innerHeight - 450 - 20);

  const tabs = ["classes", "inline", "computed"];
  const [activeTab, setActiveTab] = useState("classes");

  return (
    <motion.div
      className="absolute z-9999 h-[450px] w-[400px] rounded-lg border-2 border-dashed border-neutral-500 bg-transparent px-1 py-1 text-xs text-white backdrop-blur-2xl"
      data-overlay="true"
      style={{ pointerEvents: locked ? "all" : "none" }}
      animate={{
        left,
        top,
      }}
      transition={{
        duration: 0.1,
        ease: easeOut,
      }}
    >
      <div className="flex h-1/12 w-auto items-center justify-between rounded-tl-lg rounded-tr-lg bg-neutral-800 px-2 py-1">
        <div className="-neutral-300 flex items-center justify-center gap-2 rounded-sm">
          <div className="h-full w-1/2 cursor-pointer">
            <MdOutlineLineStyle fontSize={25} />
          </div>
          <div className="h-full w-1/2 cursor-pointer">
            {" "}
            <MdFormatListBulletedAdd fontSize={25} />
          </div>
        </div>
        <div
          className="cursor-pointer rounded-full transition-all duration-300 ease-in-out hover:rotate-90"
          onClick={() => {
            dispatch(setDemoMode(false));
            dispatch(setHoveredRect(null));
          }}
        >
          <IoClose fontSize={25} />
        </div>
      </div>
      <div className="h-11/12 rounded-br-lg rounded-bl-lg bg-neutral-700 p-2">
        <div className="flex h-[7%] items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1 text-sm capitalize transition-all ${
                activeTab === tab
                  ? "bg-neutral-800 text-white"
                  : "bg-neutral-500 text-neutral-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative h-[93%] overflow-auto bg-neutral-800 px-2 py-2">
          {activeTab === "classes" && (
            <div className="flex flex-wrap content-start gap-1">
              {stylesApplied?.classesApplied?.map((cls, i) => (
                <div key={i} className="rounded bg-neutral-700 px-2 py-1">
                  {cls}
                </div>
              ))}
            </div>
          )}

          {activeTab === "inline" && (
            <div className="flex flex-wrap content-start gap-1">
              {Object.entries(stylesApplied?.inline || {}).map(
                ([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-neutral-400">{key}</span>
                    <span>{value}</span>
                  </div>
                ),
              )}
            </div>
          )}

          {activeTab === "computed" && (
            <div className="flex flex-wrap content-start gap-1 text-[11px]">
              {Object.entries(stylesApplied?.computed || {}).map(
                ([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-neutral-400">{key}</span>
                    <span>{value}</span>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HoverlayPopUp;
//  {stylesApplied?.classesApplied?.map((cls, index) => (
//           <div
//             key={index}
//             className="rounded-sm bg-neutral-500 px-2 py-1 text-center text-sm text-white"
//           >
//             {cls}
//           </div>
//         ))}
