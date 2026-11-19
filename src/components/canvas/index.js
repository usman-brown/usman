import { lazy } from "react";

// 3D scenes are split into their own chunks and only downloaded when the
// component is rendered, so three.js never blocks the first paint.
const ComputersCanvas = lazy(() => import("./Computers"));
const EarthCanvas = lazy(() => import("./Earth"));
const StarsCanvas = lazy(() => import("./Stars"));

import CanvasGate from "./CanvasGate";

export { ComputersCanvas, EarthCanvas, StarsCanvas, CanvasGate };
