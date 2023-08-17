import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductContext from '../../Context/Products/ProductContext';

const Dashboard = () => {
  const context = useContext(ProductContext);
  const { getProducts } = context;

  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      // navigate("/admindashboard");
      getProducts();
    }
    else {
      navigate("/adminlogin");
    }

    // eslint-disable-next-line
  }, [])

  return (
    <>
      <h1>This is Dashboard.</h1>
    </>
  )
}

export default Dashboard;