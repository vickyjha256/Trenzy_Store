import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductContext from '../../Context/Products/ProductContext';

const Dashboard = (props) => {
  const context = useContext(ProductContext);
  const { getProducts } = context;

  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      // navigate("/admindashboard");
      getProducts();

      props.setprogress(30);
      props.setprogress(60);
      props.setprogress(80);
      props.setprogress(100);
    }
    else {
      navigate("/adminlogin");

      props.setprogress(30);
      props.setprogress(60);
      props.setprogress(80);
      props.setprogress(100);
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