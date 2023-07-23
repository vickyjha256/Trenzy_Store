import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../../Context/Products/ProductContext'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const WomenShoes = (props) => {
    const context = useContext(ProductContext);
    const { products, womenItems, casualWomen, formalWomen, ethnicWomen, addCart, id, setid, sizeFunc, addOrder, getUser, userinfo, setContactFunc, setAddressFunc } = context;

    useEffect(() => {
        if (props.shoetype === "CasualWomen") {
            casualWomen();
        } else if (props.shoetype === "FormalWomen") {
            formalWomen();
        } else if (props.shoetype === "EthnicWomen") {
            ethnicWomen();
        } else {
            womenItems();
        }
    }, []);
    // console.log("Props.Shoetype: " + props.shoetype);


    // const [credentials, setCredentials] = useState({ number: `${userinfo.contact === undefined ? "" : userinfo.contact}`, address: `${userinfo.address === undefined ? "" : userinfo.address}` });
    const [credentials, setCredentials] = useState({ number: `${userinfo.contact === undefined ? sessionStorage.getItem("usertoken") && getUser() && userinfo.contact : userinfo.contact}`, address: `${userinfo.address === undefined ? sessionStorage.getItem("usertoken") && getUser() && userinfo.address : userinfo.address}` });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    // console.log("User Info: ", JSON.stringify(userinfo)); // This is for testing only.
    console.log("User Contact: ", userinfo.contact); // This is for testing only.
    console.log("User Address: ", userinfo.address); // This is for testing only.
    console.log("Number: " + credentials.number); // This is for testing only.
    console.log("Address: " + credentials.address); // This is for testing only.
    console.log("ID in productstate: " + id); // This is for testing only.


    // const btmove = (e) => {
    //     let movingBtn = document.getElementById("outdiv");
    //     if (credentials.number === "" || credentials.address === "") {
    //         if (movingBtn.className === "d-flex justify-content-start") {
    //             movingBtn.className = Math.floor(Math.random() * 12) > 6 ? "d-flex justify-content-center" : "d-flex justify-content-end"
    //         } else if (movingBtn.className === "d-flex justify-content-center") {
    //             movingBtn.className = Math.floor(Math.random() * 12) > 6 ? "d-flex justify-content-start" : "d-flex justify-content-end"
    //         } else if (movingBtn.className === "d-flex justify-content-end") {
    //             movingBtn.className = Math.floor(Math.random() * 12) > 6 ? "d-flex justify-content-start" : "d-flex justify-content-center"
    //         }
    //     }
    //     else {
    //         movingBtn.className = "d-flex justify-content-center";
    //     }
    // }


    let navigate = useNavigate();
    const sweetCartAlert = (role) => {
        // console.log("Added to cart successfully.");
        // addCart(element._id);

        if (role === 'cart') {
            Swal.fire({
                color: "white",
                title: "Product added to cart successfully !!",
                text: "",
                icon: "success",
                timer: 1400,
                showConfirmButton: false,
                background: "#0080ff"
            });
        } else {
            Swal.fire({
                color: "white",
                title: "Product ordered successfully !!",
                text: "",
                icon: "success",
                timer: 1400,
                showConfirmButton: false,
                background: "#0080ff"
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Handle Submit Triggered."); // This is for testing only.
        setContactFunc(credentials.number);
        setAddressFunc(credentials.address);
        addOrder();
        sweetCartAlert();

        console.log("Contact Number: " + credentials.number + "\nAddress: " + credentials.address); // This is for testing only.
    }


    return (
        <>
            <div id='divItem' className='container-fluid'>
                <div className='row'>

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
                                                <button id='submitbtn' style={{ width: "100%", backgroundColor: "blue" }} type="submit" className="btn btn-primary my-1" data-bs-dismiss={credentials.number.length === 10 && credentials.address !== "" ? "modal" : ""} data-bs-toggle={credentials.number.length === 10 && credentials.address !== "" ? "modal" : ""} data-bs-target="#exampleModal2"><b>Submit</b></button>
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


                    {products.map((element) => {
                        return <div className='d-flex justify-content-center col-xxl-3 col-6 my-3' key={element._id}>
                            {/* <img style={{height: "100%", width: "100%"}} src={element.image} alt="" /> */}
                            <div id='productcard' className="card">
                                <img id='productimg' src={element.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{element.brand}</h5>
                                    <p className="card-text"><b>₹ {element.price} </b></p>


                                    {/* Cart Size Choosing Modal */}
                                    <div className="modal fade" id="cart" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div style={{ opacity: "1" }} className="modal-content">
                                                {/* <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div> */}
                                                <div style={{ backgroundColor: "white", color: "black" }} className="modal-body">
                                                    <h6>Select Size: UK/India </h6>
                                                    <div className="grid text-center">
                                                        <button type='button' onClick={() => { sizeFunc(5); addCart(); sweetCartAlert("cart"); }} data-bs-dismiss="modal" className="btn btn-warning mx-2">5</button>
                                                        <button type='button' onClick={() => { sizeFunc(6); addCart(); sweetCartAlert("cart"); }} data-bs-dismiss="modal" className="btn btn-warning mx-2">6</button>
                                                        <button type='button' onClick={() => { sizeFunc(7); addCart(); sweetCartAlert("cart"); }} data-bs-dismiss="modal" className="btn btn-warning mx-2">7</button>
                                                        <button type='button' onClick={() => { sizeFunc(8); addCart(); sweetCartAlert("cart"); }} data-bs-dismiss="modal" className="btn btn-warning mx-2">8</button>
                                                        <button type='button' onClick={() => { sizeFunc(9); addCart(); sweetCartAlert("cart"); }} data-bs-dismiss="modal" className="btn btn-warning mx-2">9</button>
                                                        <button type='button' onClick={() => { sizeFunc(10); addCart(); sweetCartAlert("cart"); }} data-bs-dismiss="modal" className="btn btn-warning mx-2">10</button>
                                                        <button type='button' onClick={() => { sizeFunc(11); addCart(); sweetCartAlert("cart"); }} data-bs-dismiss="modal" className="btn btn-warning mx-2">11</button>
                                                        <button type='button' onClick={() => { sizeFunc(12); addCart(); sweetCartAlert("cart"); }} data-bs-dismiss="modal" className="btn btn-warning mx-2">12</button>

                                                    </div>
                                                </div>
                                                {/* <div className="modal-footer">
                                                    <button type="button" className="btn btn-success">Save changes</button>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>


                                    {/* Order Size Choosing Modal */}
                                    <div className="modal fade" id="order" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div style={{ opacity: "1" }} className="modal-content">
                                                {/* <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div> */}
                                                <div style={{ backgroundColor: "white", color: "black" }} className="modal-body">
                                                    <h6>Select Size: UK/India </h6>
                                                    <div className="grid text-center">
                                                        <button type='button' onClick={() => { sizeFunc(5); }} data-bs-toggle={sessionStorage.getItem("usertoken") ? "modal" : ""} data-bs-target={sessionStorage.getItem("usertoken") ? "#delivinfo" : ""} data-bs-dismiss="modal" className="btn btn-warning mx-2">5</button>
                                                        <button type='button' onClick={() => { sizeFunc(6); }} data-bs-toggle={sessionStorage.getItem("usertoken") ? "modal" : ""} data-bs-target={sessionStorage.getItem("usertoken") ? "#delivinfo" : ""} data-bs-dismiss="modal" className="btn btn-warning mx-2">6</button>
                                                        <button type='button' onClick={() => { sizeFunc(7); }} data-bs-toggle={sessionStorage.getItem("usertoken") ? "modal" : ""} data-bs-target={sessionStorage.getItem("usertoken") ? "#delivinfo" : ""} data-bs-dismiss="modal" className="btn btn-warning mx-2">7</button>
                                                        <button type='button' onClick={() => { sizeFunc(8); }} data-bs-toggle={sessionStorage.getItem("usertoken") ? "modal" : ""} data-bs-target={sessionStorage.getItem("usertoken") ? "#delivinfo" : ""} data-bs-dismiss="modal" className="btn btn-warning mx-2">8</button>
                                                        <button type='button' onClick={() => { sizeFunc(9); }} data-bs-toggle={sessionStorage.getItem("usertoken") ? "modal" : ""} data-bs-target={sessionStorage.getItem("usertoken") ? "#delivinfo" : ""} data-bs-dismiss="modal" className="btn btn-warning mx-2">9</button>
                                                        <button type='button' onClick={() => { sizeFunc(10); }} data-bs-toggle={sessionStorage.getItem("usertoken") ? "modal" : ""} data-bs-target={sessionStorage.getItem("usertoken") ? "#delivinfo" : ""} data-bs-dismiss="modal" className="btn btn-warning mx-2">10</button>
                                                        <button type='button' onClick={() => { sizeFunc(11); }} data-bs-toggle={sessionStorage.getItem("usertoken") ? "modal" : ""} data-bs-target={sessionStorage.getItem("usertoken") ? "#delivinfo" : ""} data-bs-dismiss="modal" className="btn btn-warning mx-2">11</button>
                                                        <button type='button' onClick={() => { sizeFunc(12); }} data-bs-toggle={sessionStorage.getItem("usertoken") ? "modal" : ""} data-bs-target={sessionStorage.getItem("usertoken") ? "#delivinfo" : ""} data-bs-dismiss="modal" className="btn btn-warning mx-2">12</button>

                                                    </div>
                                                </div>
                                                {/* <div className="modal-footer">
                                                    <button type="button" className="btn btn-success">Save changes</button>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>


                                    <button id='crtbtn' onClick={sessionStorage.getItem("usertoken") ? () => {
                                        setid(element._id); // It sets the element id in product state file for passing it into addCart().
                                    } : () => { navigate("/login"); props.showAlert("Please login first to see your cart items.", "info"); console.log("User not login."); }} data-bs-toggle={sessionStorage.getItem("usertoken") ? "modal" : ""} data-bs-target={sessionStorage.getItem("usertoken") ? "#cart" : ""} className="btn btn-info cartbtn">🛒</button>

                                    <button id='ordbtn' onClick={sessionStorage.getItem('usertoken') ? () => {
                                        setid(element._id);
                                        getUser();
                                        credentials.number = userinfo.contact;
                                        credentials.address = userinfo.address;
                                    } : () => { navigate("/login"); props.showAlert("Please login first to make an order.", "info"); console.log("User not login."); }} data-bs-toggle={sessionStorage.getItem("usertoken") ? "modal" : ""} data-bs-target={sessionStorage.getItem("usertoken") ? "#order" : ""} className="btn btn-info buybtn">Buy now</button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div >
        </>
    )
}

export default WomenShoes