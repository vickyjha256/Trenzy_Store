import React, { useContext, useState } from 'react'
import ProductContext from '../../Context/Products/ProductContext';

const AddProducts = (props) => {
    const context = useContext(ProductContext);
    const { addProduct } = context;

    const [product, setproduct] = useState({ image: "", brand: "", description: "", type: "Casual", gender: "Male", price: "", availability: "In Stock" });

    const onChange = (e) => {
        setproduct({ ...product, [e.target.name]: e.target.value });
    }

    const handleClick = (e) => {
        e.preventDefault();
        addProduct(product.image, product.brand, product.description, product.type, product.gender, product.price, product.availability);
        setproduct({ image: "", brand: "", description: "", type: "Casual", gender: "Male", price: "", availability: "In Stock" });
        // props.showAlert("Product Added successfully.", "success");
    }

    // console.log("Product Type: " + product.type); // This is for testing only.
    // console.log("Product Gender: " + product.gender); // This is for testing only.
    // console.log("Product Availability: " + product.availability); // This is for testing only.

    return (
        <>
            <div style={{ backgroundColor: "whitesmoke" }} className='container'>
                <h1>Add Products in Database</h1>
                <form className=''>
                    <div className="form-floating mb-3">
                        <input style={{ color: "black" }} type="text" required className="form-control" value={product.image} onChange={onChange} id="image" name='image' placeholder="name@example.com" />
                        <label htmlFor="image">Image</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input style={{ color: "black" }} type="text" required className="form-control" value={product.brand} onChange={onChange} id="brand" name='brand' placeholder='brand' />
                        <label htmlFor="brand">Brand</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input style={{ color: "black" }} type="text" required className="form-control" value={product.description} onChange={onChange} id="description" name='description' placeholder='description' />
                        <label htmlFor="description">Description</label>
                    </div>

                    <br />
                    <h6>Choose footwear type:</h6>
                    <div className="form-floating mb-3">
                        <select id='type' name='type' value={product.type} onChange={onChange} className="form-select" aria-label="Default select example">
                            <option value="Casual">Casual</option>
                            <option value="Formal">Formal</option>
                            <option value="Ethnic">Ethnic</option>
                        </select>
                    </div>

                    <br />
                    <h6>Gender:</h6>
                    <div className="form-floating mb-3">
                        <select id='gender' name='gender' value={product.gender} onChange={onChange} className="form-select" aria-label="Default select example">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <br />
                    <h6>Price:</h6>
                    <div className="form-floating mb-3">
                        <input style={{ color: "black" }} type="number" className="form-control" value={product.price} onChange={onChange} id="price" name='price' placeholder='' />
                        <label htmlFor="price">Price</label>
                    </div>

                    <br />
                    <h6>Availability &#40;Stock&#41;:</h6>
                    <div className="form-floating mb-3">
                        <select id='availability' name='availability' value={product.availability} onChange={onChange} className="form-select" aria-label="Default select example">
                            <option value="In Stock">In Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>

                    <button style={{ width: "100%", backgroundColor: "blue" }} type="submit" onClick={handleClick} className="btn btn-primary my-1"><b>Add product</b></button>
                </form >
            </div>
        </>
    )
}

export default AddProducts;