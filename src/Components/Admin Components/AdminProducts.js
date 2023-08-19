import React, { useContext, useEffect, useRef, useState } from 'react'
import ProductItems from './ProductItems';
import ProductContext from '../../Context/Products/ProductContext';
import { useNavigate } from 'react-router-dom';

const AdminProducts = (props) => {
  const context = useContext(ProductContext);
  const { products, editProduct, getProducts } = context;

  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      // navigate("/admindashboard");
      getProducts();
    }
    else {
      navigate("/adminlogin");
    }

    // eslint-disable-next-line
  }, [])

  let total_Items = 0;

  const ref = useRef(null)
  const refClose = useRef(null)
  const [product, setproduct] = useState({ id: "", uimage: "", ubrand: "", udescription: "", utype: "", ugender: "", uprice: "", uavailability: "" });

  const onChange = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  }

  const updateProduct = (currentproduct) => {
    ref.current.click();
    setproduct({ id: currentproduct._id, uimage: currentproduct.image, ubrand: currentproduct.brand, udescription: currentproduct.description, utype: currentproduct.type, ugender: currentproduct.gender, uprice: currentproduct.price, uavailability: currentproduct.availability });
  }

  const handleClick = (e) => {
    console.log("Updating Products: " + product);
    e.preventDefault();
    editProduct(product.id, product.uimage, product.ubrand, product.udescription, product.utype, product.ugender, product.uprice, product.uavailability);
    refClose.current.click();
    // props.showAlert("Product updated successfully", "success");
  }

  return (
    <>
      <div style={{ backgroundColor: "whitesmoke" }} className='container'>

        {/* <AddProducts showAlert={props.showAlert} /> */}
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-floating mb-3">
                    <input style={{ color: "black" }} type="text" required className="form-control" value={product.uimage} onChange={onChange} id="uimage" name='uimage' placeholder="name@example.com" />
                    <label htmlFor="image">Image</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input style={{ color: "black" }} type="text" required className="form-control" value={product.ubrand} onChange={onChange} id="ubrand" name='ubrand' placeholder='brand' />
                    <label htmlFor="brand">Brand</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input style={{ color: "black" }} type="text" required className="form-control" value={product.udescription} onChange={onChange} id="udescription" name='udescription' placeholder='description' />
                    <label htmlFor="description">Description</label>
                  </div>

                  <br />
                  <h6>Choose footwear type:</h6>
                  <div className="form-floating mb-3">
                    <select name='utype' value={product.utype} onChange={onChange} required className="form-select" aria-label="Default select example">
                      <option value="Casual">Casual</option>
                      <option value="Formal">Formal</option>
                      <option value="Ethnic">Ethnic</option>
                    </select>
                  </div>

                  <br />
                  <h6>Gender:</h6>
                  <div className="form-floating mb-3">
                    <select name='ugender' value={product.ugender} onChange={onChange} className="form-select" aria-label="Default select example">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>

                  </div>

                  <br />
                  <h6>Price:</h6>
                  <div className="form-floating mb-3">
                    <input style={{ color: "black" }} type="number" required className="form-control" value={product.uprice} onChange={onChange} id="uprice" name='uprice' placeholder='' />
                    <label htmlFor="price">Price</label>
                  </div>

                  <br />
                  <h6>Availability &#40;Stock&#41;:</h6>
                  <div className="form-floating mb-3">
                    <select name='uavailability' value={product.uavailability} onChange={onChange} className="form-select" aria-label="Default select example">
                      <option value="In Stock">In Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>

                  {/* <button style={{ width: "100%", backgroundColor: "blue" }} type="submit" className="btn btn-primary my-1"><b>Add product</b></button> */}
                </form >
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button onClick={handleClick} type="button" className="btn btn-primary">Update product</button>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          {products.map(
            (product) => {
              total_Items = total_Items + 1;
              return <ProductItems key={product._id} item={product} updateProduct={updateProduct} showAlert={props.showAlert} />
            }
          )}
        </div>
      </div>
    </>
  )
}

export default AdminProducts;