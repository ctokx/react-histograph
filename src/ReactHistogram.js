import React, { useEffect, useRef } from "react";

// Assuming Histogram class is defined in another file and imported here
import { Histogram } from "./Histogram";

const ReactHistogram = ({ dataSets, options }) => {
  const canvasRef = useRef(null);
  const histogramRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && !histogramRef.current) {
      histogramRef.current = new Histogram(canvasRef.current);
    }

    const histogram = histogramRef.current;
    if (histogram) {
      histogram.dataSets = [];
      dataSets.forEach((dataSet) => histogram.addDataSet(dataSet));
      histogram.draw(options);
    }

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        if (histogram) {
          histogram.draw(options);
        }
      }
    });

    observer.observe(canvasRef.current);

    return () => observer.disconnect();
  }, [dataSets, options]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default ReactHistogram;
