import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/sidebar";
import { Pencil, Save, Search, ArrowUpDown } from "lucide-react";
import { Helmet } from "react-helmet";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({
    inStockValue: "",
    soldStockValue: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://ecommercebackend-8gx8.onrender.com/get-product"
      );
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.productId);
    setEditValues({
      inStockValue: product.inStockValue || 0,
      soldStockValue: product.soldStockValue || 0,
    });
  };

  const handleSave = async (productId) => {
    try {
      const response = await fetch(
        "https://ecommercebackend-8gx8.onrender.com/instock-update",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId,
            inStockValue: editValues.inStockValue || 0,
            soldStockValue: editValues.soldStockValue || 0,
          }),
        }
      );

      if (response.ok) {
        setEditingId(null);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error updating stock values:", error);
    }
  };

  const handleVisibilityChange = async (productId, newVisibility) => {
    try {
      const response = await fetch(
        "https://ecommercebackend-8gx8.onrender.com/update-visibility",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId,
            visibility: newVisibility === "true",
          }),
        }
      );

      if (response.ok) {
        setProducts(
          products.map((product) =>
            product.productId === productId
              ? { ...product, visibility: newVisibility === "true" }
              : product
          )
        );
      }
    } catch (error) {
      console.error("Error updating visibility:", error);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = React.useMemo(() => {
    if (!Array.isArray(products)) return [];

    let sortableProducts = [...products];
    if (sortConfig.key !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.productId
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Helmet>
        <title>Products | Admin | Mera Bestie</title>
      </Helmet>
      <Sidebar />
      <div className="flex-1 p-8 ml-[5rem] lg:ml-64 bg-pink-50 min-h-screen">
        <div className="mb-6 flex justify-between items-center">
          <div className="relative w-full md:w-64">
            <button
              className="md:hidden absolute left-2 z-10"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            >
              <Search size={20} />
            </button>
            <input
              type="text"
              placeholder="Search by product ID or name..."
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300 ${
                isSearchExpanded ? "opacity-100" : "opacity-0"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-pink-100">
              <tr>
                {[
                  "Product",
                  "Category",
                  "Price",
                  "Rating",
                  "In Stock",
                  "Sold",
                  "Visibility",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer"
                    onClick={() =>
                      handleSort(header.toLowerCase().replace(" ", ""))
                    }
                  >
                    <div className="flex items-center">
                      {header}
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.productId} className="hover:bg-gray-100">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={product.img || "-"}
                        alt=""
                      />
                      <div className="ml-4 text-sm font-medium text-gray-900">
                        {product.name || "-"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.category || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.price || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.rating || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {editingId === product.productId ? (
                      <input
                        type="number"
                        className="w-20 border rounded px-2 py-1"
                        value={editValues.inStockValue}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            inStockValue: e.target.value,
                          })
                        }
                      />
                    ) : (
                      product.inStockValue || "-"
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {editingId === product.productId ? (
                      <input
                        type="number"
                        className="w-20 border rounded px-2 py-1"
                        value={editValues.soldStockValue}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            soldStockValue: e.target.value,
                          })
                        }
                      />
                    ) : (
                      product.soldStockValue || "-"
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <select
                      className="border rounded px-2 py-1"
                      value={product.visibility?.toString() || "false"}
                      onChange={(e) =>
                        handleVisibilityChange(
                          product.productId,
                          e.target.value
                        )
                      }
                    >
                      <option value="true">Visible</option>
                      <option value="false">Hidden</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {editingId === product.productId ? (
                      <button
                        onClick={() => handleSave(product.productId)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Save size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Pencil size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Product;
