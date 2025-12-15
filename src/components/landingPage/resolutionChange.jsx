// ResizeHandles.jsx
import { useRef } from "react";
import { FaGripLinesVertical } from "react-icons/fa6";

const ResolutionBar = ({ left, setLeft }) => {
  const onMouseDown = () => () => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    const delta = e.clientX;
    setLeft(delta);
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <>
      <div
        className="fixed top-4 z-9999 w-[100%] rounded-lg border border-dashed border-neutral-300 bg-transparent"
        data-overlay="true "
      >
        <FaGripLinesVertical
          color="var(--color-amber-300)"
          onMouseDown={onMouseDown()}
          style={{ left }}
          data-overlay="true"
          className="absolute -translate-y-[50%] cursor-e-resize"
        />
      </div>
    </>
  );
};

export default ResolutionBar;
