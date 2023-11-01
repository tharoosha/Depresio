import React from 'react';
import { Chart } from 'react-google-charts';

const EmotionLineChart = () => {
  const data = [
    ['Day', 'Joyful', 'Surprise', 'Anger', 'Sad', 'Happy'],
    ['Monday', 20, 15, 10, 5, 8],
    ['Tuesday', 18, 13, 11, 7, 10],
    ['Wednesday', 22, 17, 9, 4, 6],
    ['Tuesday', 25, 12, 15, 6, 9],
    ['Friday', 16, 20, 11, 8, 12],
    ['Saturday', 19, 18, 8, 7, 11],
    ['Sunday', 23, 16, 13, 5, 9]
  ];

  return (
    <div className="chart-container" style={{ width: '100%', maxWidth: 800 }}>
      <Chart
        width={'100%'}
        height={400}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: '',
          hAxis: {
            title: 'Months',
          },
          vAxis: {
            title: 'Emotion Frequency',
          },
          tooltip: { isHtml: true }, // Enable HTML content in tooltip
        }}
      />
    </div>
  );
};

export default EmotionLineChart;
