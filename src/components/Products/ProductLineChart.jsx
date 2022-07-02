import { useEffect, useRef, useState } from 'react';
import Chart from 'react-apexcharts';
import _ from 'lodash';
import moment from 'moment';

import { MdOutlineRefresh } from 'react-icons/md';
import { MdError } from 'react-icons/md';
import { getDates } from '../../helpers/dates';

import { useFetch } from '../../hooks/useFetch';

export const LineChart = () => {
  const { data, isLoading, hasError } = useFetch('/price-evolution-chart');
  const [days, setDays] = useState([]);
  const seriesData = useRef([]);

  useEffect(() => {
    if (data) {
      const groupDate = _.groupBy(data, 'dateExtraction');

      let result = _.groupBy(data, 'name');
      const maxDate = new Date(
        Math.max(
          ...data.map((element) => {
            return new Date(element.dateExtraction);
          })
        )
      );

      const minDate = new Date(
        Math.min(
          ...data.map((element) => {
            return new Date(element.dateExtraction);
          })
        )
      );

      const dates = getDates(minDate, maxDate);
      Object.keys(result).forEach((key) => {
        dates.forEach((element, index) => {
          const date = result[key].find(
            (date) =>
              element.getTime() === new Date(date.dateExtraction).getTime()
          );
          if (date === undefined) {
            var datestring =
              ('0' + (element.getMonth() + 1).toString()).substr(-2) +
              '/' +
              ('0' + element.getDate().toString()).substr(-2) +
              '/' +
              element.getFullYear().toString().substr(2);
            const item = {
              sku: result[key][0].sku,
              name: key,
              price: null,
              dateExtraction: datestring,
            };
            data.splice(index, 0, item);
            console.log(date);
          }
        });
      });

      result = _.groupBy(data, 'name');
      let d = Object.keys(groupDate).sort();
      let d2 = d.map((dt) => {
        return new moment(new Date(dt), 'MM-DD-YYYY').format('MMM DD');
      });
      console.log(d2);
      setDays(d2);
      const products = Object.keys(result);

      products.forEach((key) => {
        const p = result[key].map((item) => {
          return item.price;
        });

        const itemExists = seriesData.current.find((item) => item.name === key);

        !itemExists && seriesData.current.push({ name: key, data: p });
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
      <h3>Price Evolution</h3>
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
        <Chart type="line" series={seriesData.current} options={options} />
      </div>
    </>
  );
};
