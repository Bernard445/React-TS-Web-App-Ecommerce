import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { auth, db } from "./firebase/firebase.config";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Layout from "./components/Layout";
import { signOut } from "firebase/auth";

const LogoutButton = () => (
  <button 
    onClick={() => signOut(auth)}
    className="ml-2 text-red-500 hover:text-red-600"
  >
    Logout
  </button>
);

const App = () => {
  return (
    <Layout>
      <nav className="flex gap-4 p-4 border-b mb-4">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/add-product">Add Product</Link>
        <Link to="/orders">Orders</Link>
        <LogoutButton />
      </nav>

      {/* ⭐ Routes MUST be wrapped here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Routes>
    </Layout>
  );
};

export default App;
