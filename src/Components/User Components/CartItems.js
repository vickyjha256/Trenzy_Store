import React, { useContext, useState } from 'react'
import ProductContext from '../../Context/Products/ProductContext';
import { useNavigate } from 'react-router-dom';
const CartItems = (props) => {
    const { item } = props;
    const context = useContext(ProductContext);
    const { editCart, deleteCart, setid } = context;

    const [cart, setcart] = useState({ quantity: item.quantity });
    const onChange = (e) => {
        setcart({ ...cart, [e.target.name]: e.target.value });
        // e.preventDefault();
        // console.log("Cart Stated Quantity: " + cart.quantity); // This is for testing only.
        // editCart(item._id, cart.quantity);
    }

    const updateQuantity = (e) => {
        if (cart.quantity <= 0) {
            props.showAlert("Quantity can't be less than or equal to 0 !! 😎", "warning");
        } else {
            editCart(item._id, cart.quantity);
            props.showAlert("Quantity updated successfully.", "success");
            // console.log("Cart Updated Quantity: " + cart.quantity); // This is for testing only.
        }
    }

    const navigate = useNavigate();

    return (
        <>


            <div style={{ backgroundColor: "#a2bee8" }} className="card my-2">
                <div className="row d-flex align-items-center">
                    <div className="col-xxl-5 col-5">
                        <img style={{ height: "200px", width: "180px" }} src={item.image} className="" alt="..." />
                    </div>
                    <div className="col-xxl-7 col-7">

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

                        <div className="card-body">
                            <h5 className="card-title"><b>{item.brand}</b></h5>
                            <p className="card-text"><b>{item.description}</b></p>

                            <div className="input-group mb-3">
                                <input type='number' onChange={onChange} value={cart.quantity} id='qtyinput' name='quantity' list='inputGroupSelect01' min={1} />
                                <button id='qtybtn' onClick={() => { updateQuantity(); }} className='btn btn-info' >Update Quantity</button>
                            </div>
                            {/* <i style={{ cursor: 'pointer' }} className="fa-solid fa-trash mx-2" title='Delete Cart' onClick={() => { deleteCart(item._id); props.showAlert("Cart deleted successfully", "success"); }}></i> */}


                            <i style={{ cursor: 'pointer' }} className="fa-solid fa-trash mx-2" title='Delete Cart' onClick={sessionStorage.getItem("usertoken") ? () => {
                                setid(item._id); // It sets the element id in product state file for passing it into deleteCart().
                            } : () => { navigate("/login"); props.showAlert("Unauthorize access attempted !!", "warning"); }} data-bs-toggle="modal" data-bs-target="#cnfpopup"></i>


                            <p className="card-text"><b className="text-body-secondary">Size: {item.size}<br />Price: ₹ {(item.price * item.quantity).toLocaleString('en-IN')}</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItems;