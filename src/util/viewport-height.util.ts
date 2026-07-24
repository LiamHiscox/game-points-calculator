import { useEffect, useState } from "react";

export interface ViewportHeightStateProps {
  height: string;
}

function heightToCss() {
    const height = window.visualViewport?.height;
    return height ? height + 'px' : '100dvh';
}

export const useViewportHeightState = (): ViewportHeightStateProps => {
  const [internalHeight, setInternalHeight] = useState(heightToCss());
  const [exportedHeight, setExportedHeight] = useState(heightToCss());
  const [timeoutRef, setTimeoutRef] = useState<number | null>(null);

  useEffect(() => {
    const actualHeight = heightToCss();
    if (actualHeight == internalHeight) {
      setExportedHeight(actualHeight)
    }
  }, [internalHeight]);

  useEffect(() => {
    window.visualViewport?.addEventListener('resize', () => {
      clearTimeout(timeoutRef ?? undefined);
      const ref = setTimeout(() => {
        setInternalHeight(heightToCss());
      });
      setTimeoutRef(ref);
    });
  }, []);

  return {height: exportedHeight};
}
