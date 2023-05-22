import { useContext, useState } from 'react';
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
import ProductContext from './Context/Products/ProductContext';

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
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          {/* <div className=''> */}
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/men" element={<MenShoes shoetype="men" />} />
            <Route exact path="/women" element={<WomenShoes shoetype="women" />} />
            <Route exact path="/casualmen" element={<MenShoes shoetype="CasualMen" />} />
            <Route exact path="/formalmen" element={<MenShoes shoetype="FormalMen" />} />
            <Route exact path="/ethnicmen" element={<MenShoes shoetype="EthnicMen" />} />
            <Route exact path="/casualwomen" element={<WomenShoes shoetype="CasualWomen" />} />
            <Route exact path="/formalwomen" element={<WomenShoes shoetype="FormalWomen" />} />
            <Route exact path="/ethnicwomen" element={<WomenShoes shoetype="EthnicWomen" />} />
            <Route exact path="/message" element={<Message />} />
            <Route exact path="/register" element={<UserSignup showAlert={showAlert} />} />
            <Route exact path="/login" element={<UserLogin showAlert={showAlert} />} />
            <Route exact path="/carts" element={<Carts showAlert={showAlert} />} />
            <Route exact path="/createadmin" element={<AdminSignup showAlert={showAlert} />} />
            <Route exact path="/adminlogin" element={<AdminLogin showAlert={showAlert} />} />
            <Route exact path="/admindashboard" element={<AdminProducts showAlert={showAlert} />} />
          </Routes>
          {/* </div> */}
        </Router>
      </CartState>
    </>
  );
}

export default App;