import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useFetch } from '../../hooks/useFetch';

import { MdOutlineRefresh } from 'react-icons/md';
import { MdError } from 'react-icons/md';

export const PieChart = () => {
  const { data, isLoading, hasError } = useFetch('/presence-share-chart');
  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (data) {
      const lbs = data.map((item) => {
        return item.name;
      });
      const srs = data.map((item) => {
        return item.presenceShare;
      });
      setLabels(lbs);
      setSeries(srs);
    }
  }, [data]);

  return (
    <>
      <h3>Presence Share by Product</h3>
      {isLoading && (
        <div className="text-center">
          <MdOutlineRefresh /> Loading data, please wait...
        </div>
      )}
      {hasError && (
        <span>
          <MdError /> {hasError}
        </span>
      )}
      {data && labels && (
        <div style={{ backgroundColor: '#fff' }} className="donut">
          <Chart
            options={{
              labels,
              dataLabels: {
                enabled: false,
              },
              grid: {
                row: {
                  colors: ['#fff', '#fff'],
                  opacity: 0.5,
                },
              },
              colors: ['#D6215B', '#FF7A00', '#7530B2', '#23B794', '#006FFF'],
            }}
            series={series}
            type="pie"
            width="500"
          />
        </div>
      )}
    </>
  );
};