import './Charts.css'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'

function Charts({ categoryChartData, stockChartData }) {
    return (
        <div className="charts">
            <div className="charts__item">
                <h2 className="charts__title">Products by Category</h2>
                <div className="charts__box">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="charts__item">
                <h2 className="charts__title">Stock by Category</h2>
                <div className="charts__box">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stockChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="stock" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Charts
