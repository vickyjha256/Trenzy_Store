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

                {/* <div className=''>
                    <h3>Price Details</h3>

                    <div className='row'>
                        <div className='col-xxl-6 col-6 d-flex justify-content-start'>
                            <p>Price &#40;{total_Items} item&#41;</p>
                        </div>
                        <div className='col-xxl-6 col-6 d-flex justify-content-end'>
                            <p>₹{total_orderedItems_price.toLocaleString('en-IN')}</p>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-xxl-6 col-6 d-flex justify-content-start'>
                            <p>Discount</p>
                        </div>
                        <div className='col-xxl-6 col-6 d-flex justify-content-end'>
                            <p>-₹{discount.toFixed().toLocaleString('en-IN')} </p>
                        </div>
                    </div>

                    <hr id='line' />

                    <div className='row'>
                        <div className='col-xxl-6 col-6 d-flex justify-content-start'>
                            <b>Total Amount</b>
                        </div>
                        <div className='col-xxl-6 col-6 d-flex justify-content-end'>
                            <b>₹{(total_orderedItems_price - discount).toFixed().toLocaleString('en-IN')} </b>
                        </div>
                    </div>

                    <hr id='line' />

                    <div className="alert alert-success" role="alert">
                        <h6 style={{ color: "green" }} role='alert' className='alert-success'>You will save ₹{discount.toFixed().toLocaleString('en-IN')} on this order </h6>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default Orders