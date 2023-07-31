import React, { useContext, useEffect } from 'react'
import CartItems from './CartItems';
import ProductContext from '../../Context/Products/ProductContext';
import { useNavigate } from 'react-router-dom';

const Carts = (props) => {
    const context = useContext(ProductContext);
    const { carts, getCart, getUser } = context;

    const { showAlert } = props;

    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("usertoken")) {
            // navigate("/admindashboard");
            navigate("/carts");
            getCart();
        } else {
            props.showAlert("Please login to see your cart items !!", "danger");
            navigate("/login");
        }
    }, []);

    let total_cartItems_price = 0;
    let total_Items = 0;
    let discount = 0;

    return (
        <>
            <section style={{ backgroundColor: "whitesmoke" }} className='container'>
                <h1>Hello, from CartBot.</h1>
                {carts.map(
                    (product) => {
                        total_Items = total_Items + 1;
                        total_cartItems_price = total_cartItems_price + product.price * product.quantity;
                        discount = discount + ((product.price * product.quantity) / 10);
                        return <CartItems key={product._id} item={product} showAlert={showAlert} />
                    }
                )}

                {total_Items !== 0 ? <div className=''>
                    <h3>Price Details</h3>

                    <div className='row'>
                        <div className='col-xxl-6 col-6 d-flex justify-content-start'>
                            <p>Price &#40;{total_Items} item&#41;</p>
                        </div>
                        <div className='col-xxl-6 col-6 d-flex justify-content-end'>
                            <p>₹{total_cartItems_price.toLocaleString('en-IN')}</p>
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
                            <b>₹{(total_cartItems_price - discount).toFixed().toLocaleString('en-IN')} </b>
                        </div>
                    </div>

                    <hr id='line' />

                    <div className="alert alert-success row" role="alert">
                        <h6 style={{ color: "green", width: "70%" }} role='alert' className='alert-success'>You will save ₹{discount.toFixed().toLocaleString('en-IN')} on this order </h6>
                        <button style={{ width: "30%", fontSize: "small", fontWeight: "bold" }} type="button" className="btn btn-warning">Place Orders</button>
                    </div>
                </div> : <div className="alert alert-warning row" role="alert">
                    <h6 style={{}} role='alert' className='alert-warning'>Cart is empty, Please add some items to cart. </h6>
                </div>}
            </section>
        </>
    )
}

export default Carts;