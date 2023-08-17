import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ProductContext from '../../Context/Products/ProductContext';

const Navbar = (props) => {
    const context = useContext(ProductContext);
    const { carts, getCart, getUser, userinfo, searchItems, query, setquery } = context;

    let location = useLocation();
    let redirect = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("usertoken")) {
            // navigate("/admindashboard");
            // navigate("/carts");
            getCart();
            getUser();
        }
    }, []);

    let total_Cart_Items = carts.length;
    console.log("Total Cart Items: " + total_Cart_Items);
    // console.log("Cart Length: " + carts.length);

    const handleLogin = (e) => {
        redirect("/login");
    }

    const handleLogout = () => {
        sessionStorage.removeItem("usertoken");
        // sessionStorage.clear();
        props.showAlert("Account logged out successfully.", "success");
        redirect("/login");
    }

    // console.log("Query: " + query); // This is for testing only.

    // const handleSearch = (e) => {
    //     searchItems(query);
    //     redirect(`/search`);
    // }

    return (
        <>
            <div className="">
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid d-flex justify-content-around">
                        <Link style={{ color: `${location.pathname === "/" ? "aqua" : "white"}`, fontWeight: "bolder" }} className="navbar-brand" to="/"><b> Trendz </b></Link>

                        <div className='d-flex justify-content-center'>

                            {/* ----------------------------------------- Navbar Code -------------------------------------- */}
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <div className='d-flex justify-content-center'>
                                    <Link style={{ color: `${location.pathname === "/" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                                    <Link style={{ color: `${location.pathname === "/men" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/men" ? "active" : ""}`} aria-current="page" to="/men">Men</Link>
                                    <Link style={{ color: `${location.pathname === "/women" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/women" ? "active" : ""}`} aria-current="page" to="/women">Women</Link>
                                    {/* <Link style={{ color: `${location.pathname === "/orders" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/orders" ? "active" : ""}`} aria-current="page" to="/orders">Orders</Link> */}
                                </div>

                                <div className='d-flex justify-content-center me-5'>
                                    <div className="searchBarDiv">
                                        {query.length === 0 ? <> <i className="fa-solid searchIcon fa-magnifying-glass"></i> </> : ""}
                                        <input id='searchbar' onChange={(e) => {
                                            // e.target.value;
                                            e.preventDefault();
                                            setquery(e.target.value);
                                            searchItems(query);
                                            redirect(`/search`);
                                        }} className="form-control" type="search" placeholder="  Search for products" aria-label="Search" />
                                    </div>
                                    {/* <button onClick={handleSearch} className="btn btn-outline-info" type="submit">Search</button> */}
                                </div>

                                <div className='d-flex justify-content-center ms-5'>
                                    {sessionStorage.getItem("usertoken") ? <>
                                        {/* <Link style={{ backgroundColor: "black" }} className="btn btn-primary mx-3" to="/changepassword" role="button">Change Password</Link>
                                        <button onClick={handleLogout} className="btn btn-danger"> Log Out</button> */}

                                        <div className="dropdown">
                                            <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-user"></i> {userinfo.name}
                                            </button>
                                            <ul className="dropdown-menu bg-dark">
                                                {/* <li><Link className="dropdown-item" to="/">Something else here</Link></li> */}
                                                <li><Link style={{ backgroundColor: "darkblue", fontSize: "9pt", width: "100%" }} className={`btn btn-primary`} aria-current="page" to="/orders">My Orders</Link></li>
                                                <li><Link style={{ backgroundColor: "black", fontSize: "9pt", width: "100%" }} className="btn btn-primary my-2" to="/changepassword" role="button">Change Password</Link></li>
                                                <li><Link style={{ backgroundColor: "red", fontSize: "9pt", width: "100%" }} onClick={handleLogout} className="btn btn-primary"> Log Out</Link></li>

                                                {/* <li><button style={{fontSize: "9pt"}} onClick={handleLogout} className="btn btn-danger"> Log Out</button></li> */}
                                            </ul>
                                        </div>
                                    </> : <form className="d-flex">
                                        <button type="button" onClick={handleLogin} className={`btn ${location.pathname === "/login" ? "btn-outline-info" : "btn-outline-light"} mx-2`}>Login</button>
                                    </form>}
                                </div>
                            </div>



                            {/* This is Cart ICON and Navbar Toggler Code which is Outside the collapse */}
                            <Link id='carticon' className='btn btn-lg btn-block mx-3 my-1 position-relative' to='/carts' >
                                <span className="position-absolute top-0 start-100 translate-middle p-0 rounded-circle" id='cartbadge'>
                                    {sessionStorage.getItem('usertoken') ? <>
                                        {total_Cart_Items}</> : "0"}
                                    <span className="visually-hidden">New alerts</span>
                                </span>
                            </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" aria-expanded="false" aria-label="Toggle navigation">
                                <span className='navbar-toggler-icon'></span>
                            </button>




                            {/* ----------------------------------- OFFCanvas Menu Code ----------------------------------- */}
                            <div className="offcanvas offcanvas-start bg-dark" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                                <div className="offcanvas-header">
                                    <Link style={{ color: `${location.pathname === "/" ? "aqua" : "white"}`, fontWeight: "bolder" }} className="navbar-brand" to="/"><b> Trendz </b></Link>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>

                                <div className="offcanvas-body">
                                    {sessionStorage.getItem('usertoken') ?
                                        <Link disabled style={{ color: "aqua", border: "px solid darkblue", width: "100%" }} className='btn mb-3' data-bs-dismiss="offcanvas" aria-current="page" to='/'> <Link disabled style={{ color: "aqua", border: "2px solid aqua", borderRadius: "20px", marginRight: "62pt" }} className='btn' data-bs-dismiss="offcanvas" aria-current="page" to='/'><i style={{ color: "aqua" }} className="fa-solid fa-user"></i></Link>{userinfo.name}</Link>
                                        :
                                        <Link style={{ color: "aqua", border: "2px solid aqua", borderRadius: "20px" }} className='btn ms-2 mb-3' data-bs-dismiss="offcanvas" aria-current="page" to='/login'><i style={{ color: "aqua" }} className="fa-solid fa-user"></i></Link>
                                    }
                                    <div className='d-flex justify-content-center mb-5'>
                                        <div className="searchBarDiv">
                                            {query.length === 0 ? <> <i className="fa-solid searchIcon fa-magnifying-glass"></i> </> : ""}
                                            <input id='searchbar' onChange={(e) => {
                                                // e.target.value;
                                                setquery(e.target.value);
                                                searchItems(query);
                                                redirect(`/search`);
                                            }} className="form-control" type="search" placeholder="  Search for products" aria-label="Search" />
                                        </div>
                                        {/* <button onClick={handleSearch} className="btn btn-outline-info" type="submit">Search</button> */}
                                    </div>

                                    {/* <div className='d-flex justify-content-center'> */}
                                    <Link style={{ color: `${location.pathname === "/" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/" ? "active" : ""}`} data-bs-dismiss="offcanvas" aria-current="page" to="/">Home</Link>
                                    <Link style={{ color: `${location.pathname === "/men" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/men" ? "active" : ""}`} data-bs-dismiss="offcanvas" aria-current="page" to="/men">Men</Link>
                                    <Link style={{ color: `${location.pathname === "/women" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/women" ? "active" : ""}`} data-bs-dismiss="offcanvas" aria-current="page" to="/women">Women</Link>
                                    {sessionStorage.getItem('usertoken') ? <Link style={{ color: `${location.pathname === "/orders" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/orders" ? "active" : ""}`} data-bs-dismiss="offcanvas" aria-current="page" to="/orders">My Orders</Link>
                                        : <></>}
                                    {/* </div> */}

                                    {/* <div className='d-flex justify-content-center my-4'> */}
                                    {/* <div className="searchBarDiv">
                                            <i className="fa-solid searchIcon fa-magnifying-glass"></i>
                                            <input id='searchbar' onChange={(e) => {
                                                // e.target.value;
                                                setquery(e.target.value);
                                                searchItems(query);
                                                redirect(`/search`);
                                            }} className="form-control" type="search" placeholder="  Search for products" aria-label="Search" />
                                        </div> */}
                                    {/* <button onClick={handleSearch} className="btn btn-outline-info" type="submit">Search</button> */}
                                    {/* </div> */}

                                    <div className='d-flex justify-content-center my-2'>
                                        {sessionStorage.getItem("usertoken") ? <>
                                            <Link style={{ backgroundColor: "black", width: "100%" }} className="btn btn-primary" to="/changepassword" role="button">Change Password</Link>
                                        </> : <form className="d-flex">
                                        </form>}
                                    </div>

                                    <div className='d-flex justify-content-start'>
                                        {sessionStorage.getItem("usertoken") ? <>
                                            <button style={{ backgroundColor: "red", width: "100%" }} onClick={handleLogout} className="btn btn-primary"> Log Out</button>
                                        </> : <form style={{ width: "100%" }} className="d-flex">
                                        </form>}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </nav >

            </div >

        </>
    )
}

export default Navbar;