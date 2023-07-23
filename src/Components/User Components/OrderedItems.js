import React, { useContext } from 'react'
import ProductContext from '../../Context/Products/ProductContext';
import { useNavigate } from 'react-router-dom';
const OrderedItems = (props) => {
    const { item } = props;
    const context = useContext(ProductContext);
    const { cancelOrder, setid } = context;

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
                        <div className="modal fade" id="cnfpopupOrder" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div style={{ backgroundImage: "none", backgroundColor: "orange" }} className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Cancel Order</h1>
                                        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                    </div>
                                    <div className="modal-body">
                                        <h4>Are you sure you want to cancel your order?</h4>
                                    </div>
                                    <div className="d-flex justify-content-center my-2">
                                        {/* <button style={{ width: "48%" }} type="button" onClick={() => { deleteOrder(item._id); props.showAlert("Cart deleted successfully", "success"); }} data-bs-dismiss="modal" className="btn btn-primary mx-2">Yes</button> */}
                                        <button style={{ width: "48%" }} type="button" onClick={() => { cancelOrder(); props.showAlert("Order cancelled successfully.", "success"); }} data-bs-dismiss="modal" className="btn btn-primary mx-2">Yes</button>
                                        <button style={{ width: "48%" }} type="button" className="btn btn-danger mx-2" data-bs-dismiss="modal">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            <h5 className="card-title"><b>{item.brand}</b></h5>
                            <p className="card-text"><b>{item.description}</b></p>


                            <p className="card-text"><b className="text-body-secondary">Size: {item.size}<br /> Price: ₹ {(item.price * item.quantity).toLocaleString('en-IN')} </b></p>

                            <section style={{ backgroundColor: "#37455b", color: "white", borderRadius: "10px" }}>
                                <h4 className='mx-2'> Order Status </h4>
                                <hr></hr>

                                <p className="card-text mx-2 pb-2"><b className="text-body-success"> {item.status === "ontheway" ? "Thank you for purchasing. Your order is on the way. Keep Shopping." : ""} {item.status === "delivered" ? "The order is delivered. Keep Shopping." : ""} {item.status === "problem" ? "Sorry, for your inconvenience. Seller has cancelled your order due to some occured problem. Please order again." : ""}</b></p>

                                <button style={{ width: "100%", fontWeight: "bolder", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }} hidden={item.status === "ontheway" ? false : true} className='btn btn-danger' title='Cancel Order' onClick={sessionStorage.getItem("usertoken") ? () => {
                                    setid(item._id); // It sets the element id in product state file for passing it into cancelOrder().
                                } : () => { navigate("/login"); props.showAlert("Unauthorize access attempted !!", "warning"); }} data-bs-toggle="modal" data-bs-target="#cnfpopupOrder">Cancel Order</button>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderedItems