import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../constants/path'

export function useProductTypes() {
  const [productTypes, setProductTypes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${API_URL}/product-types`)
        setProductTypes(response.data || [])
      } catch (err) {
        setError(err)
        console.error('Lỗi tải loại sản phẩm:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProductTypes()
  }, [])

  return {
    productTypes,
    isLoading,
    error,
    setProductTypes
  }
}
