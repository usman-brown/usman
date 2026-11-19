import React from "react";

/**
 * If WebGL is unavailable or a 3D scene fails to load, hide the canvas
 * instead of crashing the whole page.
 */
class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) {
      console.warn("3D scene disabled:", error?.message);
    }
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default CanvasErrorBoundary;
