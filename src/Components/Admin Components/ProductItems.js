import React, { useContext } from 'react'
import ProductContext from '../../Context/Products/ProductContext';
import { useNavigate } from 'react-router-dom';

const ProductItems = (props) => {
    const { item, updateProduct } = props;
    const context = useContext(ProductContext);
    const { deleteProduct, setid } = context;

    const navigate = useNavigate();

    return (
        <>
            {/* Confirmation Popup modal for Cancellation of Ordered Item. */}
            <div className="modal fade" id="cnfpopupDeleteOrder" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div style={{ backgroundImage: "none", backgroundColor: "orange" }} className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Product</h1>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                            <h4>Are you sure you want to delete this product?</h4>
                        </div>
                        <div className="d-flex justify-content-center my-2">
                            {/* <button style={{ width: "48%" }} type="button" onClick={() => { deleteOrder(item._id); props.showAlert("Cart deleted successfully", "success"); }} data-bs-dismiss="modal" className="btn btn-primary mx-2">Yes</button> */}
                            {/* <button style={{ width: "48%" }} type="button" onClick={() => { deleteProduct(item._id); props.showAlert("Product deleted successfully.", "success"); }} data-bs-dismiss="modal" className="btn btn-primary mx-2">Yes</button> */}
                            <button style={{ width: "48%" }} type="button" onClick={() => { deleteProduct(); props.showAlert("Product deleted successfully.", "success"); }} data-bs-dismiss="modal" className="btn btn-primary mx-2">Yes</button>
                            <button style={{ width: "48%" }} type="button" className="btn btn-danger mx-2" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='d-flex justify-content-center col-xxl-3'>
                <div id='adminproductcard' style={{ backgroundColor: "" }} className="card my-2">
                    <img id='adminproductimg' src={item.image} className="" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title"><b>{item.brand}</b></h5>
                        <p className="card-text"><b>{item.description}</b></p>
                        <p className="card-text"><b>Type: {item.type}</b></p>
                        <p className="card-text"><b>Gender:{item.gender}</b></p>
                        <p className="card-text"><b>Price: ₹ {item.price.toLocaleString('en-IN')}</b></p>
                        <p className="card-text"><b>Availability: ₹ {item.availability}</b></p>

                        <button style={{ width: "45%" }} type="button" onClick={() => { updateProduct(item) }} className="btn btn-success mx-2">Update</button>
                        <button style={{ width: "45%" }} type="button" onClick={sessionStorage.getItem("token") ? () => {
                            setid(item._id); // It sets the element id in product state file for passing it into deleteProduct().
                            // console.log("Product deleted."); // This is for testing only.
                        } : () => { navigate("/login"); props.showAlert("Unauthorize access attempted !!", "warning"); }} data-bs-toggle="modal" data-bs-target="#cnfpopupDeleteOrder" className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductItems