import './Filters.css'

function Filters({
    search,
    setSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    categories,
    activeFilterCount,
    onReset
}) {
    return (
        <div className="filters">
            <div className="filters__header">
                <div className="filters__intro">
                    <p className="filters__eyebrow">Controls</p>
                    <h2 className="filters__title">Refine dashboard data</h2>
                </div>

                <div className="filters__actions">
                    <p className="filters__badge">{activeFilterCount} active</p>
                    <button className="filters__reset" type="button" onClick={onReset}>
                        Reset filters
                    </button>
                </div>
            </div>

            <div className="filters__grid">
                <label className="filters__item" htmlFor="search">
                    <span className="filters__label">Keyword</span>
                    <input
                        className="filters__input"
                        id="search"
                        type="text"
                        placeholder="Search products"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </label>

                <label className="filters__item" htmlFor="category">
                    <span className="filters__label">Category</span>
                    <select
                        className="filters__select"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="all">All</option>
                        {categories.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </label>

                <label className="filters__item" htmlFor="sortBy">
                    <span className="filters__label">Sort order</span>
                    <select
                        className="filters__select"
                        id="sortBy"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="title">Title</option>
                        <option value="price-low">Price low to high</option>
                        <option value="price-high">Price high to low</option>
                        <option value="rating">Rating</option>
                        <option value="stock">Stock</option>
                    </select>
                </label>
            </div>
        </div>
    )
}

export default Filters
