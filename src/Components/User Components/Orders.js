import React, { useContext, useEffect } from 'react'
import OrderedItems from './OrderedItems';
import ProductContext from '../../Context/Products/ProductContext';
import { useNavigate } from 'react-router-dom';

const Orders = (props) => {
    const context = useContext(ProductContext);
    const { orders, getOrder } = context;

    const { showAlert } = props;

    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("usertoken")) {
            // navigate("/admindashboard");
            navigate("/orders");
            getOrder();
        } else {
            props.showAlert("Please login to see your ordered items !!", "danger");
            navigate("/login");
        }
    }, []);

    let total_orderedItems_price = 0;
    let total_Items = 0;
    let discount = 0;
    return (
        <>
            <div style={{ backgroundColor: "whitesmoke" }} className='container'>
                <h1>Hello, from OrderBot.</h1>
                {orders.map(
                    (product) => {
                        total_Items = total_Items + 1;
                        total_orderedItems_price = total_orderedItems_price + product.price * product.quantity;
                        discount = discount + ((product.price * product.quantity) / 10);
                        return <OrderedItems key={product._id} item={product} showAlert={showAlert} />
                    }
                )}
            </div>
        </>
    )
}

export default Orders