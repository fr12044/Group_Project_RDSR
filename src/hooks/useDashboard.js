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
