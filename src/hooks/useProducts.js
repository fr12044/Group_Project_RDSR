import { useEffect, useState } from 'react';

function useProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=0')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to load products')
                }
                return res.json()
            })
            .then((data) => {
                setProducts(data.products)
                setLoading(false)
            })
            .catch(() => {
                setError('Error while loading data')
                setLoading(false)
            })
    }, [])

    return { products, loading, error }
}

export default useProducts