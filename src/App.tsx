import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";      // adjust path if needed
import Cart from "./components/Cart";

const App = () => {
  return (
    <>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "10px" }}>
          Home
        </Link>
        <Link to="/cart">
          Cart
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
