import './DataTable.css'

function DataTable({ products, filteredCount, totalProducts }) {
    const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    const getHealth = (item) => {
        if (item.stock < 15) {
            return { label: 'Low stock', tone: 'warning' }
        }

        if (item.rating >= 4.7) {
            return { label: 'Top performer', tone: 'success' }
        }

        return { label: 'Stable', tone: 'neutral' }
    }

    const getStatus = (item) => {
        if (item.stock < 15) {
            return { label: 'In Transit', tone: 'warning' }
        }

        if (item.rating >= 4.7) {
            return { label: 'Delivered', tone: 'success' }
        }

        return { label: 'Delivered', tone: 'neutral' }
    }

    return (
        <div className="data-table">
            <div className="data-table__header">
                <div>
                    <p className="data-table__eyebrow">Recent Orders</p>
                    <h2 className="data-table__title">Product activity</h2>
                </div>
                <p className="data-table__summary">
                    Showing {filteredCount} of {totalProducts} products
                </p>
            </div>

            {products.length === 0 && (
                <div className="data-table__empty">
                    No products match the current search and filter combination.
                </div>
            )}

            {products.length > 0 && (
                <div className="data-table__scroll">
                    <table className="data-table__table">
                        <thead>
                            <tr className="data-table__row">
                                <th className="data-table__head" scope="col">#</th>
                                <th className="data-table__head" scope="col">Image</th>
                                <th className="data-table__head" scope="col">Product Name</th>
                                <th className="data-table__head" scope="col">Category</th>
                                <th className="data-table__head" scope="col">Price</th>
                                <th className="data-table__head" scope="col">Stock</th>
                                <th className="data-table__head" scope="col">Rating</th>
                                <th className="data-table__head" scope="col">Health</th>
                                <th className="data-table__head" scope="col">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.slice(0, 8).map((item, index) => {
                                const health = getHealth(item)
                                const status = getStatus(item)

                                return (
                                    <tr className="data-table__row" key={item.id}>
                                        <td className="data-table__cell data-table__cell--mono">{index + 1}</td>
                                        <td className="data-table__cell">
                                            <div className="data-table__image-wrap">
                                                <img className="data-table__image" src={item.thumbnail} alt={item.title} />
                                            </div>
                                        </td>
                                        <td className="data-table__cell">
                                            <div className="data-table__product">
                                                <span className="data-table__cell--title">{item.title}</span>
                                                <span className="data-table__product-meta">SKU-{item.id.toString().padStart(4, '0')}</span>
                                            </div>
                                        </td>
                                        <td className="data-table__cell">
                                            <span className="data-table__tag">{item.category}</span>
                                        </td>
                                        <td className="data-table__cell">{currency.format(item.price)}</td>
                                        <td className="data-table__cell">{item.stock}</td>
                                        <td className="data-table__cell">{item.rating.toFixed(1)}</td>
                                        <td className="data-table__cell">
                                            <span className={`data-table__health data-table__health--${health.tone}`}>
                                                {health.label}
                                            </span>
                                        </td>
                                        <td className="data-table__cell">
                                            <span className={`data-table__status data-table__status--${status.tone}`}>
                                                {status.label}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default DataTable
