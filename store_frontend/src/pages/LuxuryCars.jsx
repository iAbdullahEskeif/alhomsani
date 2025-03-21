import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const isAdmin = () => {
    return false;
};
const LuxuryCars = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Carone', price: '$19.99', rating: '4.5', image: '/pic1.jpg?height=200&width=200' },
        { id: 2, name: 'Product 2', price: '$29.99', rating: '4.2', image: '/pic2.webp?height=200&width=200' },
        { id: 3, name: 'Product 3', price: '$39.99', rating: '4.8', image: '/pic3.png?height=200&width=200' }, { id: 4, name: 'Product 4', price: '$49.99', rating: '4.0', image: '/pic4.jpg?height=200&width=200' },
        { id: 5, name: 'Product 5', price: '$59.99', rating: '4.7', image: '/pic5.jpg?height=200&width=200' },
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', rating: '', image: '' });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [error, setError] = useState('');
    const [isAddButtonVisible, setIsAddButtonVisible] = useState(true);
    const touchStartX = useRef(null);

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
        return [
            products[currentIndex],
            products[(currentIndex + 1) % products.length],
            products[(currentIndex + 2) % products.length],
        ];
    };

    const addProduct = (e) => {
        e.preventDefault();
        setError('');

        const ratingInt = parseInt(newProduct.rating, 10);
        if (isNaN(ratingInt) || ratingInt < 0 || ratingInt > 5) {
            setError('Rating must be an integer between 0 and 5.');
            return;
        }

        const priceFloat = parseFloat(newProduct.price.replace('$', ''));
        if (isNaN(priceFloat) || priceFloat <= 0) {
            setError('Price must be a positive number.');
            return;
        }

        const id = products.length + 1;
        const productToAdd = {
            id,
            ...newProduct,
            price: `$${priceFloat.toFixed(2)}`,
        };

        setProducts((prevProducts) => [...prevProducts, productToAdd]);
        setNewProduct({ name: '', price: '', rating: '', image: '' });
        setIsFormVisible(false);
        setIsAddButtonVisible(true);
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
            <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Luxury Cars</h2>

            {isAdmin() && isAddButtonVisible && (
                <button
                    onClick={handleAddProductClick}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
                >
                    Add Product
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
                </button>
            )}

            {error && <p className="text-red-500">{error}</p>}

            {isFormVisible && (
                <form onSubmit={addProduct} className="mb-6">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
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
                        type="text"
                        placeholder="Rating (0-5)"
                        value={newProduct.rating}
                        onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
                        required
                        className="border p-2 mb-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        required
                        className="border p-2 mb-2 w-full"
                    />
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

export default LuxuryCars;
