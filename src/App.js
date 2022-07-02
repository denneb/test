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
          alignItems: 'flex-center',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <div className="" style={{ width: '51vw', backgroundColor: '#fff' }}>
          <LineChart />
        </div>
        <div className="" style={{ width: '41vw', backgroundColor: '#fff' }}>
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
