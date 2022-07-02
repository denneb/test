import { useEffect, useRef, useState } from 'react';
import Chart from 'react-apexcharts';
import _ from 'lodash';
import { useFetch } from '../../hooks/useFetch';

import { MdOutlineRefresh } from 'react-icons/md';
import { MdError } from 'react-icons/md';

export const LineChart = () => {
  const { data, isLoading, hasError } = useFetch('/price-evolution-chart');
  const [days, setDays] = useState([]);
  const seriesData = useRef([]);

  useEffect(() => {
    if (data) {
      const groupDate = _.groupBy(data, 'dateExtraction');

      const d = Object.keys(groupDate);

      setDays(d.sort());

      const result = _.groupBy(data, 'name');

      const products = Object.keys(result);

      products.forEach((key) => {
        const p = result[key].map((item) => {
          return item.price;
        });
        const itemExiste = seriesData.current.find((item) => item.name === key);
        !itemExiste && seriesData.current.push({ name: key, data: p });
      });
    }
  }, [data]);

  const options = {
    colors: ['#D6215B', '#7530B2', '#FFB448'],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', '#fff'],
        opacity: 0.9,
      },
    },
    xaxis: {
      categories: days,
    },
  };

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
      <div style={{ backgroundColor: '#fff' }}>
        <Chart
          type="line"
          series={seriesData.current}
          options={options}
          width="600"
        />
      </div>
    </>
  );
};
