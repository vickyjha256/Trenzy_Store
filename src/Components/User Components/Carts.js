import React, { useContext, useEffect, useState } from 'react'
import CartItems from './CartItems';
import ProductContext from '../../Context/Products/ProductContext';
import { useNavigate } from 'react-router-dom';

const Carts = (props) => {
    const context = useContext(ProductContext);
    const { carts, getCart, getUser, userinfo, idFunc, sizeFunc, setContactFunc, setAddressFunc, addOrder, sweetAlert } = context;

    const { showAlert } = props;

    const [credentials, setCredentials] = useState({ number: `${userinfo.contact === undefined ? sessionStorage.getItem("usertoken") && getUser() && userinfo.contact : userinfo.contact}`, address: `${userinfo.address === undefined ? sessionStorage.getItem("usertoken") && getUser() && userinfo.address : userinfo.address}` });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Place all orders Triggered."); // This is for testing only.

        carts.map(
            (elem) => {
                idFunc(elem.productID);
                sizeFunc(elem.size);
                // console.log("ProductID: " + elem.productID); // This is for testing only.
                // console.log("ProductSize: " + elem.size); // This is for testing only.

                setContactFunc(credentials.number);
                setAddressFunc(credentials.address);
                addOrder();
                return "Ordered";
            }
        )
        sweetAlert();
        // console.log("Contact Number: " + credentials.number + "\nAddress: " + credentials.address); // This is for testing only.
    }

    let total_cartItems_price = 0;
    let total_Items = 0;
    let discount = 0;

    return (
        <>
            {/* Below code is for modal popup. */}
            <div className="modal fade" id="delivinfo2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Order - Delivery related details.</h1>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input style={{ color: "white" }} type="tel" required className="form-control bg-dark" value={credentials.number} onChange={onChange} minLength={10} maxLength={10} id="number" name='number' placeholder="Phone Number" />
                                    <label htmlFor="number">Contact No.</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input style={{ color: "white" }} type="text" required className="form-control bg-dark" value={credentials.address} onChange={onChange} id="address" name='address' placeholder='Address' />
                                    <label htmlFor="address">Address</label>
                                </div>

                                {/* <button style={{ width: "100%", backgroundColor: "blue" }} type="submit" className="btn btn-primary my-1"><b>Submit</b></button> */}

                                <div id='outdiv' className='d-flex justify-content-center'>
                                    {/* <div style={{ width: "30%" }} id='indiv' onMouseOver={(credentials.number === "" || credentials.address === "") ? btmove : ""}> */}
                                    <div style={{ width: "30%" }} id='indiv' >
                                        <button id='submitbtn' style={{ width: "100%", backgroundColor: "lime", color: "black" }} type="submit" className="btn btn-primary my-1" data-bs-dismiss={credentials.number.length === 10 && credentials.address !== "" ? "modal" : ""} data-bs-toggle={credentials.number.length === 10 && credentials.address !== "" ? "modal" : ""} data-bs-target="#exampleModal3"><b>Proceed</b></button>
                                        {/* <button id='submitbtn' style={{ width: "100%", backgroundColor: "blue" }} type="submit" className="btn btn-primary my-1" disabled={credentials.number === "" || credentials.address === ""} data-bs-dismiss={credentials.number.length === 10 && credentials.address !== "" ? "modal" : ""}><b>Submit</b></button> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Successful order confirmation Modal */}
            <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Hurrayyy</h1>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                            <h2>Shoe ordered successfully 😎 </h2>
                        </div>
                        <div className="modal-footer">
                            <button style={{ width: "100%" }} type="button" className="btn btn-info" data-bs-dismiss="modal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>


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
                        <button style={{ width: "30%", fontSize: "small", fontWeight: "bold" }} type="button" id='ordbtn' onClick={sessionStorage.getItem('usertoken') ? () => {
                            getUser();
                            credentials.number = userinfo.contact;
                            credentials.address = userinfo.address;
                            document.getElementById('hidbtn2').click();
                            // } : () => { navigate("/login"); props.showAlert("Please login first to proceed an order.", "info"); console.log("User not login."); }} data-bs-toggle={sessionStorage.getItem("usertoken") ? "modal" : ""} data-bs-target={sessionStorage.getItem("usertoken") ? "#delivinfo" : ""} className="btn btn-warning">Buy now</button>
                        } : () => { navigate("/login"); props.showAlert("Please login first to proceed an order.", "info"); console.log("User not login."); }} className="btn btn-warning">Place Orders</button>

                        {/* Used extra hidden button for fetching contact and address of user on click. */}
                        <button hidden id='hidbtn2' onClick={sessionStorage.getItem('usertoken') ? () => {
                            getUser();
                            credentials.number = userinfo.contact;
                            credentials.address = userinfo.address;
                        } : () => { navigate("/login"); props.showAlert("Please login first to proceed an order.", "info"); console.log("User not login."); }} data-bs-toggle={sessionStorage.getItem("usertoken") ? "modal" : ""} data-bs-target={sessionStorage.getItem("usertoken") ? "#delivinfo2" : ""} className="btn btn-warning"></button>
                    </div>


                </div> : <div className="alert alert-warning row" role="alert">
                    <h6 style={{}} role='alert' className='alert-warning'>Cart is empty, Please add some items to cart. </h6>
                </div>}
            </section>
        </>
    )
}

export default Carts;