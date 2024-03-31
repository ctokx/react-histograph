# react-histograph

`react-histograph` is a React component for rendering histograms. It provides an easy-to-use interface for displaying histograms in React applications, utilizing an underlying JavaScript class to manage the histogram drawing on an HTML canvas element.

## Installation

install it like this:

```bash
npm install react-histograph
```

## Usage

### In a React Application

Import `ReactHistogram` from `react-histograph` and use it in your component:

```jsx
import ReactHistogram from "react-histograph/react";

const MyComponent = () => {
  const dataSets = [{ data: [10, 20, 30, 40, 50], color: "red" }];

  const options = {
    showXAxisValues: true,
    showYAxisValues: true,
    numBins: 5,
    normalize: false,
  };

  return <ReactHistogram dataSets={dataSets} options={options} />;
};

export default MyComponent;
```

### Features

- `addDataSet({ data, color })`: Adds a dataset for the histogram where `data` is an array of numbers and `color` is a string representing the color of the histogram bars.
- `draw(options)`: Renders the histogram on the canvas. Options include axis visibility, normalization, bin count, etc.

## Author

Varol Cagdas Tok

## License

MIT
