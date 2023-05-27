import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ProductContext from '../../Context/Products/ProductContext';

const Navbar = (props) => {
    let location = useLocation();
    let redirect = useNavigate();
    const handleLogin = (e) => {
        redirect("/login");
    }

    const handleLogout = () => {
        sessionStorage.removeItem("usertoken");
        // sessionStorage.clear();
        props.showAlert("Account logged out successfully.", "success");
        redirect("/login");
    }

    const context = useContext(ProductContext);
    const { carts } = context;

    let total_Cart_Items = carts.length;

    console.log("Total Cart Items: " + total_Cart_Items);
    // console.log("Cart Length: " + carts.length);

    return (
        <>
            <div className="">
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid d-flex justify-content-around">
                        <Link style={{ color: `${location.pathname === "/" ? "aqua" : "white"}`, fontWeight: "bolder" }} className="navbar-brand" to="/"><b> Trendz </b></Link>

                        <div className='d-flex justify-content-center'>
                            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" aria-expanded="false" aria-label="Toggle navigation">
                                <span className='navbar-toggler-icon'></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <div className='d-flex justify-content-center'>
                                    <Link style={{ color: `${location.pathname === "/" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                                    <Link style={{ color: `${location.pathname === "/men" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/men" ? "active" : ""}`} aria-current="page" to="/men">Men</Link>
                                    <Link style={{ color: `${location.pathname === "/women" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/women" ? "active" : ""}`} aria-current="page" to="/women">Women</Link>
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <Link id='carticon' className='btn btn-lg btn-block mx-3 my-1 position-relative' to='/carts' >
                                        <span className="position-absolute top-0 start-100 translate-middle p-0 rounded-circle" id='cartbadge'>
                                            {sessionStorage.getItem('usertoken') ? <>
                                                {total_Cart_Items}</> : "0"}
                                            <span className="visually-hidden">New alerts</span>
                                        </span>
                                    </Link>
                                    {/* <form className="d-flex"> */}
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                    {/* </form> */}
                                    {/* <button type="button" onClick={handleLogin} className="btn btn-outline mx-2 loginbtn">Login</button> */}
                                </div>

                                <div className='d-flex justify-content-center'>
                                    {sessionStorage.getItem("usertoken") ? <>
                                        <Link style={{ backgroundColor: "black" }} className="btn btn-primary mx-3" to="/changepassword" role="button">Change Password</Link>
                                        <button onClick={handleLogout} className="btn btn-danger"> Log Out</button>
                                    </> : <form className="d-flex">
                                        <button type="button" onClick={handleLogin} className="btn btn-outline mx-2 loginbtn">Login</button>
                                    </form>}
                                </div>
                            </div>
                            <div className="offcanvas offcanvas-start bg-dark" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                                <div className="offcanvas-header">
                                    {/* <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5> */}
                                    <Link style={{ color: `${location.pathname === "/" ? "aqua" : "white"}`, fontWeight: "bolder" }} className="navbar-brand" to="/"><b> Trendz </b></Link>

                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body">
                                    {/* <p style={{ color: "white" }}>Try scrolling the rest of the page to see this option in action.</p> */}

                                    {/* <div className='d-flex justify-content-center'> */}
                                    <Link style={{ color: `${location.pathname === "/" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/" ? "active" : ""}`} data-bs-dismiss="offcanvas" aria-current="page" to="/">Home</Link>
                                    <Link style={{ color: `${location.pathname === "/men" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/men" ? "active" : ""}`} data-bs-dismiss="offcanvas" aria-current="page" to="/men">Men</Link>
                                    <Link style={{ color: `${location.pathname === "/women" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/women" ? "active" : ""}`} data-bs-dismiss="offcanvas" aria-current="page" to="/women">Women</Link>
                                    {/* </div> */}

                                    <div className='d-flex justify-content-start'>
                                        <Link id='carticon' data-bs-dismiss="offcanvas" className='btn btn-lg btn-block mx-3 my-1 position-relative' to='/carts' >
                                            <span className="position-absolute top-0 start-100 translate-middle p-0 rounded-circle" id='cartbadge'>
                                                {sessionStorage.getItem('usertoken') ? <>
                                                    {total_Cart_Items}</> : "0"}
                                                <span className="visually-hidden">New alerts</span>
                                            </span>
                                        </Link>
                                        {sessionStorage.getItem("usertoken") ? <>
                                            <button style={{ width: "100%" }} onClick={handleLogout} className="btn btn-danger"> Log Out</button>
                                        </> : <form style={{ width: "100%" }} className="d-flex">
                                            <button style={{ width: "100%" }} type="button" onClick={handleLogin} data-bs-dismiss="offcanvas" className="btn btn-outline mx-2 loginbtn">Login</button>
                                        </form>}
                                        {/* <button type="button" onClick={handleLogin} data-bs-dismiss="offcanvas" className="btn btn-outline mx-2 loginbtn">Login</button> */}
                                    </div>

                                    <div className='d-flex justify-content-center my-2'>
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn btn-outline-success" data-bs-dismiss="offcanvas" type="submit">Search</button>
                                    </div>

                                    <div className='d-flex justify-content-center my-2'>
                                        {sessionStorage.getItem("usertoken") ? <>
                                            <Link style={{ backgroundColor: "black", width: "100%" }} className="btn btn-primary" to="/changepassword" role="button">Change Password</Link>
                                            {/* <button className="btn btn-primary"> Change Password</button> */}
                                            {/* <button onClick={handleLogout} className="btn btn-danger"> Log Out</button> */}
                                        </> : <form className="d-flex">
                                            {/* <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                                <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link> */}
                                        </form>}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </nav>

            </div >

        </>
    )
}

export default Navbar;