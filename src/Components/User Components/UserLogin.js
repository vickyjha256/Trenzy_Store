import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserLogin = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch("https://notes-backend-render.onrender.com/api/auth/login", {
        const response = await fetch("http://localhost:5000/api/userauth/login", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        // console.log(json); // This is for testing only.
        if (json.success) {
            // Save the auth token and redirect.
            sessionStorage.setItem('usertoken', json.authtoken); // We use sessionStorage because it destroys data after ending session.
            // history.push("/"); // Since, useHistory() is replaced with useNavigate so we have to use navigate() instead of push().
            props.showAlert("Logged in Successfully.", "success");
            navigate("/");
        }
        else {
            props.showAlert("Invalid email or password !!", "danger");
            // alert("Invalid email or password !!");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    
    // const btmove = (e) => {
    //     let movingBtn = document.getElementById("outdiv");
    //     if (credentials.email || credentials.password === "") {
    //         if (movingBtn.className === "d-flex justify-content-start") {
    //             movingBtn.className = Math.floor(Math.random() * 12) > 6 ? "d-flex justify-content-center" : "d-flex justify-content-end"
    //         } else if (movingBtn.className === "d-flex justify-content-center") {
    //             movingBtn.className = Math.floor(Math.random() * 12) > 6 ? "d-flex justify-content-start" : "d-flex justify-content-end"
    //         } else if (movingBtn.className === "d-flex justify-content-end") {
    //             movingBtn.className = Math.floor(Math.random() * 12) > 6 ? "d-flex justify-content-start" : "d-flex justify-content-center"
    //         }
    //     }
    //     else {
    //         movingBtn.className = "d-flex justify-content-center";
    //     }
    // }

    return (
        <>
            {/* <div className="container"> */}
            <div id='modalbox' className="modal('show')">
                <div className="modal-dialog modal-dialog-centered" >
                    {/* <div style={{ backgroundColor: "aqua" }} className="modal-content"> */}
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Login to your account</b></h5>
                        </div>
                        <div className="modal-body">
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input style={{ color: "white" }} type="email" required className="form-control bg-dark" value={credentials.email} onChange={onChange} id="email" name='email' placeholder="name@example.com" />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input style={{ color: "white" }} type="password" required className="form-control bg-dark" value={credentials.password} onChange={onChange} id="password" name='password' placeholder='Password' />
                                        <label htmlFor="password">Password</label>
                                    </div>

                                    <button style={{ width: "100%", backgroundColor: "blue" }} type="submit" className="btn btn-primary my-1"><b>Login</b></button>

                                    {/* <div id='outdiv' className='d-flex justify-content-center'>
                                        <div style={{ width: "30%" }} id='indiv' onMouseOver={(credentials.email || credentials.password) === "" ? btmove : ""}>
                                            <button disabled={credentials.email === "" || credentials.password === ""} style={{ width: "100%", backgroundColor: "blue" }} type="submit" className="btn btn-primary my-1"><b>Login</b></button>
                                        </div>
                                    </div> */}

                                    <h6 id="sepline">OR</h6>

                                    <div align="center">
                                        <div>
                                            <Link style={{ color: "#2baffa", textDecoration: "none" }} to='/forgotpassword'>Forgotten Password?</Link>
                                        </div>
                                        <div>
                                            Don't have an account? <Link style={{ color: "#2baffa", textDecoration: "none", fontWeight: "bold" }} id="newaccount" to='/register'>Sign Up</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div > */}
        </>
    )
}

export default UserLogin;