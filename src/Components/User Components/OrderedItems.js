import React, { useContext, useState } from 'react'
import ProductContext from '../../Context/Products/ProductContext';
const OrderedItems = (props) => {
    const { item } = props;
    const context = useContext(ProductContext);
    const { cancelOrder } = context;

    return (
        <>
            <div style={{ backgroundColor: "#a2bee8" }} className="card my-2">
                <div className="row d-flex align-items-center">
                    <div className="col-xxl-5 col-5">
                        <img style={{ height: "200px", width: "180px" }} src={item.image} className="" alt="..." />
                    </div>
                    <div className="col-xxl-7 col-7">
                        <div className="card-body">
                            <h5 className="card-title"><b>{item.brand}</b></h5>
                            <p className="card-text"><b>{item.description}</b></p>


                            <p className="card-text"><b className="text-body-secondary">Size: {item.size}<br /> Price: ₹ {(item.price * item.quantity).toLocaleString('en-IN')} </b></p>

                            <section style={{backgroundColor: "#37455b", color: "white", borderRadius: "10px"}}>
                                <h4 className='mx-2'> Order Status </h4>

                                <p className="card-text mx-2"><b className="text-body-success"> {item.track === "ontheway" ? "Thank you for purchasing. Your order is on the way. Keep Shopping." : ""} {item.track === "delivered" ? "The order is delivered. Keep Shopping." : ""} {item.track === "problem" ? "Sorry, for your inconvenience. Seller has cancelled your order due to some occured problem. Please order again." : ""}</b></p>

                                <button style={{width: "100%", fontWeight: "bolder"}} hidden={item.track === "ontheway" ? false : true} className='btn btn-danger my-2' title='Cancel Order' onClick={() => { cancelOrder(item._id); props.showAlert("Order cancelled successfully.", "success"); }}>Cancel Order</button>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderedItems