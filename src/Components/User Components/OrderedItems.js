import React, { useContext, useState } from 'react'
import ProductContext from '../../Context/Products/ProductContext';
const OrderedItems = (props) => {
    const { item } = props;
    const context = useContext(ProductContext);
    const { cancelOrder } = context;

    // const [order, setorder] = useState({ quantity: item.quantity });
    // const onChange = (e) => {
    //     setorder({ ...order, [e.target.name]: e.target.value });
    //     // e.preventDefault();
    //     // console.log("Cart Stated Quantity: " + cart.quantity); // This is for testing only.
    //     // editCart(item._id, cart.quantity);
    // }

    // const updateQuantity = (e) => {
    //     if (cart.quantity <= 0) {
    //         props.showAlert("Quantity can't be less than or equal to 0 !! 😎", "warning");
    //     } else {
    //         editCart(item._id, cart.quantity);
    //         props.showAlert("Quantity updated successfully.", "success");
    //         // console.log("Cart Updated Quantity: " + cart.quantity); // This is for testing only.
    //     }
    // }
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

                            <p className="card-text"><b className="text-body-secondary">Size: {(item.size).toLocaleString('en-IN')}<br /> Price: ₹ {(item.price * item.quantity).toLocaleString('en-IN')} </b></p>
                            {/* <p className="card-text"><b className="text-body-secondary">Size:  {item.size}</b></p> */}

                            <button className='btn btn-danger' title='Cancel Order' onClick={() => { cancelOrder(item._id); props.showAlert("Order cancelled successfully.", "success"); }}>Cancel Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderedItems