// js/api.js
const API_URL = 'http://localhost:3000/api';

// Obtener todos los productos
async function getProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        return await response.json();
    } catch (error) {
        console.error('Error obteniendo los productos:', error);
    }
}

// Agregar un nuevo producto
async function addProduct(productData) {
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error al agregar el producto:', error);
    }
}

// Actualizar un producto
async function updateProduct(id, productData) {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
    }
}

// Eliminar un producto
async function deleteProduct(id) {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}
