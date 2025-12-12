import { useSelector } from "react-redux";

export const PaddingTop = () => {
  const { hoveredRect } = useSelector((store) => store.landingPage);
  return (
    <div
      className="absolute flex items-center justify-center bg-green-500/30"
      style={{
        top: 0,
        left: 0,
        width: hoveredRect.width,
        height: hoveredRect.spacing.paddingTop,
      }}
    >
      <div className="text-bold absolute rounded-lg bg-black/30 px-1 text-[12px] text-yellow-500">
        pt-{hoveredRect?.spacing.paddingTop}
      </div>
    </div>
  );
};
export const PaddingBottom = () => {
  const { hoveredRect } = useSelector((store) => store.landingPage);
  return (
    <div
      className="absolute flex items-center justify-center bg-green-500/30"
      style={{
        bottom: 0,
        left: 0,
        width: hoveredRect.width,
        height: hoveredRect.spacing.paddingTop,
      }}
    >
      <div className="absolute rounded-lg bg-black/30 px-1 text-[12px] text-yellow-500">
        pb-{hoveredRect.spacing.paddingBottom}
      </div>
    </div>
  );
};
export const PaddingLeft = () => {
  const { hoveredRect } = useSelector((store) => store.landingPage);
  return (
    <div
      className="absolute flex items-center justify-start bg-green-500/30"
      style={{
        left: 0,
        top: 0,
        width: hoveredRect.spacing.paddingLeft,
        height: hoveredRect.height,
      }}
    >
      <div className="absolute -rotate-90 rounded-lg bg-black/30 px-1 text-[12px] text-yellow-500">
        pl-{hoveredRect.spacing.paddingLeft}
      </div>
    </div>
  );
};

export const PaddingRight = () => {
  const { hoveredRect } = useSelector((store) => store.landingPage);
  return (
    <div
      className="absolute flex items-center justify-center bg-green-500/30"
      style={{
        right: 0,
        top: 0,
        width: hoveredRect.spacing.paddingRight,
        height: hoveredRect.height,
      }}
    >
      <div
        className="absolute -translate-y-[50%] rotate-90 rounded-xl bg-black/30 px-1 text-[12px] text-yellow-500"
        style={{ top: hoveredRect.height / 2 }}
      >
        pr-{hoveredRect.spacing.paddingRight}
      </div>
    </div>
  );
};
