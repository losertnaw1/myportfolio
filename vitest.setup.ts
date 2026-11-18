import "@testing-library/jest-dom/vitest";

if (typeof window !== "undefined") {
  if (typeof window.ResizeObserver === "undefined") {
    class ResizeObserverStub {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    window.ResizeObserver =
      ResizeObserverStub as unknown as typeof ResizeObserver;
  }

  if (
    typeof Range !== "undefined" &&
    typeof Range.prototype.getBoundingClientRect !== "function"
  ) {
    Range.prototype.getBoundingClientRect = () =>
      ({
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
        toJSON: () => ({}),
      }) as DOMRect;
  }

  if (typeof HTMLCanvasElement !== "undefined") {
    HTMLCanvasElement.prototype.getContext = function getContextStub(
      this: HTMLCanvasElement,
      contextId: string
    ) {
      if (contextId !== "2d") {
        return null;
      }
      return {
        canvas: this,
        globalAlpha: 1,
        fillStyle: "#000000",
        strokeStyle: "#000000",
        font: "12px monospace",
        textAlign: "left",
        textBaseline: "alphabetic",
        lineWidth: 1,
        lineCap: "butt",
        lineJoin: "miter",
        globalCompositeOperation: "source-over",
        clearRect() {},
        fillRect() {},
        fillText() {},
        measureText: (text: string) => ({
          width: text.length * 7,
          fontBoundingBoxAscent: 9,
          fontBoundingBoxDescent: 3,
          actualBoundingBoxAscent: 9,
          actualBoundingBoxDescent: 3,
        }),
        save() {},
        restore() {},
        setTransform() {},
        translate() {},
        rotate() {},
        beginPath() {},
        closePath() {},
        moveTo() {},
        lineTo() {},
        arc() {},
        arcTo() {},
        ellipse() {},
        quadraticCurveTo() {},
        rect() {},
        roundRect() {},
        clip() {},
        stroke() {},
        fill() {},
        drawImage() {},
        getImageData: (_x: number, _y: number, w: number, h: number) => ({
          data: new Uint8ClampedArray(Math.max(4, Math.floor(w) * Math.floor(h) * 4)),
          width: Math.max(1, Math.floor(w)),
          height: Math.max(1, Math.floor(h)),
        }),
        createRadialGradient: () => ({
          addColorStop() {},
        }),
      } as unknown as CanvasRenderingContext2D;
    } as unknown as typeof HTMLCanvasElement.prototype.getContext;
  }
}
