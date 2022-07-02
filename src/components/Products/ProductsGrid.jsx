import { useEffect } from 'react';
import { toCurrency } from '../../helpers/stringFormat';
import { useFetch } from '../../hooks/useFetch';
import { MdOutlineRefresh } from 'react-icons/md';
import { MdError } from 'react-icons/md';

import '../../styles/components/table.css';

export const ProductsGrid = ({ title }) => {
  const { data, isLoading, hasError } = useFetch('/beer-products');

  const columns = [
    { key: 'name', label: 'Nombre', width: '33%' },
    { key: 'sku', label: 'SKU', width: '14%' },
    { key: 'persistence', label: '% Presencia', width: '21%' },
    { key: 'averagePrice', label: 'Av. Price', width: '16%' },
    { key: 'averagePosition', label: 'Av. Position' },
  ];

  useEffect(() => {
    // if (data) setColumns(Object.keys(data[0]));
  }, [data]);

  return (
    <>
      <h3>{title}</h3>
      <table className="table_striped ">
        <thead>
          <tr>
            {columns.map((col) => (
              <th style={{ width: col.width }} key={col.key}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={5}>
                <MdOutlineRefresh /> Loading data, please wait...
              </td>
            </tr>
          )}
          {hasError && (
            <tr>
              <td colSpan={5} className="text-danger">
                <MdError /> {hasError}
              </td>
            </tr>
          )}
          {data &&
            data.map((item) => (
              <tr key={`rw-${item.id}`}>
                <td
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  className="py-2 px-1"
                >
                  <img
                    src={item.productImage}
                    alt={item.name}
                    style={{
                      width: '121px',

                      paddingRight: '15px',
                    }}
                  />
                  {item.name}
                </td>
                <td>{item.sku}</td>
                <td
                  className={
                    item.persistence < 0 ? 'text-danger' : 'text-success'
                  }
                >
                  {item.persistence < 0
                    ? item.persistence * -100
                    : item.persistence * 100}
                  %
                </td>
                <td>{toCurrency(item.averagePrice)}</td>
                <td>{item.averagePosition}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
