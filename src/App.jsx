import { useEffect, useState } from "react";
import "./App.css";
import LandingPage from "./components/landingPage/landingPage";
import ResolutionBar from "./components/landingPage/resolutionChange";
import { useSelector } from "react-redux";

function App() {
  const { demoMode } = useSelector((store) => store.landingPage);

  const [leftOffset, setLeftOffset] = useState(0);

  const viewportWidth = window.innerWidth - leftOffset * 2;

  return (
    <div className="bg-neutral-800">
      {demoMode && <ResolutionBar left={leftOffset} setLeft={setLeftOffset} />}

      <div
        className="relative min-h-screen bg-neutral-900 ease-in"
        id="viewport"
        style={{ width: viewportWidth }}
      >
        <LandingPage />
      </div>
    </div>
  );
}

export default App;
