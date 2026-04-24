import { useState } from 'react';

function useDashboard(products) {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [sortBy, setSortBy] = useState('default')

    const categories = [...new Set(products.map((item) => item.category))]

    let filteredProducts = products.filter((item) => {
        const matchSearch = item.title.toLowerCase().includes(search.toLowerCase())
        const matchCategory = category === 'all' || item.category === category
        return matchSearch && matchCategory
    })

    if (sortBy === 'title') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title))
    }

    if (sortBy === 'price-low') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
    }

    if (sortBy === 'price-high') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
    }

    if (sortBy === 'rating') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
    }

    if (sortBy === 'stock') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.stock - a.stock)
    }

    const totalProducts = products.length
    const filteredCount = filteredProducts.length

    const averagePrice =
        filteredProducts.length > 0
            ? (
                filteredProducts.reduce((sum, item) => sum + item.price, 0) /
                filteredProducts.length
            ).toFixed(2)
            : 0

    const totalStock = filteredProducts.reduce((sum, item) => sum + item.stock, 0)

    const countByCategory = {}
    const stockByCategory = {}

    filteredProducts.forEach((item) => {
        if (countByCategory[item.category]) {
            countByCategory[item.category] += 1
        } else {
            countByCategory[item.category] = 1
        }

        if (stockByCategory[item.category]) {
            stockByCategory[item.category] += item.stock
        } else {
            stockByCategory[item.category] = item.stock
        }
    })

    const categoryChartData = Object.keys(countByCategory).map((key) => {
        return {
            category: key,
            count: countByCategory[key]
        }
    })

    const stockChartData = Object.keys(stockByCategory).map((key) => {
        return {
            category: key,
            stock: stockByCategory[key]
        }
    })

    return {
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
    }
}

export default useDashboard



=== 2) src/components/Stats/Stats.jsx ===

import './Stats.css'

function Stats({ totalProducts, filteredCount, averagePrice, totalStock }) {
    return (
        <div className="stats">
            <div className="stats__card">
                <p className="stats__label">Total Products</p>
                <h3 className="stats__value">{totalProducts}</h3>
            </div>

            <div className="stats__card">
                <p className="stats__label">Filtered Products</p>
                <h3 className="stats__value">{filteredCount}</h3>
            </div>

            <div className="stats__card">
                <p className="stats__label">Average Price</p>
                <h3 className="stats__value">{averagePrice}</h3>
            </div>

            <div className="stats__card">
                <p className="stats__label">Total Stock</p>
                <h3 className="stats__value">{totalStock}</h3>
            </div>
        </div>
    )
}

export default Stats



=== 3) src/components/Stats/Stats.css ===

.stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
}

.stats__card {
    border: 1px solid #999;
    padding: 15px;
    display: grid;
    gap: 8px;
}

.stats__label, .stats__value {
    margin: 0;
}



=== 4) App.js ===
import './App.css';
import useProducts from './hooks/useProducts';
import useDashboard from './hooks/useDashboard';
import Filters from './components/Filters/Filters';
import Stats from './components/Stats/Stats';
import DataTable from './components/DataTable/DataTable';

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
    totalStock
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
            <DataTable products={filteredProducts} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
