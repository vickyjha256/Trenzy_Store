import { useState } from "react";
import ProductContext from "./ProductContext";
import Swal from "sweetalert2";

const CartState = (props) => {
    // const host = "http://localhost:5000";
    // const host = "https://trenzy-backend.onrender.com";
    const host = "https://trenzybackend1.cyclic.cloud";
    const [products, setproducts] = useState([]);

    // Add Product()
    const addProduct = async (image, brand, description, type, gender, price, availability) => {
        // TODO: API Call
        // API Call:
        const response = await fetch(`${host}/api/adminproducts/addproducts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'admintoken': sessionStorage.getItem("token"),
            },
            body: JSON.stringify({ image, brand, description, type, gender, price, availability })
        });
        const product = await response.json();
        setproducts(products.concat(product));
        props.showAlert("Product Added successfully.", "success");
    }

    // Delete Product()
    const deleteProduct = async () => {
        // TODO: API Call
        // API Call:
        const response = await fetch(`${host}/api/adminproducts/deleteproduct/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'admintoken': sessionStorage.getItem("token"),
            },
        });
        const json = response.json();
        console.log("Delete Product: " + json);

        // console.log("Deleting the product with id: " + id); // This is for testing only.
        const newProducts = products.filter((product) => { return product._id !== id });
        setproducts(newProducts);
    }

    // Edit Product()
    const editProduct = async (id, image, brand, description, type, gender, price, availability) => {
        // API Call:
        const response = await fetch(`${host}/api/adminproducts/updateproduct/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'admintoken': sessionStorage.getItem("token"),
            },
            body: JSON.stringify({ image, brand, description, type, gender, price, availability })
        });
        const json = response.json(); // This is for testing only.
        console.log("Edit Product: " + json);

        let newProducts = JSON.parse(JSON.stringify(products));

        // Logic to edit in client.
        for (let i = 0; i < newProducts.length; i++) {
            const element = newProducts[i];
            if (element._id === id) {
                element.image = image;
                element.brand = brand;
                element.description = description;
                element.type = type;
                element.gender = gender;
                element.price = price;
                element.availability = availability;
                break;
            }
        }
        setproducts(newProducts);
    }

    // Get All Products
    const getProducts = async () => {
        // API Call:
        const response = await fetch(`${host}/api/adminproducts/getproducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'admintoken': sessionStorage.getItem("token")
            }
        });
        const json = await response.json();
        console.log(json); // This is for testing only.
        setproducts(json);
    }

    // --------------------- Fetching Items for client side. ----------------------
    // Get All Items for specific type men, women and filters(casual,formal,ethnic).
    const [loading, setloading] = useState(true);
    const fetchItems = async (type) => {
        // API Call:
        const response = await fetch(`${host}/api/adminproducts/${type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'admintoken': sessionStorage.getItem("token")
            }
        });
        const json = await response.json();
        // console.log(json); // This is for testing only.
        setproducts(json);
        setloading(false);
    }

    const [searchedProduct, setsearchedProduct] = useState([]);
    // Get Searched Items.
    const searchItems = async (q) => {
        // API Call:
        const response = await fetch(`${host}/api/adminproducts/query/${q}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'admintoken': sessionStorage.getItem("token")
            }
        });
        const json = await response.json();
        // console.log(json); // This is for testing only.
        setsearchedProduct(json);
    }


    // ---------------------------- Contexts for Operations on Carts at user side. -----------------------------
    const [carts, setcarts] = useState([]);

    let [id, setid] = useState();
    let [shoesize, setshoesize] = useState();

    const idFunc = (getId) => {
        id = getId;
        // console.log("IdFunc: " + id); // This is for testing only.
    }
    const sizeFunc = (size) => {
        shoesize = size;
        // console.log("ShoeSize: " + shoesize); // This is for testing only.
    }

    // Add Cart()
    const addCart = async () => {
        // TODO: API Call
        // API Call:
        const response = await fetch(`${host}/api/usercart/addcart/${id}/${shoesize}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': sessionStorage.getItem("usertoken"),
            },
            // body: JSON.stringify({ title, description })
        });
        const cart = await response.json();
        setcarts(carts.concat(cart));

        console.log("Added to cart.");
        console.log("ID: " + id);
        console.log("Size: " + shoesize);

        // console.log("Response: " + response.json()) // This is for testing only.
        // showAlert("Product added to cart." , "success");
    }

    // Delete Cart()
    const deleteCart = async () => {
        // TODO: API Call
        // API Call:
        const response = await fetch(`${host}/api/usercart/deletecart/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': sessionStorage.getItem("usertoken")
            },
        });
        const json = response.json();
        console.log("Delete Cart: " + json);

        console.log("Deleting the cart with id: " + id); // This is for testing only.
        const newCarts = carts.filter((cart) => { return cart._id !== id });
        setcarts(newCarts);
    }

    // Edit Note()
    const editCart = async (id, quantity) => {
        // API Call:
        const response = await fetch(`${host}/api/usercart/updatecart/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': sessionStorage.getItem("usertoken")
            },
            body: JSON.stringify({ quantity })
        });
        const json = response.json(); // This is for testing only.
        console.log("Edit Cart: " + json);

        let newCarts = JSON.parse(JSON.stringify(carts));

        // Logic to edit in client.
        for (let i = 0; i < newCarts.length; i++) {
            const element = newCarts[i];
            if (element._id === id) {
                element.quantity = quantity;
                break;
            }
        }
        setcarts(newCarts);
    }

    // Get All Carts
    const getCart = async () => {
        // API Call:
        const response = await fetch(`${host}/api/usercart/fetchcart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': sessionStorage.getItem("usertoken")
            }
        });
        const json = await response.json();
        console.log(json); // This is for testing only.
        setcarts(json);
    }

    // ---------------------------- Contexts for Operations on orders at user side. -----------------------------
    const [orders, setorders] = useState([]);

    let contact = null, address = null;
    const setContactFunc = (cont) => {
        contact = cont;
        // console.log("Contact: " + cont); // This is for testing only.
    }
    const setAddressFunc = (addr) => {
        address = addr;
        // console.log("Address: " + address); // This is for testing only.
    }

    const [userinfo, setuserinfo] = useState([]);

    // Get User Info
    const getUser = async () => {
        // API Call:
        const response = await fetch(`${host}/api/userauth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': sessionStorage.getItem("usertoken")
            }
        });
        const userDetail = await response.json();

        // console.log("Get User: " + JSON.stringify(userDetail)); // This is for testing only.
        // console.log("UserDetail Number: " + userDetail.contact); // This is for testing only.
        // console.log("UserDetail Address: " + userDetail.address); // This is for testing only.
        setuserinfo(userDetail);
    }

    const [quant, setquant] = useState(1);
    // console.log("Quant in product State: " + quant); // This is for testing only.
    // Add Order()
    const addOrder = async (quantity) => {
        // TODO: API Call
        // API Call:
        const response = await fetch(`${host}/api/userorder/addorder/${id}/${shoesize}`, {
            // const response = await fetch(`${host}/api/userorder/addorder/${id}/${shoesize}/${contact}/${address}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': sessionStorage.getItem("usertoken"),
            },
            body: JSON.stringify({ contact, address, quantity })
        });
        const order = await response.json();
        setorders(orders.concat(order));

        // console.log("Added to orders.");
        // console.log("Ordered Product ID: " + id);
        // console.log("Ordered Shoe Size: " + shoesize);
        // console.log("Quantity " + quantity);


        // console.log("Response: " + response.json()) // This is for testing only.
        // showAlert("Product added to orders." , "success");
    }

    // Cancel Order()
    const cancelOrder = async () => {
        // TODO: API Call
        // API Call:
        const response = await fetch(`${host}/api/userorder/cancelorder/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': sessionStorage.getItem("usertoken")
            },
        });
        const json = response.json();
        console.log("Cancelled Order: " + json);

        console.log("Cancelling the order with id: " + id); // This is for testing only.
        const newOrders = orders.filter((order) => { return order._id !== id });
        setorders(newOrders);
    }

    // Get All Orders
    const getOrder = async () => {
        // API Call:
        const response = await fetch(`${host}/api/userorder/fetchorder`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': sessionStorage.getItem("usertoken"),
            }
        });
        const json = await response.json();
        console.log(json); // This is for testing only.
        setorders(json);
    }

    const custOrders = async () => {
        // API Call:
        const response = await fetch(`${host}/api/userorder/customerorders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'admintoken': sessionStorage.getItem("token"),
            }
        });

        const json = await response.json();
        console.log(json); // This is for testing only.
        setorders(json);
    }

    const orderUpdate = async (id, status) => {
        // eslint-disable-next-line
        // API Call:
        const response = await fetch(`${host}/api/userorder/trackupdate/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'admintoken': sessionStorage.getItem("token"),
            },
            body: JSON.stringify({ status })
        });

        let trackup = JSON.parse(JSON.stringify(orders));

        // Logic to edit in client.
        for (let i = 0; i < trackup.length; i++) {
            const element = trackup[i];
            if (element._id === id) {
                element.status = status;
                break;
            }
        }
        setorders(trackup);

        // const json = await response.json();
        // console.log(json); // This is for testing only.
    }



    // ----------------- Alert Related Stuff -------------------
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null)
        }, 1500);
    }

    const sweetAlert = (role) => {
        if (role === 'cart') {
            Swal.fire({
                color: "white",
                title: "Product added to cart successfully !!",
                text: "",
                icon: "success",
                timer: 1400,
                showConfirmButton: false,
                background: "#0080ff"
            });
        } else {
            Swal.fire({
                color: "white",
                title: "Product ordered successfully !!",
                text: "",
                icon: "success",
                timer: 1400,
                showConfirmButton: false,
                background: "#0080ff"
            });
        }
    }

    // ----------- Context for Search related text. -------------
    const [query, setquery] = useState("");
    const [otpBoxToggle, setotpBoxToggle] = useState(false);
    const [toggleRP, settoggleRP] = useState(false);

    return (
        <ProductContext.Provider value={{
            products, addProduct, deleteProduct, editProduct, getProducts,
            // fetchItems, menItems, casualMen, formalMen, ethnicMen, womenItems, casualWomen, formalWomen, ethnicWomen,
            fetchItems, searchItems, searchedProduct,
            carts, addCart, deleteCart, editCart, getCart,
            alert, showAlert,
            id, setid, idFunc, sizeFunc, setshoesize,
            getUser, userinfo, setContactFunc, setAddressFunc,
            orders, addOrder, cancelOrder, getOrder, custOrders, orderUpdate, setquant, quant,
            sweetAlert,
            query, setquery,
            otpBoxToggle, setotpBoxToggle,
            toggleRP, settoggleRP,
            loading,

        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default CartState;