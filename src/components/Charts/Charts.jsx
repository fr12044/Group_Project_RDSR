import './Charts.css'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts'

function Charts({ categoryChartData, stockChartData, variant = 'distribution' }) {
    const hasData = categoryChartData.length > 0 || stockChartData.length > 0
    const focusData = categoryChartData.map((item) => ({
        label: item.category.slice(0, 3).toUpperCase(),
        value: item.count
    }))

    if (variant === 'focus') {
        return (
            <div className="charts charts--focus">
                <div className="charts__focus-header">
                    <h2 className="charts__focus-title">Customer Acquisition</h2>
                </div>

                {!hasData && (
                    <div className="charts__empty">
                        No chart data is available for the current filter combination.
                    </div>
                )}

                {hasData && (
                    <div className="charts__focus-box">
                        <ResponsiveContainer width="100%" height={320}>
                            <AreaChart data={focusData} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="focusFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#6d72f6" stopOpacity={0.35} />
                                        <stop offset="100%" stopColor="#6d72f6" stopOpacity={0.03} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} stroke="#eceef5" />
                                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#98a2b3', fontSize: 12 }} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#98a2b3', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '14px',
                                        border: '1px solid #d8e0ea',
                                        background: '#ffffff'
                                    }}
                                    formatter={(value) => [value, 'Items']}
                                />
                                <Area type="monotone" dataKey="value" stroke="#6d72f6" strokeWidth={3} fill="url(#focusFill)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="charts">
            <div className="charts__intro">
                <div>
                    <p className="charts__eyebrow">Features</p>
                    <h2 className="charts__headline">Distribution overview</h2>
                </div>
                <p className="charts__text">
                    Compare visible products by category count and stock weight.
                </p>
            </div>

            {!hasData && (
                <div className="charts__empty">
                    No chart data is available for the current filter combination.
                </div>
            )}

            {hasData && (
                <div className="charts__grid">
                    <article className="charts__item">
                        <div className="charts__header">
                            <h3 className="charts__title">Product categories</h3>
                            <p className="charts__caption">Visible assortment by category</p>
                        </div>

                        <div className="charts__box">
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={categoryChartData} margin={{ top: 8, right: 12, left: -28, bottom: 0 }}>
                                    <CartesianGrid vertical={false} stroke="#eceef5" />
                                    <XAxis dataKey="category" tickLine={false} axisLine={false} tick={{ fill: '#98a2b3', fontSize: 12 }} />
                                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#98a2b3', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(109, 114, 246, 0.08)' }}
                                        contentStyle={{
                                            borderRadius: '14px',
                                            border: '1px solid #d8e0ea',
                                            background: '#ffffff'
                                        }}
                                        formatter={(value) => [value, 'Products']}
                                    />
                                    <Bar dataKey="count" fill="#6d72f6" radius={[10, 10, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </article>

                    <article className="charts__item">
                        <div className="charts__header">
                            <h3 className="charts__title">Stock by category</h3>
                            <p className="charts__caption">Inventory depth of the current slice</p>
                        </div>

                        <div className="charts__box">
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={stockChartData} margin={{ top: 8, right: 12, left: -28, bottom: 0 }}>
                                    <CartesianGrid vertical={false} stroke="#eceef5" />
                                    <XAxis dataKey="category" tickLine={false} axisLine={false} tick={{ fill: '#98a2b3', fontSize: 12 }} />
                                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#98a2b3', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(78, 205, 196, 0.08)' }}
                                        contentStyle={{
                                            borderRadius: '14px',
                                            border: '1px solid #d8e0ea',
                                            background: '#ffffff'
                                        }}
                                        formatter={(value) => [value, 'Units']}
                                    />
                                    <Bar dataKey="stock" fill="#4ecdc4" radius={[10, 10, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </article>
                </div>
            )}
        </div>
    )
}

export default Charts
