/* REACT BOOTSTRAP */
import { Container } from "react-bootstrap";

/* COMPONENTS */
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import HomeScreen from "./screens/homeScreen";
import ProductScreen from "./screens/productScreen";
import CartScreen from "./screens/cartScreen";
import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/registerScreen";
import ProfileScreen from "./screens/profileScreen";
import ShippingScreen from "./screens/shippingScreen";
import PaymentScreen from "./screens/paymentScreen";
import PlaceOrderScreen from "./screens/placeOrderScreen";
import OrderScreen from "./screens/orderScreen";
import SearchResultsScreen from "./screens/searchResultsScreen";
// import UserListScreen from "./screens/UserListScreen";
// import UserEditScreen from "./screens/UserEditScreen";
// import ProductListScreen from "./screens/ProductListScreen";
// import ProductEditScreen from "./screens/ProductEditScreen";
// import OrderListScreen from "./screens/OrderListScreen";

// REACT ROUTER 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Star from "./components/Star.js";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <div style={{ position: "sticky", top: 0, zIndex: "100" }}>
        <Header />
      </div>
      <Container>
        <main className="py-3">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/search" element={<SearchResultsScreen />} />
            <Route path="/orderDetail" element={<OrderScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/star" element={<Star />} />

            {/* <Route path="/admin/userlist" element={<UserListScreen />} /> */}
            {/* <Route path="/admin/user/:id/edit" element={<UserEditScreen />} /> */}
            {/* <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} /> */}
            {/* <Route path="/admin/productlist" element={<ProductListScreen />} /> */}
            {/* <Route path="/admin/orderlist" element={<OrderListScreen />} /> */}
          </Routes>
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
