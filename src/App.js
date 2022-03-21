import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import Cart from './components/Cart';
import Account from './components/Account';
import Checkout from './components/Checkout';
import Home from './components/Home/Home';
import HomeAdmin from './Admin/components/Home';
import Login from './Admin/components/Login';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<Admin />}>
          <Route path="login" element={<Login />} />
          <Route path="" element={<HomeAdmin />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart/>} />
          <Route path="checkout" element={<Checkout/>} />
          <Route path="account" element={<Account/>} />
          <Route path="header" element={<Header/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
