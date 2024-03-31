"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Histogram = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Histogram = exports.Histogram = /*#__PURE__*/function () {
  function Histogram(canvas) {
    _classCallCheck(this, Histogram);
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.dataSets = [];
  }
  return _createClass(Histogram, [{
    key: "addDataSet",
    value: function addDataSet(_ref) {
      var data = _ref.data,
        color = _ref.color;
      this.dataSets.push({
        data: data,
        color: color
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _options$showXAxisVal = options.showXAxisValues,
        showXAxisValues = _options$showXAxisVal === void 0 ? true : _options$showXAxisVal,
        _options$showYAxisVal = options.showYAxisValues,
        showYAxisValues = _options$showYAxisVal === void 0 ? true : _options$showYAxisVal,
        _options$showXAxisLab = options.showXAxisLabels,
        showXAxisLabels = _options$showXAxisLab === void 0 ? true : _options$showXAxisLab,
        _options$showYAxisLab = options.showYAxisLabels,
        showYAxisLabels = _options$showYAxisLab === void 0 ? true : _options$showYAxisLab,
        _options$xAxisTicks = options.xAxisTicks,
        xAxisTicks = _options$xAxisTicks === void 0 ? null : _options$xAxisTicks,
        _options$yMax = options.yMax,
        yMax = _options$yMax === void 0 ? null : _options$yMax,
        _options$numBins = options.numBins,
        numBins = _options$numBins === void 0 ? 10 : _options$numBins,
        _options$normalize = options.normalize,
        normalize = _options$normalize === void 0 ? false : _options$normalize,
        _options$barPadding = options.barPadding,
        barPadding = _options$barPadding === void 0 ? 5 : _options$barPadding;
      if (this.dataSets.length === 0) return;
      var padding = 50;
      var width = this.canvas.width - 2 * padding;
      var height = this.canvas.height - 2 * padding;
      var allData = this.dataSets.flatMap(function (ds) {
        return ds.data;
      });
      var globalMaxVal = yMax !== null ? yMax : Math.max.apply(Math, _toConsumableArray(allData));
      var globalMinVal = Math.min.apply(Math, _toConsumableArray(allData));
      var binWidth = (globalMaxVal - globalMinVal) / numBins;
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
      var datasetBarWidth = width / numBins / this.dataSets.length - barPadding;
      this.dataSets.forEach(function (dataSet, datasetIndex) {
        var histogramData = new Array(numBins).fill(0);
        dataSet.data.forEach(function (value) {
          var bin = Math.floor((value - globalMinVal) / binWidth);
          bin = bin === numBins ? numBins - 1 : bin;
          histogramData[bin]++;
        });
        var allHistogramData = _this.dataSets.flatMap(function (dataSet) {
          var histogramData = new Array(numBins).fill(0);
          dataSet.data.forEach(function (value) {
            var bin = Math.floor((value - globalMinVal) / binWidth);
            bin = bin === numBins ? numBins - 1 : bin;
            histogramData[bin]++;
          });
          return histogramData;
        });
        var maxCount = Math.max.apply(Math, _toConsumableArray(allHistogramData));
        histogramData.forEach(function (count, i) {
          var x = padding + i * (width / numBins) + datasetBarWidth * datasetIndex + barPadding / 2;
          var barHeight = count / maxCount * height;
          var y = padding + height - barHeight;
          _this.ctx.fillStyle = dataSet.color;
          _this.ctx.fillRect(x, y, datasetBarWidth, barHeight);
        });
      });
      if (showXAxisValues) {
        var ticks = xAxisTicks || Math.min(10, Math.floor(width / 50));
        for (var i = 0; i <= ticks; i++) {
          var x = padding + i * (width / ticks);
          var value = globalMinVal + (globalMaxVal - globalMinVal) * (i / ticks);
          var label = normalize ? value.toFixed(2) : Math.round(value).toString();
          this.ctx.fillText(label, x, padding + height + 20);
        }
      }
      var totalDataCount = this.dataSets.reduce(function (total, dataSet) {
        return total + dataSet.data.length;
      }, 0);
      if (showYAxisValues) {
        var allHistogramData = this.dataSets.flatMap(function (dataSet) {
          var histogramData = new Array(numBins).fill(0);
          dataSet.data.forEach(function (value) {
            var bin = Math.floor((value - globalMinVal) / binWidth);
            bin = bin === numBins ? numBins - 1 : bin;
            histogramData[bin]++;
          });
          return histogramData;
        });
        var maxCount = Math.max.apply(Math, _toConsumableArray(allHistogramData));
        var maxBinCount = Math.max.apply(Math, _toConsumableArray(allHistogramData));
        for (var _i = 0; _i <= 5; _i++) {
          var count = maxCount / 5 * _i;
          var y = padding + height - height * count / maxCount;
          var _label = normalize ? (count / maxBinCount).toFixed(2) : Math.round(count).toString();
          this.ctx.fillText(_label, padding - 40, y);
        }
      }
    }
  }]);
}();