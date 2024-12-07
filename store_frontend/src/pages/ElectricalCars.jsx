import { useState, useEffect, useRef } from 'react';
import { Link }                        from 'react-router-dom';

const isAdmin = () => {
  return true;
};

const ElectricalCars = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex]             = useState(0);
  const [newProduct, setNewProduct] = useState({
    category: '',
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    sku: '',
    availability: 'in_stock',
    image: '',
  });
  const [isFormVisible, setIsFormVisible]           = useState(false);
  const [error, setError]                           = useState('');
  const [isAddButtonVisible, setIsAddButtonVisible] = useState(true);

  const touchStartX                                 = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/'); // Adjust URL as needed
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data); // Set fetched data to state
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      rotateProducts('next');
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const rotateProducts = (direction) => {
    setCurrentIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % products.length;
      } else {
        return (prevIndex - 1 + products.length) % products.length;
      }
    });
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      rotateProducts(diff > 0 ? 'next' : 'prev');
    }

    touchStartX.current = null;
  };

  const getVisibleProducts = () => {
    if (products.length === 0) return []; // Ensure products are available before accessing them
    
    return [
      products[currentIndex],
      products[(currentIndex + 1) % products.length],
      products[(currentIndex + 2) % products.length],
    ];
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setError('');

    const priceFloat = parseFloat(newProduct.price);
    if (isNaN(priceFloat) || priceFloat <= 0) {
      setError('Price must be a positive number.');
      return;
    }

    const productToAdd = {
      category: newProduct.category,
      name: newProduct.name,
      description: newProduct.description || '',
      price: priceFloat,
      stock_quantity: newProduct.stock_quantity || 0,
      sku: newProduct.sku || 'N/A',
      availability: newProduct.availability,
      image: newProduct.image || '',
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productToAdd),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, data]);
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
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Electrical Cars</h2>


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
{products.length > 0 && (
  <div
    className="flex overflow-hidden"
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
  >
    {getVisibleProducts().map((product) => (
      <div key={product.id} className="w-1/3 p-4 transition-all duration-500 ease-in-out">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={product.image} alt={product.name} className="w-48 h-32 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">Price: {product.price}</p>
            <p className="text-gray-600 mb-4">Rating: {product.rating}</p>
            <Link
              to={`/product/${product.name}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              More Info
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
)}


      <div className="flex justify-center mt-4">
        <button
          onClick={() => rotateProducts('prev')}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition-colors"
        >
          &lt; Prev
        </button>
        <button
          onClick={() => rotateProducts('next')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default ElectricalCars;
