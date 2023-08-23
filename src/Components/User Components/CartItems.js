import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../../Context/Products/ProductContext';
import { useNavigate } from 'react-router-dom';
const CartItems = (props) => {
    const { item } = props;
    const context = useContext(ProductContext);
    const { editCart, deleteCart, setid, setshoesize, userinfo, getUser, addOrder, setAddressFunc, setContactFunc, sweetAlert, quant, setquant } = context;


    const [credentials, setCredentials] = useState({ number: `${userinfo.contact === undefined ? sessionStorage.getItem("usertoken") && getUser() && userinfo.contact : userinfo.contact}`, address: `${userinfo.address === undefined ? sessionStorage.getItem("usertoken") && getUser() && userinfo.address : userinfo.address}` });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        // e.preventDefault();
        // console.log("Cart Stated Quantity: " + cart.quantity); // This is for testing only.
        // editCart(item._id, cart.quantity);
    }

    let [quantity, setquantity] = useState(item.quantity);
    const incQty = () => {
        quantity < 5 ? setquantity(quantity + 1) : setquantity(5);
        quantity < 5 ? editCart(item._id, quantity + 1) : setquantity(5);
    }

    const decQty = () => {
        quantity > 1 ? setquantity(quantity - 1) : setquantity(1);
        quantity > 1 ? editCart(item._id, quantity - 1) : setquantity(1);
    }

    // console.log("User Info: ", JSON.stringify(userinfo)); // This is for testing only.
    // console.log("User Contact: ", userinfo.contact); // This is for testing only.
    // console.log("User Address: ", userinfo.address); // This is for testing only.
    // console.log("Number: " + credentials.number); // This is for testing only.
    // console.log("Address: " + credentials.address); // This is for testing only.

    // console.log("Product ID in CartItem: " + item.productID);
    // console.log("Size in CartItem: " + item.size);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Handle Submit Triggered."); // This is for testing only.
        setContactFunc(credentials.number);
        setAddressFunc(credentials.address);
        addOrder(quant);

        sweetAlert();

        // console.log("Contact Number: " + credentials.number + "\nAddress: " + credentials.address); // This is for testing only.
    }

    const d = new Date();
    const day = d.getDay();

    const [delivDay, setdelivDay] = useState();

    const getDay = () => {
        switch (day) {
            case 0:
                setdelivDay("Tue");
                break;
            case 1:
                setdelivDay("Wed");
                break;
            case 2:
                setdelivDay("Thu");
                break;
            case 3:
                setdelivDay("Fri");
                break;
            case 4:
                setdelivDay("Sat");
                break;
            case 5:
                setdelivDay("Sun");
                break;
            case 6:
                setdelivDay("Mon");
                break;

            default:
                break;
        }
    }
    useEffect(() => {
        getDay();
    }, []);
    // console.log("Current Day: " + day); // This is for testing only.

    const navigate = useNavigate();

    return (
        <>
            {/* Below code is for modal popup. */}
            <div className="modal fade" id="delivinfo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                        <button id='submitbtn' style={{ width: "100%", backgroundColor: "lime", color: "black" }} type="submit" className="btn btn-primary my-1" data-bs-dismiss={credentials.number.length === 10 && credentials.address !== "" ? "modal" : ""} data-bs-toggle={credentials.number.length === 10 && credentials.address !== "" ? "modal" : ""} data-bs-target="#exampleModal2"><b>Proceed</b></button>
                                        {/* <button id='submitbtn' style={{ width: "100%", backgroundColor: "blue" }} type="submit" className="btn btn-primary my-1" disabled={credentials.number === "" || credentials.address === ""} data-bs-dismiss={credentials.number.length === 10 && credentials.address !== "" ? "modal" : ""}><b>Submit</b></button> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Successful order confirmation Modal */}
            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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




            {/* Confirmation Popup modal for Deletion of Cart Item. */}
            <div className="modal fade" id="cnfpopup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div style={{ backgroundImage: "none", backgroundColor: "orange" }} className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Remove Item</h1>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                            <h4>Are you sure you want to remove this item?</h4>
                        </div>
                        <div className="d-flex justify-content-center my-2">
                            <button style={{ width: "48%" }} type="button" onClick={() => { deleteCart(); props.showAlert("Cart deleted successfully", "success"); }} data-bs-dismiss="modal" className="btn btn-primary mx-2">Remove</button>
                            <button style={{ width: "48%" }} type="button" className="btn btn-danger mx-2" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>


            <div style={{ backgroundColor: "#a2bee8" }} className="card my-2 mx-1">
                <div className="row d-flex align-items-center">
                    <div className="col-xxl-5 col-4">
                        {/* <img style={{ height: "160px", width: "130px" }} src={item.image} className="" alt="..." /> */}
                        <img id='cartimg' src={item.image} className="" alt="..." />

                        <div className="d-flex justify-content-start my-1 qtydiv">
                            {quantity === 1 ?
                                <button id='qty' onClick={() => { decQty(); }} className='btn btn-light'>
                                    <i style={{ cursor: 'pointer' }} className="fa-solid fa-trash" title='Delete Cart' onClick={sessionStorage.getItem("usertoken") ? () => {
                                        setid(item._id); // It sets the element id in product state file for passing it into deleteCart().
                                    } : () => { navigate("/login"); props.showAlert("Unauthorize access attempted !!", "warning"); }} data-bs-toggle="modal" data-bs-target="#cnfpopup"></i>
                                </button>

                                : <button id='qty' onClick={() => { decQty(); }} className='btn btn-light'><i className="fa-solid fa-minus" /></button>
                            }

                            <div style={{ fontWeight: "bolder" }} className='mx-3 mt-2'>{quantity}</div>
                            <button id='qty' onClick={() => { incQty(); }} className='btn btn-light'><i className="fa-solid fa-plus" /></button>
                        </div>
                    </div>
                    <div className="col-xxl-7 col-8">

                        <div className="card-body">
                            <h5 className="card-title mv"><b>{item.brand}</b></h5>
                            <p className="card-text carttext"><b>{item.description}</b></p>

                            <p className="card-text carttext">Delivery in 2 days, {delivDay} | <b style={{ color: "green" }}>Free</b> ₹<del>40</del> <br /> Size: {item.size}</p>

                            {/* <div className="input-group mb-3">
                                <button id='qty' onClick={() => { decQty(); }} className='btn btn-light'><i className="fa-solid fa-minus" /></button>
                                <div style={{ fontWeight: "bolder" }} className='mx-3 mt-2'>{quantity}</div>
                                <button id='qty' onClick={() => { incQty(); }} className='btn btn-light'><i className="fa-solid fa-plus" /></button>
                            </div> */}


                            <p className="card-text carttext pricetext"><del className='delprice me-2'>₹{item.price * item.quantity}</del> <b className="text-body-secondary"> ₹{(item.price * item.quantity - ((item.price * item.quantity) / 10).toFixed().toLocaleString('en-IN')).toLocaleString('en-IN')}</b></p>

                            {quantity !== 1 ?
                                <>
                                    < i style={{ cursor: 'pointer' }} className="fa-solid fa-trash mx-2" title='Delete Cart' onClick={sessionStorage.getItem("usertoken") ? () => {
                                        setid(item._id); // It sets the element id in product state file for passing it into deleteCart().
                                    } : () => { navigate("/login"); props.showAlert("Unauthorize access attempted !!", "warning"); }} data-bs-toggle="modal" data-bs-target="#cnfpopup" />
                                </>
                                : <></>
                            }
                            <button id='ordbtn' onClick={sessionStorage.getItem('usertoken') ? () => {
                                setid(item.productID);
                                setshoesize(item.size);
                                setquant(item.quantity);
                                getUser();
                                credentials.number = userinfo.contact;
                                credentials.address = userinfo.address;
                                document.getElementById('hidbtn').click();
                                // } : () => { navigate("/login"); props.showAlert("Please login first to proceed an order.", "info"); console.log("User not login."); }} data-bs-toggle={sessionStorage.getItem("usertoken") ? "modal" : ""} data-bs-target={sessionStorage.getItem("usertoken") ? "#delivinfo" : ""} className="btn btn-warning">Buy now</button>
                            } : () => { navigate("/login"); props.showAlert("Please login first to proceed an order.", "info"); console.log("User not login."); }} className="btn btn-warning">Buy now</button>

                            {/* Used extra hidden button for fetching contact and address of user on click. */}
                            <button hidden id='hidbtn' onClick={sessionStorage.getItem('usertoken') ? () => {
                                getUser();
                                credentials.number = userinfo.contact;
                                credentials.address = userinfo.address;
                            } : () => { navigate("/login"); props.showAlert("Please login first to proceed an order.", "info"); console.log("User not login."); }} data-bs-toggle={sessionStorage.getItem("usertoken") ? "modal" : ""} data-bs-target={sessionStorage.getItem("usertoken") ? "#delivinfo" : ""} className="btn btn-warning"></button>


                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default CartItems;