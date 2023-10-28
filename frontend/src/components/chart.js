import React from 'react';
import { Chart } from 'react-google-charts';

const EmotionLineChart = () => {
  const data = [
    ['Month', 'Joyful', 'Surprise', 'Anger', 'Sad', 'Happy'],
    ['January', 20, 15, 10, 5, 8],
    ['February', 18, 13, 11, 7, 10],
    ['March', 22, 17, 9, 4, 6],
    ['April', 25, 12, 15, 6, 9],
    ['May', 16, 20, 11, 8, 12],
    ['June', 19, 18, 8, 7, 11],
    ['July', 23, 16, 13, 5, 9],
    ['August', 17, 14, 12, 9, 7],
    ['September', 20, 19, 14, 4, 8],
    ['October', 18, 15, 10, 6, 10],
    ['November', 21, 17, 9, 5, 11],
    ['December', 24, 20, 11, 7, 6],
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
