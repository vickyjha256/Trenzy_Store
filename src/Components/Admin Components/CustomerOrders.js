import React, { useContext, useEffect } from 'react'
import ProductContext from '../../Context/Products/ProductContext';
import { useNavigate } from 'react-router-dom';
import CustomerOrderedItems from './CustomerOrderedItems';

const CustomerOrders = (props) => {
  const context = useContext(ProductContext);
  const { orders, custOrders } = context;

  const { showAlert } = props;

  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      // navigate("/admindashboard");
      navigate("/ordermanagement");
      custOrders();
    } else {
      props.showAlert("Please login to see your Customer Orders !!", "danger");
      navigate("/adminlogin");
    }
  }, []);

  let total_orderedItems_price = 0;
  let total_Items = 0;
  let discount = 0;
  return (
    <>
      <div style={{ backgroundColor: "whitesmoke" }} className='container'>
        {/* <h1>Hello, from OrderBot.</h1> */}
        {orders.map(
          (product) => {
            total_Items = total_Items + 1;
            total_orderedItems_price = total_orderedItems_price + product.price * product.quantity;
            discount = discount + ((product.price * product.quantity) / 10);
            return <CustomerOrderedItems key={product._id} delivDetail={product} showAlert={showAlert} />
          }
        )}
      </div>    </>
  )
}

export default CustomerOrders;