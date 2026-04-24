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
