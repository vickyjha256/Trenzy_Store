import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../../Context/Products/ProductContext';
const CustomerOrderedItems = (props) => {
    const { delivDetail } = props;
    const context = useContext(ProductContext);
    const { orderUpdate } = context;

    const [status, setstatus] = useState({ update: "ontheway" });

    const onChange = (e) => {
        setstatus({ ...status, [e.target.name]: e.target.value });
    }

    useEffect(() => {
      setstatus({update: delivDetail.status});
    }, [delivDetail])
    

    console.log("Status: " + status.update);

    return (
        <>
            <div style={{ backgroundColor: "#a2bee8" }} className="card my-2">
                <div className="row d-flex align-items-center">
                    <div className="col-xxl-5 col-5">
                        <img style={{ height: "200px", width: "180px" }} src={delivDetail.image} className="" alt="..." />
                    </div>
                    <div className="col-xxl-7 col-7">
                        <div className="card-body">
                            <h5 className="card-title"><b>{delivDetail.brand}</b></h5>
                            <p className="card-text"><b>{delivDetail.description}</b></p>



                            <p className="card-text"><b className="text-body-secondary">Size: {delivDetail.size}<br /> Price: ₹ {(delivDetail.price * delivDetail.quantity).toLocaleString('en-IN')} </b></p>
                            {/* <p className="card-text"><b className="text-body-secondary">Size:  {delivDetail.size}</b></p> */}

                            <p className="card-text"><b className="text-body-secondary">Customer Name: {delivDetail.name} <br /> Mobile No.: {delivDetail.contact} <br /> Delivery Address: {delivDetail.address} </b></p>


                            <h6><b>Update Status:</b></h6>
                            <div className="form-floating mb-3">
                                <select id='update' name='update' value={status.update} onChange={onChange} className="form-select" aria-label="Default select example">
                                    <option value="ontheway">On the way</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="problem">Problem</option>
                                </select>
                            </div>
                            <button onClick={() => { orderUpdate(delivDetail._id, status.update); props.showAlert("Order status updated successfully.", "success") }} className='btn btn-primary'>Update Status</button>


                            {/* <button className='btn btn-danger' title='Cancel Order' onClick={() => { cancelOrder(delivDetail._id); props.showAlert("Order cancelled successfully.", "success"); }}>Cancel Order</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerOrderedItems;