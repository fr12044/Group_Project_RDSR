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

    return {
        search,
        setSearch,
        category,
        setCategory,
        sortBy,
        setSortBy,
        categories,
        filteredProducts
    }
}

export default useDashboard
