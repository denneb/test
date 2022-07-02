import { LineChart } from './components/Products/ProductLineChart';
import { PieChart } from './components/Products/ProductPieChart';

import { ProductsGrid } from './components/Products/ProductsGrid';

function App() {
  return (
    <>
      <h1>General Performance Analysis</h1>
      <div
        className="mt-3"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'space-evenly',
        }}
      >
        <div className="pd-2" style={{ width: '52vw' }}>
          <LineChart />
        </div>
        <div className="pd-2" style={{ width: '44vw' }}>
          <PieChart />
        </div>
      </div>

      <div className="mt-4">
        <ProductsGrid title={'Comparative Analysis'} />
      </div>
    </>
  );
}

export default App;
