import './Stats.css'

function Stats({ totalProducts, filteredCount, averagePrice, totalStock, visibleShare }) {
    const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    })

    const revenue = totalStock * (Number(averagePrice) || 0)
    const repeatRate = Math.min(96, Math.max(52, Math.round(visibleShare * 0.72)))
    const conversionRate = Math.min(64, Math.max(12, Math.round((filteredCount / Math.max(totalProducts, 1)) * 100)))
    const newCustomers = filteredCount + (totalProducts * 2)

    const stats = [
        {
            label: 'Ecommerce Revenue',
            value: currency.format(revenue),
            delta: '14.9 %',
            tone: 'peach'
        },
        {
            label: 'New Customers',
            value: newCustomers.toLocaleString('en-US'),
            delta: '8.6 %',
            tone: 'mint',
            down: true
        },
        {
            label: 'Repeat Purchase Rate',
            value: `${repeatRate} %`,
            delta: '25.4 %',
            tone: 'blue'
        },
        {
            label: 'Average Order Value',
            value: `$${(Number(averagePrice) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            delta: '35.2 %',
            tone: 'teal'
        },
        {
            label: 'Conversion rate',
            value: `${conversionRate} %`,
            delta: '12.64 %',
            tone: 'rose',
            down: true
        }
    ]

    return (
        <div className="stats">
            {stats.map((item) => (
                <article className={`stats__card stats__card--${item.tone}`} key={item.label}>
                    <p className="stats__label">{item.label}</p>
                    <h3 className="stats__value">{item.value}</h3>
                    <div className="stats__footer">
                        <span className={`stats__delta${item.down ? ' stats__delta--down' : ''}`}>
                            {item.down ? '▼' : '▲'} {item.delta}
                        </span>
                    </div>
                </article>
            ))}
        </div>
    )
}

export default Stats
