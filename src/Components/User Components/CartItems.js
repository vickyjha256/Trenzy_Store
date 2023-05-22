import React, { useContext, useState } from 'react'
import ProductContext from '../../Context/Products/ProductContext';
const CartItems = (props) => {
    const { item } = props;
    const context = useContext(ProductContext);
    const { editCart, deleteCart } = context;

    const [cart, setcart] = useState({ quantity: item.quantity });
    const onChange = (e) => {
        setcart({ ...cart, [e.target.name]: e.target.value });
        // e.preventDefault();
        console.log("Cart Quantity: " + cart.quantity); // This is for testing only.
        editCart(item._id, cart.quantity);
    }

    return (
        <>
            <div style={{ backgroundColor: "aquamarine" }} className="card my-2">
                <div className="row d-flex align-items-center">
                    <div className="col-xxl-5 col-5">
                        <img style={{ height: "200px", width: "180px" }} src={item.image} className="" alt="..." />
                    </div>
                    <div className="col-xxl-7 col-7">
                        <div className="card-body">
                            <h5 className="card-title"><b>{item.brand}</b></h5>
                            <p className="card-text"><b>{item.description}</b></p>

                            <div className="input-group mb-3">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Qty:</label>
                                <input type='number' onChange={onChange} value={cart.quantity} id='inputGroupSelect01' name='quantity' list='inputGroupSelect01' min={1} max={20} />
                            </div>
                            <i style={{ cursor: 'pointer' }} className="fa-solid fa-trash mx-2" title='Delete Cart' onClick={() => { deleteCart(item._id); /* props.showAlert("Note deleted successfully", "success");*/ }}  ></i>


                            <p className="card-text"><b className="text-body-secondary">Price: ₹ {(item.price * item.quantity).toLocaleString('en-IN')}</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItems;