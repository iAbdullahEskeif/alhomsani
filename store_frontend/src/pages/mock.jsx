import { useState } from 'react';

const isAdmin = () => {
  return true; // Adjust this based on actual authentication logic
};

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    category: '',             // Ensure category ID or value is valid
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    sku: '',
    availability: 'in_stock', // Set default availability
    image: '',
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState('');
  const [isAddButtonVisible, setIsAddButtonVisible] = useState(true);

  const addProduct = async (e) => {
    e.preventDefault();
    setError('');

    const priceFloat = parseFloat(newProduct.price);
    if (isNaN(priceFloat) || priceFloat <= 0) {
      setError('Price must be a positive number.');
      return;
    }

    // Prepare product data to match backend
    const productToAdd = {
      category: newProduct.category, // Ensure category ID is valid
      name: newProduct.name,
      description: newProduct.description || '', // Optional field
      price: priceFloat,
      stock_quantity: newProduct.stock_quantity || 0, // Default stock quantity
      sku: newProduct.sku || 'N/A', // Default SKU if not provided
      availability: newProduct.availability,
      image: newProduct.image || '', // Optional image URL
    };

    try {
      const response = await fetch('http://192.168.181.228:8000/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include auth token if required
        },
        body: JSON.stringify(productToAdd),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, data]); // Assuming response contains created product
      setNewProduct({ category: '', name: '', description: '', price: '', stock_quantity: '', sku: '', availability: 'in_stock', image: '' });
      setIsFormVisible(false);
      setIsAddButtonVisible(true);
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Error adding product');
    }
  };

  const handleAddProductClick = () => {
    setIsFormVisible(true);
    setIsAddButtonVisible(false);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setIsAddButtonVisible(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Classic Cars</h2>

      {isAdmin() && isAddButtonVisible && (
        <button
          onClick={handleAddProductClick}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
        >
          Add Product
        </button>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {isFormVisible && (
        <form onSubmit={addProduct} className="mb-6">
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            required
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
            className="border p-2 mb-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            required
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={newProduct.stock_quantity}
            onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: e.target.value })}
            required
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="SKU"
            value={newProduct.sku}
            onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="border p-2 mb-2 w-full"
          />
          <select
            value={newProduct.availability}
            onChange={(e) => setNewProduct({ ...newProduct, availability: e.target.value })}
            className="border p-2 mb-2 w-full"
          >
            <option value="in_stock">In Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Product
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Display the products */}
      <div className="flex flex-wrap">
        {products.map((product) => (
          <div key={product.id} className="w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">Price: ${product.price}</p>
                <p className="text-gray-600 mb-2">Stock: {product.stock_quantity}</p>
                <p className="text-gray-600 mb-4">Availability: {product.availability}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
