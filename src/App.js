import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/User Components/Navbar';
import Home from './Components/User Components/Home';
import MenShoes from './Components/User Components/MenShoes';
import WomenShoes from './Components/User Components/WomenShoes';
import Message from './Components/User Components/Message';
import UserSignup from './Components/User Components/UserSignup';
import UserLogin from './Components/User Components/UserLogin';
import CartState from './Context/Products/ProductState';
import Carts from './Components/User Components/Carts';
import AdminSignup from './Components/Admin Components/AdminSignup';
import AdminLogin from './Components/Admin Components/AdminLogin';
import AdminProducts from './Components/Admin Components/AdminProducts';
import Alert from './Components/Admin Components/Alert';
import AddProducts from './Components/Admin Components/AddProducts';
import AdminNavbar from './Components/Admin Components/AdminNavbar';
import Orders from './Components/User Components/Orders';
import CustomerOrders from './Components/Admin Components/CustomerOrders';
import Dashboard from './Components/Admin Components/Dashboard';
import Search from './Components/User Components/Search';
import ForgotPassword from './Components/User Components/ForgotPassword';

function App() {
  // const context = useContext(ProductContext);
  // const { showAlert } = context;

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
      <CartState>
        <Router>
          {sessionStorage.getItem("token") ? <> <AdminNavbar showAlert={showAlert} /> </> : <> <Navbar showAlert={showAlert} /> </>}
          <Alert alert={alert} />
          {/* <div className=''> */}
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/men" element={<MenShoes showAlert={showAlert} shoetype="men" />} />
            <Route exact path="/women" element={<WomenShoes showAlert={showAlert} shoetype="women" />} />
            <Route exact path="/casualmen" element={<MenShoes showAlert={showAlert} shoetype="casualmen" />} />
            <Route exact path="/formalmen" element={<MenShoes showAlert={showAlert} shoetype="formalmen" />} />
            <Route exact path="/ethnicmen" element={<MenShoes showAlert={showAlert} shoetype="ethnicmen" />} />
            <Route exact path="/casualwomen" element={<WomenShoes showAlert={showAlert} shoetype="casualwomen" />} />
            <Route exact path="/formalwomen" element={<WomenShoes showAlert={showAlert} shoetype="formalwomen" />} />
            <Route exact path="/ethnicwomen" element={<WomenShoes showAlert={showAlert} shoetype="ethnicwomen" />} />


            <Route exact path="/search" element={<Search showAlert={showAlert} />} />
            <Route exact path="/forgotpassword" element={<ForgotPassword showAlert={showAlert} />} />
            

            <Route exact path="/message" element={<Message />} />
            <Route exact path="/register" element={<UserSignup showAlert={showAlert} />} />
            <Route exact path="/login" element={<UserLogin showAlert={showAlert} />} />
            <Route exact path="/carts" element={<Carts showAlert={showAlert} />} />
            <Route exact path="/orders" element={<Orders showAlert={showAlert} />} />

            
            <Route exact path="/createadmin" element={<AdminSignup showAlert={showAlert} />} />
            <Route exact path="/adminlogin" element={<AdminLogin showAlert={showAlert} />} />
            <Route exact path="/admindashboard" element={<Dashboard showAlert={showAlert} />} />
            <Route exact path="/adminProducts" element={<AdminProducts showAlert={showAlert} />} />
            <Route exact path="/ordermanagement" element={<CustomerOrders showAlert={showAlert} />} />
            <Route exact path="/addproducts" element={<AddProducts showAlert={showAlert} />} />
          </Routes>
          {/* </div> */}
        </Router>
      </CartState>
    </>
  );
}

export default App;