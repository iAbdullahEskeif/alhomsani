import { useState, useRef, useEffect, useCallback } from "react";
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

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

function ElectricalCars() {
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
  const fetchProducts = async (): Promise<Product[]> => {
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

  const rotateProducts = useCallback(
    (direction: "next" | "prev") => {
      if (products.length === 0) return;

      setCurrentIndex((prevIndex) => {
        if (direction === "next") {
          return (prevIndex + 1) % products.length;
        } else {
          return (prevIndex - 1 + products.length) % products.length;
        }
      });
    },
    [products.length],
  );

  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        rotateProducts("next");
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [rotateProducts, products.length]);

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
    <div className="min-h-screen bg-zinc-950">
      <div className="w-full max-w-6xl mx-auto p-4">
        <h2 className="text-3xl font-medium text-white mb-6">
          Electrical Cars
        </h2>

        {error && (
          <div className="mb-6 p-3 bg-zinc-800 border border-zinc-700 rounded-lg flex items-start">
            <AlertCircle
              className="text-zinc-400 mr-2 flex-shrink-0 mt-0.5"
              size={18}
            />
            <p className="text-zinc-300 text-sm">{error}</p>
          </div>
        )}

        {isAdmin() && isAddButtonVisible && (
          <Button
            onClick={handleAddProductClick}
            variant="secondary"
            className="mb-6 bg-zinc-800 text-zinc-200 border-zinc-700 hover:bg-zinc-700"
          >
            <Plus className="mr-2 size-4" />
            Add Product
          </Button>
        )}

        {isFormVisible && (
          <Card className="mb-8 bg-zinc-900 border-zinc-800 shadow-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium text-white mb-6">
                Add New Vehicle
              </h3>

              <form onSubmit={addProduct} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name" className="text-zinc-400">
                      Name
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Gauge className="size-5 text-zinc-500" />
                      </div>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        required
                        className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                        placeholder="Enter vehicle name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="sku" className="text-zinc-400">
                      SKU
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag className="size-5 text-zinc-500" />
                      </div>
                      <Input
                        id="sku"
                        value={newProduct.sku}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, sku: e.target.value })
                        }
                        required
                        className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                        placeholder="Enter SKU"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="price" className="text-zinc-400">
                      Price
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="size-5 text-zinc-500" />
                      </div>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                          })
                        }
                        required
                        className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                        placeholder="Enter price"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="stock" className="text-zinc-400">
                      Stock Quantity
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Package className="size-5 text-zinc-500" />
                      </div>
                      <Input
                        id="stock"
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
                        className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                        placeholder="Enter stock quantity"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-zinc-400">
                      Category
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Layers className="size-5 text-zinc-500" />
                      </div>
                      <Select
                        value={newProduct.category.toString()}
                        onValueChange={(value) =>
                          setNewProduct({
                            ...newProduct,
                            category: Number.parseInt(value),
                          })
                        }
                      >
                        <SelectTrigger className="pl-10 bg-zinc-800 border-zinc-700 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectItem value="1">Default Category</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="availability" className="text-zinc-400">
                      Availability
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Package className="size-5 text-zinc-500" />
                      </div>
                      <Select
                        value={newProduct.availability}
                        onValueChange={(value) =>
                          setNewProduct({
                            ...newProduct,
                            availability: value as "in_stock" | "out_of_stock",
                          })
                        }
                      >
                        <SelectTrigger className="pl-10 bg-zinc-800 border-zinc-700 text-white">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                          <SelectItem value="in_stock">In Stock</SelectItem>
                          <SelectItem value="out_of_stock">
                            Out of Stock
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-zinc-400">
                    Description
                  </Label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <FileText className="size-5 text-zinc-500" />
                    </div>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      className="pl-10 bg-zinc-800 border-zinc-700 text-white min-h-[120px]"
                      placeholder="Enter vehicle description"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="image" className="text-zinc-400">
                    Image URL
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ImageIcon className="size-5 text-zinc-500" />
                    </div>
                    <Input
                      id="image"
                      type="url"
                      value={newProduct.images}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, images: e.target.value })
                      }
                      required
                      className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                      placeholder="Enter image URL"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="border-zinc-700 text-rose-600 hover:bg-zinc-800 hover:text-white"
                  >
                    <X className="mr-1 size-4" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={addProductMutation.isPending}
                    className="bg-zinc-800 text-zinc-200 border-zinc-700 hover:bg-zinc-700"
                  >
                    <Plus className="mr-1 size-4" />
                    {addProductMutation.isPending ? "Adding..." : "Add Product"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="w-full p-8 text-center">
            <div className="inline-block w-12 h-12 border-4 border-zinc-700 border-t-zinc-400 rounded-full animate-spin"></div>
            <p className="mt-4 text-zinc-400">Loading vehicles...</p>
          </div>
        ) : isError ? (
          <Card className="bg-zinc-900 border-zinc-800 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start">
                <AlertCircle className="text-zinc-400 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-zinc-300 font-medium mb-1">
                    Failed to load vehicles
                  </h3>
                  <p className="text-zinc-400">
                    {queryError?.message || "Unknown error"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
                  <Card className="bg-zinc-900 border-zinc-800 shadow-md overflow-hidden h-full flex flex-col hover:border-zinc-700 transition-all duration-300">
                    <div className="relative overflow-hidden bg-zinc-900">
                      <img
                        src={
                          product.images ||
                          "/placeholder.svg?height=200&width=300" ||
                          "/placeholder.svg"
                        }
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
                    </div>
                    <CardContent className="p-5 flex-grow bg-zinc-900">
                      <h3 className="text-xl font-medium text-white mb-3">
                        {product.name}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between pb-2 border-b border-zinc-800">
                          <span className="text-zinc-500">Price</span>
                          <span className="font-medium text-white">
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
                            className={`font-medium ${product.availability === "in_stock" ? "text-emerald-500" : "text-zinc-400"}`}
                          >
                            {product.availability === "in_stock"
                              ? "In Stock"
                              : "Out of Stock"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <Button
                          asChild
                          variant="secondary"
                          className="w-full bg-zinc-800 text-zinc-200 border-zinc-700 hover:bg-zinc-700"
                        >
                          <Link to="/cars/productDetail">View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button
                onClick={() => rotateProducts("prev")}
                variant="outline"
                size="icon"
                className="rounded-full mr-4 border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
                aria-label="Previous"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                onClick={() => rotateProducts("next")}
                variant="outline"
                size="icon"
                className="rounded-full border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
                aria-label="Next"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </>
        ) : (
          <Card className="bg-zinc-900 border-zinc-800 shadow-md text-center py-12">
            <CardContent>
              <div className="w-16 h-16 mx-auto mb-4 opacity-20">
                <Gauge className="w-full h-full text-zinc-500" />
              </div>
              <p className="text-zinc-400">
                No vehicles available at this time.
              </p>
              <p className="text-zinc-500 text-sm mt-2">
                Check back later for our exclusive collection.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/cars/electricalCars")({
  component: ElectricalCars,
});
