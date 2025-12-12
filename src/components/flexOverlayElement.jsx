// const FlexOverlay = ({ element }) => {
//   if (!element) return null;

//   const rect = element.getBoundingClientRect();
//   const styles = getComputedStyle(element);

//   return (
//     <div
//       style={{
//         position: "fixed",
//         left: rect.left + window.scrollX,
//         top: rect.top + window.scrollY,
//         width: rect.width,
//         height: rect.height,
//         pointerEvents: "none",
//         zIndex: 999999,
//       }}
//     >
//       <div className="relative h-full w-full">
//         {styles.flexDirection === "row" && (
//           <div className="absolute inset-y-1/2 right-2 left-2 h-[2px] bg-blue-400 opacity-70">
//             <div className="absolute -top-[3px] right-0 h-0 w-0 border-y-4 border-l-8 border-y-transparent border-l-blue-400"></div>
//           </div>
//         )}

//         {styles.flexDirection === "column" && (
//           <div className="absolute inset-x-1/2 top-2 bottom-2 w-[2px] bg-blue-400 opacity-70">
//             <div className="absolute bottom-0 -left-[3px] h-0 w-0 border-x-4 border-t-8 border-x-transparent border-t-blue-400"></div>
//           </div>
//         )}

//         {Number.parseInt(styles.gap) > 0 && (
//           <div className="absolute right-2 bottom-2 rounded bg-black/80 px-1 py-[2px] text-[10px] text-white">
//             gap: {styles.gap}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FlexOverlay;
