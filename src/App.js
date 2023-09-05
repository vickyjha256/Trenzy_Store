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
import LoadingBar from 'react-top-loading-bar';

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

  const [progress, setprogress] = useState(10);
  return (
    <>
      <CartState>
        <Router>
          {sessionStorage.getItem("token") ? <> <AdminNavbar setprogress={setprogress} showAlert={showAlert} /> </> : <> <Navbar setprogress={setprogress} showAlert={showAlert} /> </>}
          <LoadingBar color='#0dcaf0' progress={progress} />
          <Alert alert={alert} />
          {/* <div className=''> */}
          <Routes>
            <Route exact path="/" element={<Home setprogress={setprogress} showAlert={showAlert} />} />
            <Route exact path="/men" element={<MenShoes setprogress={setprogress} showAlert={showAlert} shoetype="men" />} />
            <Route exact path="/women" element={<WomenShoes setprogress={setprogress} showAlert={showAlert} shoetype="women" />} />
            <Route exact path="/casualmen" element={<MenShoes setprogress={setprogress} showAlert={showAlert} shoetype="casualmen" />} />
            <Route exact path="/formalmen" element={<MenShoes setprogress={setprogress} showAlert={showAlert} shoetype="formalmen" />} />
            <Route exact path="/ethnicmen" element={<MenShoes setprogress={setprogress} showAlert={showAlert} shoetype="ethnicmen" />} />
            <Route exact path="/casualwomen" element={<WomenShoes setprogress={setprogress} showAlert={showAlert} shoetype="casualwomen" />} />
            <Route exact path="/formalwomen" element={<WomenShoes setprogress={setprogress} showAlert={showAlert} shoetype="formalwomen" />} />
            <Route exact path="/ethnicwomen" element={<WomenShoes setprogress={setprogress} showAlert={showAlert} shoetype="ethnicwomen" />} />


            <Route exact path="/search" element={<Search setprogress={setprogress} showAlert={showAlert} />} />
            <Route exact path="/forgotpassword" element={<ForgotPassword setprogress={setprogress} showAlert={showAlert} />} />


            <Route exact path="/message" element={<Message setprogress={setprogress} />} />
            <Route exact path="/register" element={<UserSignup setprogress={setprogress} showAlert={showAlert} />} />
            <Route exact path="/login" element={<UserLogin setprogress={setprogress} showAlert={showAlert} />} />
            <Route exact path="/carts" element={<Carts setprogress={setprogress} showAlert={showAlert} />} />
            <Route exact path="/orders" element={<Orders setprogress={setprogress} showAlert={showAlert} />} />


            <Route exact path="/createadmin" element={<AdminSignup setprogress={setprogress} showAlert={showAlert} />} />
            <Route exact path="/adminlogin" element={<AdminLogin setprogress={setprogress} showAlert={showAlert} />} />
            <Route exact path="/admindashboard" element={<Dashboard setprogress={setprogress} showAlert={showAlert} />} />
            <Route exact path="/adminProducts" element={<AdminProducts setprogress={setprogress} showAlert={showAlert} />} />
            <Route exact path="/ordermanagement" element={<CustomerOrders setprogress={setprogress} showAlert={showAlert} />} />
            <Route exact path="/addproducts" element={<AddProducts setprogress={setprogress} showAlert={showAlert} />} />
          </Routes>
          {/* </div> */}
        </Router>
      </CartState>
    </>
  );
}

export default App;