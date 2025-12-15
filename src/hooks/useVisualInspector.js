import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setHoveredRect,
  setLocked,
  setPosition,
  setStylesApplied,
} from "../slices/landingPage.slice";

export const UseVisualInspector = () => {
  const { demoMode, hoveredRect, locked } = useSelector(
    (store) => store.landingPage,
  );
  const dispatch = useDispatch();
  const lockedRef = useRef(null);
  const hoveredRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!demoMode || lockedRef.current) return;

      const target = e.target;
      const classesApplied = Array.from(target.classList);
      const computedStyle = getComputedStyle(target);
      const inlineStyles = target.getAttribute("style");
      dispatch(
        setStylesApplied({ computedStyle, inlineStyles, classesApplied }),
      );

      if (e.target?.closest('[data-overlay="true"]')) return;
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
      if (e.target?.closest('[data-overlay="true"]')) return;
      if (!e.relatedTarget && !e.toElement) {
        dispatch(setHoveredRect(null));
      }
    },
    [demoMode, dispatch],
  );

  const handleClick = useCallback(
    (e) => {
      if (!demoMode) return;
      if (e.target.closest("[data-overlay='true']")) {
        return;
      }

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

    if (lockedRef.current && target) {
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
  return {
    hoveredRect,
    locked,
    lockedRef,
  };
};
