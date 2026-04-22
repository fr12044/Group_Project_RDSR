import './DataTable.css'

function DataTable({ products }) {
    return (
        <div className="data-table">
            <h2 className="data-table__title">Products Table</h2>

            <table className="data-table__table">
                <thead>
                    <tr className="data-table__row">
                        <th className="data-table__head">ID</th>
                        <th className="data-table__head">Title</th>
                        <th className="data-table__head">Category</th>
                        <th className="data-table__head">Price</th>
                        <th className="data-table__head">Stock</th>
                        <th className="data-table__head">Rating</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((item) => (
                        <tr className="data-table__row" key={item.id}>
                            <td className="data-table__cell">{item.id}</td>
                            <td className="data-table__cell">{item.title}</td>
                            <td className="data-table__cell">{item.category}</td>
                            <td className="data-table__cell">{item.price}</td>
                            <td className="data-table__cell">{item.stock}</td>
                            <td className="data-table__cell">{item.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable