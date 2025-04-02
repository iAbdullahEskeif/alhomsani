import { useState, useRef, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../config";
import { useAuth } from "@clerk/clerk-react";
import {
	ChevronLeft,
	ChevronRight,
	Plus,
	X,
	Tag,
	DollarSign,
	Package,
	Layers,
	FileText,
	ImageIcon,
	AlertCircle,
	Gauge,
} from "lucide-react";

interface Product {
	id: number;
	name: string;
	description: string;
	price: string;
	stock_quantity: number;
	sku: string;
	category: number;
	availability: "in_stock" | "out_of_stock";
	images: string;
}

interface NewProduct {
	name: string;
	description: string;
	price: string;
	stock_quantity: number;
	sku: string;
	category: number;
	availability: "in_stock" | "out_of_stock";
	images: string;
}

const isAdmin = (): boolean => {
	return true;
};

function ClassicCars() {
	const queryClient = useQueryClient();
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [newProduct, setNewProduct] = useState<NewProduct>({
		name: "",
		description: "",
		price: "",
		stock_quantity: 1,
		sku: "",
		category: 1,
		availability: "in_stock",
		images: "",
	});
	const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
	const [isAddButtonVisible, setIsAddButtonVisible] = useState<boolean>(true);
	const [error, setError] = useState<string>("");
	const touchStartX = useRef<number | null>(null);

	const { getToken } = useAuth();
	const fetchProducts = async (productData: NewProduct): Promise<Product[]> => {
		try {
			const response = await fetch(`${API_URL}/api/`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${await getToken()}`,
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			return await response.json();
		} catch (error) {
			console.error("Error fetching products:", error);
			throw error;
		}
	};

	const createProduct = async (productData: NewProduct): Promise<Product> => {
		try {
			const response = await fetch(`${API_URL}/api/`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${await getToken()}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(productData),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.detail || "Failed to create product");
			}

			return await response.json();
		} catch (error) {
			console.error("Error creating product:", error);
			throw error;
		}
	};

	const {
		data: products = [],
		isLoading,
		isError,
		error: queryError,
	} = useQuery<Product[]>({
		queryKey: ["products"],
		queryFn: fetchProducts,
		staleTime: 60000,
	});

	const addProductMutation = useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });

			setNewProduct({
				name: "",
				description: "",
				price: "",
				stock_quantity: 1,
				sku: "",
				category: 1,
				availability: "in_stock",
				images: "",
			});
			setIsFormVisible(false);
			setIsAddButtonVisible(true);
			setError("");
		},
		onError: (error: Error) => {
			setError(error.message || "Failed to add product. Please try again.");
		},
	});

	useEffect(() => {
		if (products.length > 0) {
			const interval = setInterval(() => {
				rotateProducts("next");
			}, 5000);

			return () => clearInterval(interval);
		}
	}, [currentIndex, products.length]);

	const rotateProducts = (direction: "next" | "prev") => {
		if (products.length === 0) return;

		setCurrentIndex((prevIndex) => {
			if (direction === "next") {
				return (prevIndex + 1) % products.length;
			} else {
				return (prevIndex - 1 + products.length) % products.length;
			}
		});
	};

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
		if (touchStartX.current === null) return;

		const touchEndX = e.changedTouches[0].clientX;
		const diff = touchStartX.current - touchEndX;

		if (Math.abs(diff) > 50) {
			rotateProducts(diff > 0 ? "next" : "prev");
		}

		touchStartX.current = null;
	};

	const getVisibleProducts = (): Product[] => {
		if (products.length === 0) return [];

		const visibleProducts: Product[] = [];

		if (products.length > 0) {
			visibleProducts.push(products[currentIndex]);
		}

		if (products.length > 1) {
			visibleProducts.push(products[(currentIndex + 1) % products.length]);
		}

		if (products.length > 2) {
			visibleProducts.push(products[(currentIndex + 2) % products.length]);
		}

		return visibleProducts;
	};

	const addProduct = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const priceFloat = Number.parseFloat(newProduct.price);
			if (isNaN(priceFloat) || priceFloat <= 0) {
				setError("Price must be a positive number.");
				return;
			}

			const stockQuantity = Number.parseInt(
				newProduct.stock_quantity.toString(),
				10,
			);
			if (isNaN(stockQuantity) || stockQuantity < 0) {
				setError("Stock quantity must be a non-negative integer.");
				return;
			}

			const productData: NewProduct = {
				...newProduct,
				price: priceFloat.toString(),
				stock_quantity: stockQuantity,
			};

			addProductMutation.mutate(productData);
		} catch (error) {
			console.error("Error adding product:", error);
			setError(
				(error as Error).message || "Failed to add product. Please try again.",
			);
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

	const formatPrice = (price: string): string => {
		return `$${Number.parseFloat(price).toFixed(2)}`;
	};

	return (
		<div className="min-h-screen bg-[#0a0a0a] ">
			<div className="w-full max-w-6xl mx-auto p-4">
				<div className="flex items-center mb-6">
					<div className="w-1 h-8 bg-rose-600 mr-3"></div>
					<h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white">
						Classic Cars
					</h2>
				</div>

				{error && (
					<div className="mb-6 p-3 bg-zinc-800/50 border border-rose-900/50 rounded-lg flex items-start">
						<AlertCircle
							className="text-rose-500 mr-2 flex-shrink-0 mt-0.5"
							size={18}
						/>
						<p className="text-rose-500 text-sm">{error}</p>
					</div>
				)}

				{isAdmin() && isAddButtonVisible && (
					<button
						onClick={handleAddProductClick}
						className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-6 flex items-center"
					>
						<Plus className="mr-2 h-4 w-4" />
						Add Product
					</button>
				)}

				{isFormVisible && (
					<div className="relative mb-8">
						<div className="absolute -inset-0.5 bg-gradient-to-r from-rose-600 to-blue-600 rounded-xl blur opacity-75 transition duration-1000 animate-gradient-xy"></div>
						<form
							onSubmit={addProduct}
							className="relative bg-zinc-900 p-6 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-zinc-800"
						>
							<h3 className="text-xl font-bold text-white mb-6 flex items-center">
								<div className="w-1 h-6 bg-rose-600 mr-2"></div>
								Add New Vehicle
							</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								<div>
									<label className="block text-zinc-400 mb-2 text-sm">
										Name
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Gauge className="h-5 w-5 text-zinc-500" />
										</div>
										<input
											type="text"
											value={newProduct.name}
											onChange={(e) =>
												setNewProduct({ ...newProduct, name: e.target.value })
											}
											required
											className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
											placeholder="Enter vehicle name"
										/>
									</div>
								</div>

								<div>
									<label className="block text-zinc-400 mb-2 text-sm">
										SKU
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Tag className="h-5 w-5 text-zinc-500" />
										</div>
										<input
											type="text"
											value={newProduct.sku}
											onChange={(e) =>
												setNewProduct({ ...newProduct, sku: e.target.value })
											}
											required
											className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
											placeholder="Enter SKU"
										/>
									</div>
								</div>

								<div>
									<label className="block text-zinc-400 mb-2 text-sm">
										Price
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<DollarSign className="h-5 w-5 text-zinc-500" />
										</div>
										<input
											type="number"
											step="0.01"
											min="0"
											value={newProduct.price}
											onChange={(e) =>
												setNewProduct({ ...newProduct, price: e.target.value })
											}
											required
											className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
											placeholder="Enter price"
										/>
									</div>
								</div>

								<div>
									<label className="block text-zinc-400 mb-2 text-sm">
										Stock Quantity
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Package className="h-5 w-5 text-zinc-500" />
										</div>
										<input
											type="number"
											min="0"
											value={newProduct.stock_quantity}
											onChange={(e) =>
												setNewProduct({
													...newProduct,
													stock_quantity: Number(e.target.value),
												})
											}
											required
											className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
											placeholder="Enter stock quantity"
										/>
									</div>
								</div>

								<div>
									<label className="block text-zinc-400 mb-2 text-sm">
										Category
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Layers className="h-5 w-5 text-zinc-500" />
										</div>
										<select
											value={newProduct.category}
											onChange={(e) =>
												setNewProduct({
													...newProduct,
													category: Number.parseInt(e.target.value),
												})
											}
											className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors appearance-none"
										>
											<option value={1}>Default Category</option>
										</select>
									</div>
								</div>

								<div>
									<label className="block text-zinc-400 mb-2 text-sm">
										Availability
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Package className="h-5 w-5 text-zinc-500" />
										</div>
										<select
											value={newProduct.availability}
											onChange={(e) =>
												setNewProduct({
													...newProduct,
													availability: e.target.value as
														| "in_stock"
														| "out_of_stock",
												})
											}
											className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors appearance-none"
										>
											<option value="in_stock">In Stock</option>
											<option value="out_of_stock">Out of Stock</option>
										</select>
									</div>
								</div>
							</div>

							<div className="mt-5">
								<label className="block text-zinc-400 mb-2 text-sm">
									Description
								</label>
								<div className="relative">
									<div className="absolute top-3 left-3 flex items-start pointer-events-none">
										<FileText className="h-5 w-5 text-zinc-500" />
									</div>
									<textarea
										value={newProduct.description}
										onChange={(e) =>
											setNewProduct({
												...newProduct,
												description: e.target.value,
											})
										}
										className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
										rows={3}
										placeholder="Enter vehicle description"
									/>
								</div>
							</div>

							<div className="mt-5">
								<label className="block text-zinc-400 mb-2 text-sm">
									Image URL
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<ImageIcon className="h-5 w-5 text-zinc-500" />
									</div>
									<input
										type="url"
										value={newProduct.images}
										onChange={(e) =>
											setNewProduct({ ...newProduct, images: e.target.value })
										}
										required
										className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
										placeholder="Enter image URL"
									/>
								</div>
							</div>

							<div className="mt-6 flex justify-end">
								<button
									type="button"
									onClick={handleCancel}
									className="bg-zinc-800 border border-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors mr-3 flex items-center"
								>
									<X className="mr-1 h-4 w-4" />
									Cancel
								</button>
								<button
									type="submit"
									className={`${
										addProductMutation.isPending
											? "bg-rose-800 cursor-not-allowed"
											: "bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600"
									} text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-rose-600/20 flex items-center`}
									disabled={addProductMutation.isPending}
								>
									<Plus className="mr-1 h-4 w-4" />
									{addProductMutation.isPending ? "Adding..." : "Add Product"}
								</button>
							</div>
						</form>
					</div>
				)}

				{isLoading ? (
					<div className="w-full p-8 text-center">
						<div className="inline-block w-12 h-12 border-4 border-zinc-700 border-t-rose-600 rounded-full animate-spin"></div>
						<p className="mt-4 text-zinc-400">Loading vehicles...</p>
					</div>
				) : isError ? (
					<div className="w-full p-6 bg-zinc-900 border border-rose-900/50 rounded-lg shadow-lg">
						<div className="flex items-start">
							<AlertCircle className="text-rose-500 mr-3 flex-shrink-0" />
							<div>
								<h3 className="text-rose-500 font-semibold mb-1">
									Failed to load vehicles
								</h3>
								<p className="text-zinc-400">
									{queryError?.message || "Unknown error"}
								</p>
							</div>
						</div>
					</div>
				) : products.length > 0 ? (
					<>
						<div
							className="flex overflow-hidden"
							onTouchStart={handleTouchStart}
							onTouchEnd={handleTouchEnd}
						>
							{getVisibleProducts().map((product) => (
								<div
									key={product.id}
									className="w-1/3 p-4 transition-all duration-500 ease-in-out"
								>
									<div className="bg-zinc-900 rounded-lg border border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden h-full flex flex-col hover-lift">
										<div className="relative overflow-hidden bg-zinc-900">
											<img
												src={
													product.images ||
													"/placeholder.svg?height=200&width=300"
												}
												alt={product.name}
												className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
										</div>
										<div className="p-5 flex-grow bg-zinc-900">
											<h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-white mb-3">
												{product.name}
											</h3>

											<div className="space-y-2 mb-4">
												<div className="flex justify-between pb-2 border-b border-zinc-800">
													<span className="text-zinc-500">Price</span>
													<span className="font-medium text-rose-500">
														{formatPrice(product.price)}
													</span>
												</div>
												<div className="flex justify-between pb-2 border-b border-zinc-800">
													<span className="text-zinc-500">Stock</span>
													<span className="font-medium text-white">
														{product.stock_quantity}
													</span>
												</div>
												<div className="flex justify-between pb-2 border-b border-zinc-800">
													<span className="text-zinc-500">Status</span>
													<span
														className={`font-medium ${product.availability === "in_stock" ? "text-emerald-500" : "text-rose-500"}`}
													>
														{product.availability === "in_stock"
															? "In Stock"
															: "Out of Stock"}
													</span>
												</div>
											</div>

											<div className="mt-auto">
												<Link
													to="/cars/productDetail"
													className="w-full inline-block text-center bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-rose-600/20"
												>
													View Details
												</Link>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="flex justify-center mt-8">
							<button
								onClick={() => rotateProducts("prev")}
								className="bg-zinc-800 border border-zinc-700 text-white p-3 rounded-full mr-4 hover:bg-zinc-700 transition-colors shadow-lg"
								aria-label="Previous"
							>
								<ChevronLeft className="h-5 w-5" />
							</button>
							<button
								onClick={() => rotateProducts("next")}
								className="bg-zinc-800 border border-zinc-700 text-white p-3 rounded-full hover:bg-zinc-700 transition-colors shadow-lg"
								aria-label="Next"
							>
								<ChevronRight className="h-5 w-5" />
							</button>
						</div>
					</>
				) : (
					<div className="text-center py-12 bg-zinc-900 rounded-lg border border-zinc-800 shadow-lg">
						<div className="w-16 h-16 mx-auto mb-4 opacity-20">
							<Gauge className="w-full h-full text-rose-500" />
						</div>
						<p className="text-zinc-400">No vehicles available at this time.</p>
						<p className="text-zinc-500 text-sm mt-2">
							Check back later for our exclusive collection.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export const Route = createFileRoute("/cars/classicCars")({
	component: ClassicCars,
});
