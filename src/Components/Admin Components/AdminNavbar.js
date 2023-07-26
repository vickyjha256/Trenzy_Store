import { React } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const AdminNavbar = (props) => {
    let location = useLocation();
    let redirect = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        // sessionStorage.clear();
        props.showAlert("Account logged out successfully.", "success");
        redirect("/");
    }


    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    //                 <div className="container-fluid">
    //                     <Link style={{ color: `${location.pathname === "/admindashboard" ? "aqua" : "white"}`, fontWeight: "bolder" }} className="navbar-brand" to="/admindashboard"><b> Trendz - Admin </b></Link>
    //                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //                         <span className='navbar-toggler-icon'></span>
    //                     </button>
    //                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    // <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //     <li className="nav-item">
    //         <Link style={{ color: `${location.pathname === "/admindashboard" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/admindashboard" ? "active" : ""}`} aria-current="page" to="/admindashboard">Admin Dashboard</Link>
    //     </li>
    //     <li className="nav-item">
    //         <Link style={{ color: `${location.pathname === "/addproducts" ? "aqua" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/addproducts" ? "active" : ""}`} aria-current="page" to="/addproducts">Add Products</Link>
    //     </li>
    // </ul>
    //                         {sessionStorage.getItem("token") ? <>
    //                             <Link style={{ backgroundColor: "black" }} className="btn btn-primary mx-3" to="/changepassword" role="button">Change Password</Link>
    //                             {/* <button className="btn btn-primary"> Change Password</button> */}
    //                             <button onClick={handleLogout} className="btn btn-danger"> Log Out</button>
    //                         </> : <form className="d-flex">
    //                             {/* <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
    //                             <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link> */}
    //                         </form>}
    //                     </div>
    //                 </div>
    //             </nav>

    return (
        <>
            <div className="">
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link style={{ color: `${location.pathname === "/admindashboard" ? "white" : "white"}`, fontWeight: "bolder" }} className="navbar-brand" to="/admindashboard"><b> Trendz - Admin </b></Link>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse mx-4" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item mx-3">
                                    <Link style={{ color: `${location.pathname === "/admindashboard" ? "orange" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/admindashboard" ? "active" : ""}`} aria-current="page" to="/admindashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <Link style={{ color: `${location.pathname === "/addproducts" ? "orange" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/addproducts" ? "active" : ""}`} aria-current="page" to="/addproducts">Add Products</Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <Link style={{ color: `${location.pathname === "/adminProducts" ? "orange" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/adminProducts" ? "active" : ""}`} aria-current="page" to="/adminProducts">Products</Link>
                                </li>
                                <li className="nav-item mx-3">
                                    <Link style={{ color: `${location.pathname === "/ordermanagement" ? "orange" : "white"}`, fontWeight: "bolder" }} className={`nav-link ${location.pathname === "/ordermanagement" ? "active" : ""}`} aria-current="page" to="/ordermanagement">Orders</Link>
                                </li>
                            </ul>

                            {sessionStorage.getItem("token") ? <>
                                <Link style={{ backgroundColor: "black" }} className="btn btn-primary mx-3" to="/changepassword" role="button">Change Password</Link>
                                <button onClick={handleLogout} className="btn btn-danger"> Log Out</button>
                            </> : <form className="d-flex">
                                {/* <button type="button" onClick={handleLogin} className="btn btn-outline mx-2 loginbtn">Login</button> */}
                            </form>}
                        </div>
                    </div>
                </nav>
            </div>

        </>
    )
}

export default AdminNavbar;