import { easeOut, motion } from "motion/react";
import { useSelector } from "react-redux";

const HoverlayPopUp = () => {
  const { position, hoveredRect, locked } = useSelector(
    (store) => store.landingPage,
  );

  const left = Math.min(position.x + 30, window.innerWidth - 300 - 20);

  const top = Math.min(position.y + 10, window.innerHeight - 400 - 20);

  return (
    <motion.div
      className="absolute z-999 h-[400px] w-[300px] rounded-lg border-2 border-dashed border-neutral-500 bg-transparent p-3 text-xs text-white backdrop-blur-3xl"
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
      <div className="mb-1 font-bold text-yellow-300">
        {hoveredRect?.spacing?.display?.toUpperCase()}
      </div>

      <div className="grid grid-cols-2 gap-1">
        <span className="text-neutral-100">Padding</span>
        <span>
          {hoveredRect?.spacing.paddingTop} {hoveredRect?.spacing.paddingRight}{" "}
          {hoveredRect?.spacing.paddingBottom}{" "}
          {hoveredRect?.spacing.paddingLeft}
        </span>

        <span className="text-neutral-100">Margin</span>
        <span>
          {hoveredRect.spacing.marginTop} {hoveredRect.spacing.marginRight}{" "}
          {hoveredRect.spacing.marginBottom} {hoveredRect.spacing.marginLeft}
        </span>

        <span className="text-neutral-100">Gap</span>
        <span>{hoveredRect.spacing.gap}</span>

        <span className="text-neutral-100">Size</span>
        <span>
          {Math.round(hoveredRect.width)} * {Math.round(hoveredRect.height)}
        </span>
      </div>
    </motion.div>
  );
};

export default HoverlayPopUp;
