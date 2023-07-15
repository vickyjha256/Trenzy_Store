import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../../Context/Products/ProductContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const MenShoes = (props) => {
    const context = useContext(ProductContext);
    const { products, menItems, casualMen, formalMen, ethnicMen, addCart, sizeFunc, elemIdFunc, addOrder, getUser, userinfo, setContactFunc, setAddressFunc } = context;

    useEffect(() => {
        if (props.shoetype === "CasualMen") {
            casualMen();
        } else if (props.shoetype === "FormalMen") {
            formalMen();
        } else if (props.shoetype === "EthnicMen") {
            ethnicMen();
        } else {
            menItems();
        }
    }, []);
    // console.log("Props.Shoetype: " + props.shoetype);

    const [credentials, setCredentials] = useState({ number: "", address: "" });
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    // console.log("Userinfo Contact: " + userinfo.contact, "Userinfo Address: " + userinfo.address);\
    console.log("User Info: ", userinfo);

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

    // const handleDetails = () => {
    //     console.log("Handled");

    //     setContactFunc(credentials.number);
    //     setAddressFunc(credentials.address);
    //     addOrder();

    //     // localStorage.setItem("Number", credentials.number);
    //     // localStorage.setItem("Address", credentials.address);
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

                                    {/* <form onSubmit={handleDetails}> */}
                                    <div className="form-floating mb-3">
                                        <input style={{ color: "white" }} type="number" required className="form-control bg-dark" value={credentials.number} onChange={onChange} id="number" name='number' placeholder="Phone Number" />
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
                                            <button onClick={() => { setContactFunc(credentials.number); setAddressFunc(credentials.address); addOrder(); sweetCartAlert(); console.log("Contact Number: " + credentials.number + "\nAddress: " + credentials.address) }} disabled={credentials.number === "" || credentials.address === ""} style={{ width: "100%", backgroundColor: "blue" }} type="submit" className="btn btn-primary my-1" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#exampleModal2"><b>Submit</b></button>
                                            {/* <button type='button' onClick={() => { sizeFunc(5); addCart(); sweetCartAlert(); }} data-bs-dismiss="modal" className="btn btn-warning mx-2">5</button> */}

                                        </div>
                                    </div>
                                    {/* </form> */}
                                </div>

                            </div>
                        </div>
                    </div>

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
                            {/* Below code is for modal popup. */}
                            <div className="modal fade" id="delivinfo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5">Order - Delivery related details.</h1>
                                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                        </div>
                                        <div className="modal-body">

                                            {/* <form onSubmit={handleDetails}> */}
                                            <div className="form-floating mb-3">
                                                <input style={{ color: "white" }} type="number" required className="form-control bg-dark" value={credentials.number} onChange={onChange} id="number" name='number' placeholder="Phone Number" />
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
                                                    <button onClick={() => { setContactFunc(credentials.number); setAddressFunc(credentials.address); addOrder(); sweetCartAlert() }} disabled={credentials.number === "" || credentials.address === ""} style={{ width: "100%", backgroundColor: "blue" }} type="submit" className="btn btn-primary my-1" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#exampleModal2"><b>Submit</b></button>
                                                    {/* <button type='button' onClick={() => { sizeFunc(5); addCart(); sweetCartAlert(); }} data-bs-dismiss="modal" className="btn btn-warning mx-2">5</button> */}

                                                </div>
                                            </div>
                                            {/* </form> */}
                                        </div>

                                    </div>
                                </div>
                            </div>

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
                                        elemIdFunc(element._id); // It sets the element id in product state file for passing it into addCart().
                                    } : () => { navigate("/login"); props.showAlert("Please login first to see your cart items.", "info"); console.log("User not login."); }} data-bs-toggle={sessionStorage.getItem("usertoken") ? "modal" : ""} data-bs-target={sessionStorage.getItem("usertoken") ? "#cart" : ""} className="btn btn-info cartbtn">🛒</button>

                                    <button id='ordbtn' onClick={sessionStorage.getItem('usertoken') ? () => {
                                        elemIdFunc(element._id);
                                        getUser();
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

export default MenShoes;