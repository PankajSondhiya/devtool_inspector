import { useSelector } from "react-redux";

export const MarginTop = () => {
  const { hoveredRect } = useSelector((store) => store.landingPage);
  return (
    <div
      className="absolute flex items-center justify-center bg-pink-300/30"
      style={{
        width: hoveredRect.width,
        height: hoveredRect.spacing.marginTop,
        left: 0,
        top: -hoveredRect.spacing.marginTop,
      }}
    >
      <div className="text-bold absolute rounded-lg bg-black/50 px-1 text-[12px] text-orange-500">
        mt-{hoveredRect?.spacing.marginTop}
      </div>
    </div>
  );
};
export const MarginBottom = () => {
  const { hoveredRect } = useSelector((store) => store.landingPage);
  return (
    <div
      className="absolute flex items-center justify-center bg-pink-300/30"
      style={{
        width: hoveredRect.width,
        height: hoveredRect.spacing.marginBottom,
        bottom: -hoveredRect.spacing.marginBottom,
        left: 0,
      }}
    >
      <div className="text-bold absolute rounded-xl bg-black/50 px-1 text-[12px] text-orange-500">
        mb-{hoveredRect?.spacing.marginBottom}
      </div>
    </div>
  );
};
export const MarginLeft = () => {
  const { hoveredRect } = useSelector((store) => store.landingPage);
  return (
    <div
      className="absolute flex items-center justify-center bg-pink-300/30"
      style={{
        left: -hoveredRect.spacing.marginLeft,
        width: hoveredRect.spacing.marginLeft,
        height: hoveredRect.height,
      }}
    >
      <div className="text-bold absolute origin-center rounded-xl bg-black/50 px-1 text-[12px] text-orange-500">
        ml-{hoveredRect?.spacing.marginLeft}
      </div>
    </div>
  );
};

export const MarginRight = () => {
  const { hoveredRect } = useSelector((store) => store.landingPage);
  return (
    <div
      className="absolute flex items-center justify-center bg-pink-300/30"
      style={{
        right: -hoveredRect.spacing.marginRight,
        width: hoveredRect.spacing.marginRight,
        height: hoveredRect.height,
      }}
    >
      <div className="text-bold absolute origin-center rounded-xl bg-black/50 px-1 text-[12px] text-orange-500">
        mr-{hoveredRect?.spacing.marginRight}
      </div>
    </div>
  );
};
