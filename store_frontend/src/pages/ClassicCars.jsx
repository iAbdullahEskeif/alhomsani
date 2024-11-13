import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const isAdmin = () => {
  return true;
};

const ClassicCars = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState('');
  const [isAddButtonVisible, setIsAddButtonVisible] = useState(true);

  const touchStartX = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log(data); // Inspect data format here
        setProducts(data); 
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      // Clear any existing interval
      if (intervalRef.current) clearInterval(intervalRef.current);

      // Set up the slideshow interval
      intervalRef.current = setInterval(() => {
        rotateProducts('next');
      }, 5000);

      // Cleanup the interval on component unmount or when products change
      return () => clearInterval(intervalRef.current);
    }
  }, [products]); // Depend only on products, not currentIndex


 const rotateProducts = (direction) => {
    if (products.length === 0) return; // Ensure products array has items

    setCurrentIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % products.length;
      } else {
        return (prevIndex - 1 + products.length) % products.length;
      }
    });
  };

  const handleTouchStart = (e) => {
    try {
      touchStartX.current = e.touches[0].clientX;
    } catch (error) {
      console.error('Error in handleTouchStart:', error);
    }
  };

  const handleTouchEnd = (e) => {
    try {
      if (touchStartX.current === null) return;

      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;

      if (Math.abs(diff) > 50) {
        rotateProducts(diff > 0 ? 'next' : 'prev');
      }

      touchStartX.current = null;
    } catch (error) {
      console.error('Error in handleTouchEnd:', error);
    }
  };

  const getVisibleProducts = () => {
    try {
      if (!products || products.length === 0) return [];
  
      return [
        products[currentIndex],
        products[(currentIndex + 1) % products.length],
        products[(currentIndex + 2) % products.length],
      ].filter((product) => product && product.image); // Ensure product and image exist
    } catch (error) {
      console.error('Error in getVisibleProducts:', error);
      setError('Error retrieving products');
      return [];
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setError('');

    try {
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

      const response = await fetch('http://localhost:8000/api/', {
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
    try {
      setIsFormVisible(true);
      setIsAddButtonVisible(false);
    } catch (error) {
      console.error('Error in handleAddProductClick:', error);
    }
  };

  const handleCancel = () => {
    try {
      setIsFormVisible(false);
      setIsAddButtonVisible(true);
    } catch (error) {
      console.error('Error in handleCancel:', error);
    }
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
          {/* form inputs here */}
        </form>
      )}

      {products.length > 0 && (
        <div className="flex overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {getVisibleProducts().map((product, index) => (
            <div key={product.id || index} className="w-1/3 p-4 transition-all duration-500 ease-in-out">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span>No Image</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">Price: {product.price}</p>
                  <p className="text-gray-600 mb-4">Rating: {product.rating || "N/A"}</p>
                  <Link to={`/product/${product.name}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
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

export default ClassicCars;
