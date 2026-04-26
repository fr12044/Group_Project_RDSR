import './App.css';
import useProducts from './hooks/useProducts';
import useDashboard from './hooks/useDashboard';
import Filters from './components/Filters/Filters';
import Stats from './components/Stats/Stats';
import DataTable from './components/DataTable/DataTable';
import Charts from './components/Charts/Charts';

function App() {
  const { products, loading, error } = useProducts()

  const {
    search,
    setSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    categories,
    filteredProducts,
    totalProducts,
    filteredCount,
    averagePrice,
    totalStock,
    categoryChartData,
    stockChartData
  } = useDashboard(products)

  return (
    <div className="App">
      <h1 className="app__title">Mini Admin Dashboard</h1>

      {loading && <p className="app__text">Loading...</p>}
      {error && <p className="app__text">{error}</p>}

      {!loading && !error && (
        <div className="app__content">
          <div className="app__section">
            <Filters search={search} setSearch={setSearch} category={category} setCategory={setCategory} sortBy={sortBy} setSortBy={setSortBy} categories={categories} />
          </div>

          <div className="app__section">
            <Stats totalProducts={totalProducts} filteredCount={filteredCount} averagePrice={averagePrice} totalStock={totalStock} />
          </div>

          <div className="app__section">
            <Charts categoryChartData={categoryChartData} stockChartData={stockChartData} />
          </div>

          <div className="app__section">
            <DataTable products={filteredProducts} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
