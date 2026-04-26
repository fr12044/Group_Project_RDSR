import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import './App.css';
import useProducts from './hooks/useProducts';
import useDashboard from './hooks/useDashboard';
import Filters from './components/Filters/Filters';
import DataTable from './components/DataTable/DataTable';
import Charts from './components/Charts/Charts';
import Stats from './components/Stats/Stats';

const PAGE_META = {
  dashboard: { title: 'Dashboard' },
  product: { title: 'Product' },
  inventory: { title: 'Inventory' },
  customers: { title: 'Customers' },
  review: { title: 'Review' },
  payment: { title: 'Payment' },
  integration: { title: 'Integration' },
  settings: { title: 'Settings' },
  help: { title: 'Help' },
  users: { title: 'Manage Users' }
}

const GENERAL_NAV_ITEMS = [
  { route: 'dashboard', label: 'Dashboard' },
  { route: 'product', label: 'Product' },
  { route: 'inventory', label: 'Inventory' },
  { route: 'customers', label: 'Customers' },
  { route: 'review', label: 'Review', badge: '02' },
  { route: 'payment', label: 'Payment' },
  { route: 'integration', label: 'Integration' }
]

const ACCOUNT_NAV_ITEMS = [
  { route: 'settings', label: 'Settings' },
  { route: 'help', label: 'Help' },
  { route: 'users', label: 'Manage Users' }
]

const CUSTOMER_NAMES = [
  'Peterson Jack',
  'Michel Datta',
  'Jeslyn Rose',
  'Markis Hoverson',
  'Jhonny Peters',
  'Rachel Wickler'
]

const DATE_LABELS = ['Sep 07', 'Sep 08', 'Sep 09', 'Sep 10', 'Sep 11', 'Sep 12', 'Sep 13']

function getRouteFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  return PAGE_META[hash] ? hash : 'dashboard'
}

function SummaryCard({ label, value, hint }) {
  return (
    <article className="page-card page-card--summary">
      <p className="page-card__label">{label}</p>
      <p className="page-card__value">{value}</p>
      <p className="page-card__hint">{hint}</p>
    </article>
  )
}

function SimplePanel({ eyebrow, title, children }) {
  return (
    <section className="page-panel">
      <div className="page-panel__header">
        <p className="page-panel__eyebrow">{eyebrow}</p>
        <h3 className="page-panel__title">{title}</h3>
      </div>
      {children}
    </section>
  )
}

function App() {
  const { products, loading, error } = useProducts()
  const [route, setRoute] = useState(() => getRouteFromHash())

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

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash())
    }

    if (!window.location.hash) {
      window.location.hash = '/dashboard'
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const activeFilterCount = [
    search.trim() !== '',
    category !== 'all',
    sortBy !== 'default'
  ].filter(Boolean).length

  const visibleShare = totalProducts > 0
    ? Math.round((filteredCount / totalProducts) * 100)
    : 0

  const averagePriceValue = Number(averagePrice) || 0
  const estimatedRevenue = Math.round(totalStock * averagePriceValue)
  const topRatedProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating).slice(0, 5)
  const lowStockProducts = [...filteredProducts].filter((item) => item.stock < 20).slice(0, 5)

  const mostSellingProducts = [...filteredProducts]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 4)
    .map((item, index) => ({
      ...item,
      sales: 128 + (index * 273)
    }))

  const recentOrders = filteredProducts.slice(0, 5).map((item, index) => ({
    id: item.id,
    title: item.title,
    thumbnail: item.thumbnail,
    customer: CUSTOMER_NAMES[index % CUSTOMER_NAMES.length],
    orderId: `#${8441573 + (index * 731)}`,
    date: `${27 - index} Jun 2025`,
    status: item.stock < 15 ? 'Pending' : item.rating > 4.6 ? 'Shipped' : 'Canceled'
  }))

  const weeklyTopCustomers = CUSTOMER_NAMES.slice(0, 3).map((name, index) => ({
    name,
    orders: 25 - (index * 5),
    initials: name.split(' ').map((part) => part[0]).join('').slice(0, 2)
  }))

  const summaryData = DATE_LABELS.map((label, index) => {
    const item = filteredProducts[index] || filteredProducts[filteredProducts.length - 1]
    return {
      label,
      order: item ? Math.max(2400, Math.round(item.price * 110)) : 3000 + (index * 120),
      income: item ? Math.max(2200, Math.round(item.stock * 58)) : 2800 + (index * 100)
    }
  })

  const handleResetFilters = () => {
    setSearch('')
    setCategory('all')
    setSortBy('default')
  }

  const handleRouteChange = (nextRoute) => {
    window.location.hash = `/${nextRoute}`
  }

  const currentPage = PAGE_META[route]

  const renderDashboardPage = () => (
    <div className="app__content dashboard-page">
      <section className="dashboard-welcome">
        <div>
          <h1 className="dashboard-welcome__title">Welcome Back</h1>
          <p className="dashboard-welcome__text">Here's what happening with your store today</p>
        </div>

        <div className="dashboard-welcome__actions">
          <button className="dashboard-welcome__select" type="button">Previous Year</button>
          <button className="dashboard-welcome__button" type="button">View All Time</button>
        </div>
      </section>

      <section className="app__section">
        <Stats
          totalProducts={totalProducts}
          filteredCount={filteredCount}
          averagePrice={averagePrice}
          totalStock={totalStock}
          visibleShare={visibleShare}
        />
      </section>

      <div className="dashboard-grid dashboard-grid--top">
        <section className="dashboard-panel dashboard-panel--summary">
          <div className="dashboard-panel__header">
            <h3 className="dashboard-panel__title">Summary</h3>
            <div className="dashboard-panel__meta">
              <span className="dashboard-panel__legend dashboard-panel__legend--order">Order</span>
              <span className="dashboard-panel__legend dashboard-panel__legend--income">Income Growth</span>
              <button className="dashboard-panel__period" type="button">Last 7 days</button>
            </div>
          </div>

          <div className="dashboard-panel__chart">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={summaryData} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#eef1f6" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#a0a8b8', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#a0a8b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    border: '1px solid #eceef5',
                    borderRadius: '10px',
                    background: '#ffffff'
                  }}
                />
                <Line type="monotone" dataKey="order" stroke="#19b57d" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="income" stroke="#7a79ff" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="dashboard-panel dashboard-panel--list">
          <div className="dashboard-panel__header">
            <h3 className="dashboard-panel__title">Most Selling Products</h3>
          </div>

          <div className="dashboard-list">
            {mostSellingProducts.map((item) => (
              <article className="dashboard-list__item" key={item.id}>
                <div className="dashboard-list__media">
                  <img className="dashboard-list__image" src={item.thumbnail} alt={item.title} />
                </div>
                <div className="dashboard-list__copy">
                  <p className="dashboard-list__title">{item.title}</p>
                  <p className="dashboard-list__meta">ID: {2441310 + item.id}</p>
                </div>
                <p className="dashboard-list__badge">{item.sales} Sales</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="dashboard-grid dashboard-grid--bottom">
        <section className="dashboard-panel dashboard-panel--orders">
          <div className="dashboard-panel__header">
            <h3 className="dashboard-panel__title">Recent Orders</h3>
            <button className="dashboard-panel__link" type="button">View All</button>
          </div>

          <div className="dashboard-orders">
            <table className="dashboard-orders__table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((item) => (
                  <tr key={item.orderId}>
                    <td>
                      <div className="dashboard-orders__product">
                        <img className="dashboard-orders__product-image" src={item.thumbnail} alt={item.title} />
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td>{item.customer}</td>
                    <td>{item.orderId}</td>
                    <td>{item.date}</td>
                    <td>
                      <span className={`dashboard-orders__status dashboard-orders__status--${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dashboard-panel dashboard-panel--customers">
          <div className="dashboard-panel__header">
            <h3 className="dashboard-panel__title">Weekly Top Customers</h3>
          </div>

          <div className="dashboard-users">
            {weeklyTopCustomers.map((item) => (
              <article className="dashboard-users__item" key={item.name}>
                <div className="dashboard-users__avatar">{item.initials}</div>
                <div className="dashboard-users__copy">
                  <p className="dashboard-users__name">{item.name}</p>
                  <p className="dashboard-users__meta">{item.orders} Orders</p>
                </div>
                <button className="dashboard-users__button" type="button">View</button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )

  const renderGenericPage = () => {
    if (loading) {
      return <p className="app__status">Loading product feed...</p>
    }

    if (error) {
      return <p className="app__status app__status--error">{error}</p>
    }

    if (route === 'product') {
      return (
        <div className="app__content">
          <Filters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={categories}
            activeFilterCount={activeFilterCount}
            onReset={handleResetFilters}
          />
          <DataTable products={filteredProducts} filteredCount={filteredCount} totalProducts={totalProducts} />
        </div>
      )
    }

    if (route === 'inventory') {
      return (
        <div className="app__content">
          <section className="page-grid page-grid--three">
            <SummaryCard label="Visible Products" value={filteredCount} hint="Items in the current stock scope" />
            <SummaryCard label="Total Stock" value={totalStock} hint="Units ready across visible products" />
            <SummaryCard label="Low Stock Alerts" value={lowStockProducts.length} hint="Products under 20 units" />
          </section>
          <DataTable products={filteredProducts} filteredCount={filteredCount} totalProducts={totalProducts} />
        </div>
      )
    }

    if (route === 'customers') {
      return (
        <div className="app__content">
          <section className="page-grid page-grid--three">
            <SummaryCard label="Active Categories" value={categories.length} hint="Visible groups in the current slice" />
            <SummaryCard label="Filtered Products" value={filteredCount} hint="Products in the visible category scope" />
            <SummaryCard label="Catalog Reach" value={`${visibleShare}%`} hint="How much of the full catalog is on screen" />
          </section>
          <Charts categoryChartData={categoryChartData} stockChartData={stockChartData} variant="distribution" />
        </div>
      )
    }

    if (route === 'review') {
      return (
        <div className="app__content">
          <div className="page-grid page-grid--two">
            <SimplePanel eyebrow="Top Rated" title="Products worth highlighting">
              <div className="page-list">
                {topRatedProducts.map((item) => (
                  <article className="page-list__item" key={item.id}>
                    <div>
                      <p className="page-list__title">{item.title}</p>
                      <p className="page-list__meta">{item.category}</p>
                    </div>
                    <p className="page-list__value">{item.rating.toFixed(1)}</p>
                  </article>
                ))}
              </div>
            </SimplePanel>

            <SimplePanel eyebrow="Attention" title="Low stock products">
              <div className="page-list">
                {lowStockProducts.length === 0 && <p className="page-empty">No low-stock items in the current view.</p>}
                {lowStockProducts.map((item) => (
                  <article className="page-list__item" key={item.id}>
                    <div>
                      <p className="page-list__title">{item.title}</p>
                      <p className="page-list__meta">{item.category}</p>
                    </div>
                    <p className="page-list__value">{item.stock}</p>
                  </article>
                ))}
              </div>
            </SimplePanel>
          </div>
        </div>
      )
    }

    if (route === 'payment') {
      return (
        <div className="app__content">
          <section className="page-grid page-grid--three">
            <SummaryCard label="Estimated Revenue" value={`$${estimatedRevenue.toLocaleString('en-US')}`} hint="Stock multiplied by average visible price" />
            <SummaryCard label="Average Price" value={`$${averagePriceValue.toFixed(2)}`} hint="Current catalog slice mean price" />
            <SummaryCard label="Premium Products" value={filteredProducts.filter((item) => item.price >= averagePriceValue).length} hint="Products priced at or above the average" />
          </section>
          <DataTable products={[...filteredProducts].sort((a, b) => b.price - a.price)} filteredCount={filteredCount} totalProducts={totalProducts} />
        </div>
      )
    }

    if (route === 'integration') {
      return (
        <div className="app__content">
          <section className="page-grid page-grid--three">
            <SummaryCard label="Product Source" value="Connected" hint="DummyJSON feed is responding" />
            <SummaryCard label="Category Sync" value={categories.length} hint="Distinct categories discovered in the feed" />
            <SummaryCard label="Last Snapshot" value={`${filteredCount} rows`} hint="Current synchronized visible data slice" />
          </section>
        </div>
      )
    }

    if (route === 'settings') {
      return (
        <div className="app__content">
          <section className="page-grid page-grid--three">
            <SummaryCard label="Default Category" value={category === 'all' ? 'All categories' : category} hint="Current workspace selection" />
            <SummaryCard label="Default Sort" value={sortBy === 'default' ? 'Default order' : sortBy} hint="Sort logic in active use" />
            <SummaryCard label="Search State" value={search.trim() || 'No query'} hint="Current keyword filter" />
          </section>
        </div>
      )
    }

    if (route === 'help') {
      return (
        <div className="app__content">
          <SimplePanel eyebrow="Support" title="Common operator actions">
            <div className="page-list">
              <article className="page-list__item">
                <div>
                  <p className="page-list__title">Find a product fast</p>
                  <p className="page-list__meta">Use the Product page and search by title.</p>
                </div>
              </article>
              <article className="page-list__item">
                <div>
                  <p className="page-list__title">Inspect inventory health</p>
                  <p className="page-list__meta">Open Inventory to review low-stock items and status tags.</p>
                </div>
              </article>
            </div>
          </SimplePanel>
        </div>
      )
    }

    return (
      <div className="app__content">
        <section className="page-grid page-grid--three">
          <SummaryCard label="Workspace Users" value="3" hint="Active operator roles in the current workspace" />
          <SummaryCard label="Focused Catalog" value={filteredCount} hint="Current product slice visible to users" />
          <SummaryCard label="Shared Scope" value={category === 'all' ? 'All categories' : category} hint="Working segment for the current team" />
        </section>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <div className="App">
        <aside className="sidebar">
          <div className="sidebar__brand">
            <p className="sidebar__brand-name">Admin</p>
            <button className="sidebar__brand-toggle" type="button" aria-label="Toggle menu">≡</button>
          </div>

          <div className="sidebar__section">
            <p className="sidebar__section-title">General</p>
            <nav className="sidebar__nav" aria-label="General navigation">
              {GENERAL_NAV_ITEMS.map((item) => (
                <button
                  className={`sidebar__link${route === item.route ? ' sidebar__link--active' : ''}`}
                  onClick={() => handleRouteChange(item.route)}
                  key={item.route}
                  type="button"
                >
                  <span className="sidebar__link-icon" aria-hidden="true" />
                  <span className="sidebar__link-label">{item.label}</span>
                  {item.badge && <span className="sidebar__link-badge">{item.badge}</span>}
                </button>
              ))}
            </nav>
          </div>

          <div className="sidebar__section">
            <p className="sidebar__section-title">Account</p>
            <nav className="sidebar__nav" aria-label="Account navigation">
              {ACCOUNT_NAV_ITEMS.map((item) => (
                <button
                  className={`sidebar__link${route === item.route ? ' sidebar__link--active' : ''}`}
                  key={item.route}
                  onClick={() => handleRouteChange(item.route)}
                  type="button"
                >
                  <span className="sidebar__link-icon sidebar__link-icon--thin" aria-hidden="true" />
                  <span className="sidebar__link-label">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="sidebar__logout">
            <button className="sidebar__link sidebar__link--logout" type="button">
              <span className="sidebar__link-icon sidebar__link-icon--thin" aria-hidden="true" />
              <span className="sidebar__link-label">Logout</span>
            </button>
          </div>
        </aside>

        <main className="app-main">
          <div className="topbar">
            <label className="topbar__search">
              <span className="topbar__search-icon" aria-hidden="true">⌕</span>
              <input className="topbar__input" placeholder="Search" type="text" />
            </label>

            <div className="topbar__actions">
              <button className="topbar__icon" type="button">☆</button>
              <button className="topbar__icon" type="button">☾</button>
              <button className="topbar__icon" type="button">◌</button>
              <div className="topbar__avatar">P</div>
            </div>
          </div>

          {route === 'dashboard' ? (
            renderDashboardPage()
          ) : (
            <>
              <header className="workspace-header">
                <div className="workspace-header__copy">
                  <h1 className="app__title">{currentPage.title}</h1>
                </div>
              </header>
              {renderGenericPage()}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
