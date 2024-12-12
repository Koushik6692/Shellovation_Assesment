import { BrowserRouter, Routes, Route } from "react-router-dom";

// User pages
import HomePage from "./pages/user/homepage";
import About from "./pages/user/about";
import Contact from "./pages/user/contact";
import Login from "./pages/user/login";
import Signup from "./pages/user/signup";
import ShoppingCartPage from "./pages/user/cart";
import Shop from "./pages/user/shop";
import OccasionsPage from "./pages/user/occasionspage";
import ProductDetail from "./pages/user/productdetails";
import Checkout from "./pages/user/checkout";
import Admin from "./pages/user/admin";
import NotFoundPage from "./pages/user/notfound";

// Admin pages
import Product from "./pages/admin/product";
import Complaints from "./pages/admin/complaints";
import Orders from "./pages/admin/order";
import Customers from "./pages/admin/customer";
import CalendarPage from "./pages/admin/calendar";

// Context
import { AuthProvider } from "./context/AuthContext";

// Import Navbar and Footer
import Navbar from "./components/user/navbar/navbar";
import Footer from "./components/user/footer/footer";

function App() {
  return (
    // Wrap the entire app in AuthProvider for authentication context
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/occasions" element={<OccasionsPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/:productId" element={<ProductDetail />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/products" element={<Product />} />
          <Route path="/admin/complaints" element={<Complaints />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/calendar" element={<CalendarPage />} />

          {/* Catch-all Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
