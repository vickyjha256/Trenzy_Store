import { useState } from "react";
import ProductContext from "./ProductContext";

const CartState = (props) => {
    const host = "http://localhost:5000";
    const [products, setproducts] = useState([]);

    // products = [
    //     {
    //         "_id": "6446286a44e1ac8d9351389a",
    //         "admin": "64284ff1d4d10acdaf62b7a5",
    //         "image": "https://rukminim1.flixcart.com/image/612/612/xif0q/shoe/g/o/3/-original-imagg6r2tekyegmy.jpeg?q=70",
    //         "brand": "Rohit Updated",
    //         "description": "Final Solid black Sneakers for men.",
    //         "gender": "male",
    //         "price": 2500,
    //         "quantity": 1,
    //         "__v": 0
    //     },
    //     {
    //         "_id": "6446286a44l1ac8d9351389a",
    //         "admin": "64284ff1d4d10acdaf62b7a5",
    //         "image": "https://rukminim1.flixcart.com/image/612/612/xif0q/shoe/g/o/3/-original-imagg6r2tekyegmy.jpeg?q=70",
    //         "brand": "Rohit Updated",
    //         "description": "Final Solid black Sneakers for men.",
    //         "gender": "female",
    //         "price": 2500,
    //         "quantity": 1,
    //         "__v": 0
    //     },
    //     {
    //         "_id": "6446286a44e1acod9351389a",
    //         "admin": "64284ff1d4d10acdaf62b7a5",
    //         "image": "https://rukminim1.flixcart.com/image/612/612/xif0q/shoe/g/o/3/-original-imagg6r2tekyegmy.jpeg?q=70",
    //         "brand": "Rohit Updated",
    //         "description": "Final Solid black Sneakers for men.",
    //         "gender": "male",
    //         "price": 2500,
    //         "quantity": 1,
    //         "__v": 0
    //     },
    //     {
    //         "_id": "6446286a44e1am8d9351389a",
    //         "admin": "64284ff1d4d10acdaf62b7a5",
    //         "image": "https://rukminim1.flixcart.com/image/612/612/xif0q/shoe/g/o/3/-original-imagg6r2tekyegmy.jpeg?q=70",
    //         "brand": "Rohit Updated",
    //         "description": "Final Solid black Sneakers for men.",
    //         "gender": "male",
    //         "price": 2500,
    //         "quantity": 1,
    //         "__v": 0
    //     },
    // ];

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
    const deleteProduct = async (id) => {
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
    // Get All Men Items
    const menItems = async () => {
        // API Call:
        const response = await fetch(`${host}/api/adminproducts/menitems`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'admintoken': sessionStorage.getItem("token")
            }
        });
        const json = await response.json();
        // console.log(json); // This is for testing only.
        setproducts(json);
    }

    // Get All Casual Men Items
    const casualMen = async () => {
        // API Call:
        const response = await fetch(`${host}/api/adminproducts/casualmen`, {
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

    // Get All Formal Men Items
    const formalMen = async () => {
        // API Call:
        const response = await fetch(`${host}/api/adminproducts/formalmen`, {
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

    // Get All Ethnic Men Items
    const ethnicMen = async () => {
        // API Call:
        const response = await fetch(`${host}/api/adminproducts/ethnicmen`, {
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


    // Get All Women Items
    const womenItems = async () => {
        // API Call:
        const response = await fetch(`${host}/api/adminproducts/womenitems`, {
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

    // Get All Casual Women Items
    const casualWomen = async () => {
        // API Call:
        const response = await fetch(`${host}/api/adminproducts/casualwomen`, {
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

    // Get All Formal Women Items
    const formalWomen = async () => {
        // API Call:
        const response = await fetch(`${host}/api/adminproducts/formalwomen`, {
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

    // Get All Ethnic Women Items
    const ethnicWomen = async () => {
        // API Call:
        const response = await fetch(`${host}/api/adminproducts/ethnicwomen`, {
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

    // ---------------------------- Contexts for Operations on Carts at user side. -----------------------------
    const [carts, setcarts] = useState([]);

    let [id, setid] = useState();
    let [shoesize, setshoesize] = useState();

    const sizeFunc = (size) => {
        shoesize = size;
        console.log("ShoeSize: " + shoesize); // This is for testing only.
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

    // Add Order()
    const addOrder = async () => {
        // TODO: API Call
        // API Call:
        const response = await fetch(`${host}/api/userorder/addorder/${id}/${shoesize}`, {
            // const response = await fetch(`${host}/api/userorder/addorder/${id}/${shoesize}/${contact}/${address}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authtoken': sessionStorage.getItem("usertoken"),
            },
            body: JSON.stringify({ contact, address })
        });
        const order = await response.json();
        setorders(orders.concat(order));

        console.log("Added to orders.");
        console.log("Ordered Product ID: " + id);
        console.log("Ordered Shoe Size: " + shoesize);


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

    // // Edit Note()
    // const editCart = async (id, quantity) => {
    //     // API Call:
    //     const response = await fetch(`${host}/api/usercart/updatecart/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authtoken': sessionStorage.getItem("usertoken")
    //         },
    //         body: JSON.stringify({ quantity })
    //     });
    //     const json = response.json(); // This is for testing only.
    //     console.log("Edit Cart: " + json);

    //     let newCarts = JSON.parse(JSON.stringify(carts));

    //     // Logic to edit in client.
    //     for (let i = 0; i < newCarts.length; i++) {
    //         const element = newCarts[i];
    //         if (element._id === id) {
    //             element.quantity = quantity;
    //             break;
    //         }
    //     }
    //     setcarts(newCarts);
    // }

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

    return (
        <ProductContext.Provider value={{
            products, addProduct, deleteProduct, editProduct, getProducts,
            menItems, casualMen, formalMen, ethnicMen, womenItems, casualWomen, formalWomen, ethnicWomen,
            carts, addCart, deleteCart, editCart, getCart,
            alert, showAlert,
            id, setid, sizeFunc,
            getUser, userinfo, setContactFunc, setAddressFunc,
            orders, addOrder, cancelOrder, getOrder, custOrders, orderUpdate,

        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default CartState;