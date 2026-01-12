# API Documentation - ProductType CRUD (Category Management)

**Base URL:** `http://localhost:8080` (hoặc IP server)

---

## 1. GET - Lấy tất cả loại sản phẩm
**Endpoint:** `GET /product-types`

**Mô tả:** Lấy danh sách tất cả các loại sản phẩm (danh mục)

**Request:**
```bash
curl -X GET http://localhost:8080/product-types
```

**Response (200 OK):** 
```json
[
  {
    "productTypeID": "PT001",
    "productTypeName": "Thực phẩm tươi sống",
    "description": "Các sản phẩm thực phẩm tươi"
  },
  {
    "productTypeID": "PT002",
    "productTypeName": "Đồ uống",
    "description": "Các loại nước và đồ uống"
  }
]
```

---

## 2. GET - Lấy chi tiết loại sản phẩm theo ID
**Endpoint:** `GET /product-types/{productTypeID}`

**Mô tả:** Lấy thông tin chi tiết của một loại sản phẩm cụ thể

**Request:**
```bash
curl -X GET http://localhost:8080/product-types/PT001
```

**Response (200 OK):**
```json
{
  "productTypeID": "PT001",
  "productTypeName": "Thực phẩm tươi sống",
  "description": "Các sản phẩm thực phẩm tươi"
}
```

**Error Response (404 Not Found):**
```json
{
  "status": 404,
  "message": "Not Found"
}
```

---

## 3. POST - Tạo loại sản phẩm mới
**Endpoint:** `POST /product-types`

**Mô tả:** Tạo một loại sản phẩm/danh mục mới

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "productTypeID": "PT003",
  "productTypeName": "Rau củ quả",
  "description": "Các loại rau, củ, quả tươi"
}
```

**Response (201 Created):**
```json
{
  "productTypeID": "PT003",
  "productTypeName": "Rau củ quả",
  "description": "Các loại rau, củ, quả tươi"
}
```

**Error Response (400 Bad Request):**
```json
{
  "status": 400,
  "message": "Invalid request - productTypeID already exists"
}
```

---

## 4. PUT - Cập nhật loại sản phẩm
**Endpoint:** `PUT /product-types/{productTypeID}`

**Mô tả:** Cập nhật thông tin của một loại sản phẩm

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "productTypeID": "PT003",
  "productTypeName": "Rau củ quả tươi",
  "description": "Các loại rau, củ, quả tươi sạch"
}
```

**Response (200 OK):**
```json
{
  "productTypeID": "PT003",
  "productTypeName": "Rau củ quả tươi",
  "description": "Các loại rau, củ, quả tươi sạch"
}
```

---

## 5. DELETE - Xóa loại sản phẩm
**Endpoint:** `DELETE /product-types/{productTypeID}`

**Mô tả:** Xóa một loại sản phẩm/danh mục

**Request:**
```bash
curl -X DELETE http://localhost:8080/product-types/PT003
```

**Response (204 No Content)**

**Error Response (404 Not Found):**
```json
{
  "status": 404,
  "message": "Not Found"
}
```

---

## JavaScript/Fetch Examples

### Get All ProductTypes
```javascript
fetch('http://localhost:8080/product-types')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))
```

### Get ProductType by ID
```javascript
fetch('http://localhost:8080/product-types/PT001')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))
```

### Create ProductType
```javascript
fetch('http://localhost:8080/product-types', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productTypeID: 'PT003',
    productTypeName: 'Rau củ quả',
    description: 'Các loại rau'
  })
})
  .then(res => res.json())
  .then(data => console.log('Created:', data))
  .catch(err => console.error(err))
```

### Update ProductType
```javascript
fetch('http://localhost:8080/product-types/PT003', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productTypeID: 'PT003',
    productTypeName: 'Rau tươi sạch',
    description: 'Rau sạch tươi mới'
  })
})
  .then(res => res.json())
  .then(data => console.log('Updated:', data))
  .catch(err => console.error(err))
```

### Delete ProductType
```javascript
fetch('http://localhost:8080/product-types/PT003', {
  method: 'DELETE'
})
  .then(res => {
    if (res.ok) console.log('Deleted successfully')
    else console.log('Delete failed')
  })
  .catch(err => console.error(err))
```

---

## Axios Examples (for React)

### Create Hook for ProductTypes
```javascript
import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:8080'

export function useProductTypes() {
  const [productTypes, setProductTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProductTypes()
  }, [])

  const fetchProductTypes = async () => {
    try {
      const response = await axios.get(`${API_URL}/product-types`)
      setProductTypes(response.data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const createProductType = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/product-types`, data)
      setProductTypes([...productTypes, response.data])
      return response.data
    } catch (err) {
      throw err
    }
  }

  const updateProductType = async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/product-types/${id}`, data)
      setProductTypes(productTypes.map(pt => pt.productTypeID === id ? response.data : pt))
      return response.data
    } catch (err) {
      throw err
    }
  }

  const deleteProductType = async (id) => {
    try {
      await axios.delete(`${API_URL}/product-types/${id}`)
      setProductTypes(productTypes.filter(pt => pt.productTypeID !== id))
    } catch (err) {
      throw err
    }
  }

  return {
    productTypes,
    loading,
    error,
    fetchProductTypes,
    createProductType,
    updateProductType,
    deleteProductType
  }
}
```

### Use in React Component
```javascript
import React, { useState } from 'react'
import { useProductTypes } from './hooks/useProductTypes'

function ProductTypeManager() {
  const { productTypes, loading, createProductType, updateProductType, deleteProductType } = useProductTypes()
  const [formData, setFormData] = useState({
    productTypeID: '',
    productTypeName: '',
    description: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createProductType(formData)
      setFormData({ productTypeID: '', productTypeName: '', description: '' })
    } catch (err) {
      console.error('Error creating product type:', err)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2>Product Types</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Type ID"
          value={formData.productTypeID}
          onChange={(e) => setFormData({...formData, productTypeID: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Product Type Name"
          value={formData.productTypeName}
          onChange={(e) => setFormData({...formData, productTypeName: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <button type="submit">Create</button>
      </form>

      <ul>
        {productTypes.map((pt) => (
          <li key={pt.productTypeID}>
            <h3>{pt.productTypeName}</h3>
            <p>{pt.description}</p>
            <button onClick={() => deleteProductType(pt.productTypeID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductTypeManager
```

---

## Error Handling

**Common Error Codes:**
- `400 Bad Request` - Dữ liệu không hợp lệ
- `404 Not Found` - ProductType không tồn tại
- `500 Internal Server Error` - Lỗi server

**Error Response Format:**
```json
{
  "status": 400,
  "message": "Mô tả lỗi chi tiết"
}
```

---

## Admin Panel Features

Admin Panel đã cài đặt đầy đủ chức năng CRUD:

✅ **List** - Xem danh sách tất cả danh mục
✅ **Create** - Tạo danh mục mới
✅ **Read** - Xem chi tiết danh mục
✅ **Update** - Sửa thông tin danh mục
✅ **Delete** - Xóa danh mục

**Trang quản lý:** `/app/product-type`
**Tạo mới:** `/app/product-type/create`
**Sửa:** `/app/product-type/edit/:id`

---

## Notes

- ProductTypeID là duy nhất (unique)
- Không thể sửa ProductTypeID (chỉ được sửa ProductTypeName và description)
- Xóa danh mục sẽ ảnh hưởng đến các sản phẩm liên kết
