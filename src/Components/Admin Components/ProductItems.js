import React, { useContext } from 'react'
import ProductContext from '../../Context/Products/ProductContext';

const ProductItems = (props) => {
    const { item, updateProduct } = props;
    const context = useContext(ProductContext);
    const { deleteProduct } = context;

    return (
        <>
            <div className='d-flex justify-content-center col-xxl-3'>
                <div id='adminproductcard' style={{ backgroundColor: "aquamarine" }} className="card my-2">
                    <img id='adminproductimg' src={item.image} className="" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title"><b>{item.brand}</b></h5>
                        <p className="card-text"><b>{item.description}</b></p>
                        <p className="card-text"><b>Type: {item.type}</b></p>
                        <p className="card-text"><b>Gender:{item.gender}</b></p>
                        <p className="card-text"><b>Price: ₹ {item.price.toLocaleString('en-IN')}</b></p>
                        <p className="card-text"><b>Availability: ₹ {item.availability}</b></p>

                        <button style={{ width: "45%" }} type="button" onClick={() => { updateProduct(item) }} className="btn btn-success mx-2">Update</button>
                        <button style={{ width: "45%" }} type="button" onClick={() => { deleteProduct(item._id); /* </div>props.showAlert("Product deleted successfully", "success");*/ }} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductItems