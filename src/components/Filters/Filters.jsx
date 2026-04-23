import './Filters.css'

function Filters({
    search,
    setSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    categories
}) {
    return (
        <div className="filters">
            <div className="filters__item">
                <p className="filters__label">Search by title</p>
                <input className="filters__input" type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>

            <div className="filters__item">
                <p className="filters__label">Category</p>
                <select className="filters__select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="all">All</option>
                    {categories.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>

            <div className="filters__item">
                <p className="filters__label">Sort by</p>
                <select className="filters__select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="default">Default</option>
                    <option value="title">Title</option>
                    <option value="price-low">Price low to high</option>
                    <option value="price-high">Price high to low</option>
                    <option value="rating">Rating</option>
                    <option value="stock">Stock</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
