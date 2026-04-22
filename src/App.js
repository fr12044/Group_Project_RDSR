import './App.css';
import useProducts from './hooks/useProducts';
import DataTable from './components/DataTable/DataTable';

function App() {
  const { products, loading, error } = useProducts()

  return (
    <div className="App">
      <h1 className="app__title">Mini Admin Dashboard</h1>

      {loading && <p className="app__text">Loading...</p>}
      {error && <p className="app__text">{error}</p>}

      {!loading && !error && (
        <div className="app__section">
          <DataTable products={products} />
        </div>
      )}
    </div>
  );
}

export default App;