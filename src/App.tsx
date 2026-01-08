import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { auth, db } from "./firebase/firebase.config";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { signOut } from "firebase/auth";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Orders from "./pages/Orders";



const LogoutButton = () => (
  <button onClick={() => signOut(auth)}>Logout</button>
);

console.log("Auth Loaded:", auth);
console.log("DB Loaded:", db);

const App = () => {
  return (
    <>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/cart" style={{ marginRight: "10px" }}>Cart</Link>
        <Link to="/signup" style={{ marginRight: "10px" }}>Signup</Link>
        <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
        <Link to="/profile" style={{ marginRight: "10px" }}>Profile</Link>
        <Link to="/add-product">Add Product</Link>
        <Link to="/orders" style={{ marginRight: "10px" }}>Orders</Link>
        <LogoutButton />
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/orders" element={<Orders />} />

      </Routes>
    </>
  );
};

export default App;
