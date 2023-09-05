import React, { useContext, useEffect } from 'react'
import OrderedItems from './OrderedItems';
import ProductContext from '../../Context/Products/ProductContext';
import { useNavigate } from 'react-router-dom';

const Orders = (props) => {
    const context = useContext(ProductContext);
    const { orders, getOrder } = context;

    const { showAlert } = props;

    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("usertoken")) {
            // navigate("/admindashboard");
            navigate("/orders");
            getOrder();

            props.setprogress(30);
            props.setprogress(60);
            props.setprogress(80);
            props.setprogress(100);
        } else {
            props.showAlert("Please login to see your ordered items !!", "danger");
            navigate("/login");

            props.setprogress(30);
            props.setprogress(60);
            props.setprogress(80);
            props.setprogress(100);
        }
    }, []);

    let total_orderedItems_price = 0;
    let total_Items = 0;
    let discount = 0;
    return (
        <>
            <div style={{ backgroundColor: "whitesmoke" }} className='container'>
                <h1>Hello, from OrderBot.</h1>
                {orders.map(
                    (product) => {
                        total_Items = total_Items + 1;
                        total_orderedItems_price = total_orderedItems_price + product.price * product.quantity;
                        discount = discount + ((product.price * product.quantity) / 10);
                        return <OrderedItems key={product._id} item={product} showAlert={showAlert} />
                    }
                )}

                {total_Items == 0 ? <div className="alert alert-warning row" role="alert">
                    <h6 role='alert' className='alert-warning'>There are no orders, Please order something. </h6>
                </div> : null}
            </div>
        </>
    )
}

export default Orders