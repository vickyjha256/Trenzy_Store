import React, { useContext, useState } from 'react'
import ProductContext from '../../Context/Products/ProductContext';
const CustomerOrderedItems = (props) => {
    const { item } = props;
    const context = useContext(ProductContext);
    const { orderUpdate } = context;

    const [status, setstatus] = useState({ update: "onthway" });

    const onChange = (e) => {
        setstatus({ ...status, [e.target.name]: e.target.value });
    }

    console.log("Status: " + status.update);

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
                            {/* <p className="card-text"><b className="text-body-secondary">Size:  {item.size}</b></p> */}

                            <p className="card-text"><b className="text-body-secondary">Delivery Address: {item.address} </b></p>


                            <h6><b>Update Status:</b></h6>
                            <div className="form-floating mb-3">
                                <select id='update' name='update' value={status.update} onChange={onChange} className="form-select" aria-label="Default select example">
                                    <option value="ontheway">On the way</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="problem">Problem</option>
                                </select>
                            </div>
                            <button onClick={() => { orderUpdate(item._id, status.update); props.showAlert("Order status updated successfully.", "success") }} className='btn btn-primary'>Update Status</button>


                            {/* <button className='btn btn-danger' title='Cancel Order' onClick={() => { cancelOrder(item._id); props.showAlert("Order cancelled successfully.", "success"); }}>Cancel Order</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerOrderedItems