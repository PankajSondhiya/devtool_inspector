// import { useEffect, useState } from "react";

// export default function useDemoMode() {
//   const [demoMode, setDemoMode] = useState(false);
//   const [hoveredRect, setHoveredRect] = useState(null);

//   useEffect(() => {
//     if (!demoMode) {
//       setHoveredRect(null);
//       return;
//     }

//     const handleMouseMove = (e) => {
//       const target = e.target;

//       if (!target || target.id === "demo-highlight-overlay") return;

//       const rect = target.getBoundingClientRect();
//       setHoveredRect({
//         width: rect.width,
//         height: rect.height,
//         left: rect.left + window.scrollX,
//         top: rect.top + window.scrollY,
//         element: target,
//       });
//     };

//     const handleClick = (e) => {
//       if (!demoMode) return;

//       e.preventDefault();
//       e.stopPropagation();

//       const target = e.target;

//       //       alert(
//       //         `ELEMENT DETAILS:
//       // -----------------------
//       // Tag: ${target.tagName}
//       // ID: ${target.id}
//       // Classes: ${target.className}
//       // Text: ${target.innerText.slice(0, 60)}`,
//       //       );
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("click", handleClick, true);

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("click", handleClick, true);
//     };
//   }, [demoMode]);

//   return { demoMode, setDemoMode, hoveredRect };
// }
