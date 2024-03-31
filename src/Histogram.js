export class Histogram {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.dataSets = [];
  }

  addDataSet({ data, color }) {
    this.dataSets.push({ data, color });
  }

  draw(options = {}) {
    const {
      showXAxisValues = true,
      showYAxisValues = true,
      showXAxisLabels = true,
      showYAxisLabels = true,
      xAxisTicks = null,
      yMax = null,
      numBins = 10,
      normalize = false,
      barPadding = 5,
    } = options;

    if (this.dataSets.length === 0) return;

    const padding = 50;
    const width = this.canvas.width - 2 * padding;
    const height = this.canvas.height - 2 * padding;
    const allData = this.dataSets.flatMap((ds) => ds.data);
    const globalMaxVal = yMax !== null ? yMax : Math.max(...allData);
    const globalMinVal = Math.min(...allData);
    const binWidth = (globalMaxVal - globalMinVal) / numBins;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(padding, padding - 20);
    this.ctx.lineTo(padding, padding + height);
    this.ctx.lineTo(padding + width + 20, padding + height);
    this.ctx.stroke();

    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "black";
    if (showXAxisLabels) {
      this.ctx.fillText("X", padding + width + 30, padding + height + 5); // Adjust 'X' label position
    }
    if (showYAxisLabels) {
      this.ctx.fillText("Y", padding - 5, padding - 30);
    }

    const datasetBarWidth = width / numBins / this.dataSets.length - barPadding;

    this.dataSets.forEach((dataSet, datasetIndex) => {
      const histogramData = new Array(numBins).fill(0);
      dataSet.data.forEach((value) => {
        let bin = Math.floor((value - globalMinVal) / binWidth);
        bin = bin === numBins ? numBins - 1 : bin;
        histogramData[bin]++;
      });

      const allHistogramData = this.dataSets.flatMap((dataSet) => {
        const histogramData = new Array(numBins).fill(0);
        dataSet.data.forEach((value) => {
          let bin = Math.floor((value - globalMinVal) / binWidth);
          bin = bin === numBins ? numBins - 1 : bin;
          histogramData[bin]++;
        });
        return histogramData;
      });

      const maxCount = Math.max(...allHistogramData);

      histogramData.forEach((count, i) => {
        const x =
          padding +
          i * (width / numBins) +
          datasetBarWidth * datasetIndex +
          barPadding / 2;
        const barHeight = (count / maxCount) * height;
        const y = padding + height - barHeight;

        this.ctx.fillStyle = dataSet.color;
        this.ctx.fillRect(x, y, datasetBarWidth, barHeight);
      });
    });
    if (showXAxisValues) {
      const ticks = xAxisTicks || Math.min(10, Math.floor(width / 50));
      for (let i = 0; i <= ticks; i++) {
        const x = padding + i * (width / ticks);
        const value =
          globalMinVal + (globalMaxVal - globalMinVal) * (i / ticks);
        const label = normalize
          ? value.toFixed(2)
          : Math.round(value).toString();
        this.ctx.fillText(label, x, padding + height + 20);
      }
    }
    const totalDataCount = this.dataSets.reduce(
      (total, dataSet) => total + dataSet.data.length,
      0
    );

    if (showYAxisValues) {
      const allHistogramData = this.dataSets.flatMap((dataSet) => {
        const histogramData = new Array(numBins).fill(0);
        dataSet.data.forEach((value) => {
          let bin = Math.floor((value - globalMinVal) / binWidth);
          bin = bin === numBins ? numBins - 1 : bin;
          histogramData[bin]++;
        });
        return histogramData;
      });

      const maxCount = Math.max(...allHistogramData);
      const maxBinCount = Math.max(...allHistogramData);

      for (let i = 0; i <= 5; i++) {
        const count = (maxCount / 5) * i;
        const y = padding + height - (height * count) / maxCount;
        const label = normalize
          ? (count / maxBinCount).toFixed(2)
          : Math.round(count).toString();
        this.ctx.fillText(label, padding - 40, y);
      }
    }
  }
}
