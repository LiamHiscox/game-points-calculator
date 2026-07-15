import { useEffect, useState } from "react";

export interface ViewportHeightStateProps {
  height: string;
}

function heightToCss() {
    const height = window.visualViewport?.height;
    return height ? height + 'px' : '100dvh';
}

export const useViewportHeightState = (): ViewportHeightStateProps => {
  const [height, setHeight] = useState(heightToCss());

  useEffect(() => {
    window.visualViewport?.addEventListener('resize', () => setHeight(heightToCss()));
  }, []);

  return {height};
}
