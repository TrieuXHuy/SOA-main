import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../constants/path'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${API_URL}/products/all`)
        setProducts(response.data || [])
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return {
    products,
    isLoading,
    error
  }
}
