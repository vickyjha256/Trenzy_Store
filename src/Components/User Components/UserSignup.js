import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const UserSignup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", conpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, conpassword } = credentials;
        if (password !== conpassword) {
            props.showAlert("Passwords are not equal ⚠", "danger");
            // alert("Passwords are not equal ⚠");
        }
        else {
            // const response = await fetch("http://localhost:5000/api/userauth/registerUser", {
            // const response = await fetch("https://trenzy-backend.onrender.com/api/userauth/registerUser", {
            const response = await fetch("https://trenzybackend1.cyclic.cloud/api/userauth/registerUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json()
            console.log(json); // This is for testing only.
            if (json.success) {
                // Save the auth token and redirect.
                sessionStorage.setItem('usertoken', json.authtoken); // We use sessionStorage because it destroys data after ending session.
                props.showAlert("Account Created Successfully.", "success");
                // navigate("/");
                // const response2 = await fetch("http://localhost:5000/api/userauth/login", {
                // const response2 = await fetch("https://trenzy-backend.onrender.com/api/userauth/login", {
                const response2 = await fetch("https://trenzybackend1.cyclic.cloud/api/userauth/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                // Here, after Succesfully creating the user we logged in the user using signup credentials.
                const json2 = await response2.json()
                console.log(json2); // This is for testing only.
                if (json2.success) {
                    // Save the auth token and redirect.
                    sessionStorage.setItem('usertoken', json2.authtoken);
                    // history.push("/"); // Since, useHistory() is replaced with useNavigate so we have to use navigate() instead of push().
                    // props.showAlert("Logged in Successfully.", "success");
                    navigate("/");
                    window.location.reload(true);
                }
            }
            else {
                // props.showAlert("Sorry, user is already exists with this email !!", "danger");
                alert("Sorry, user is already exists with this email !!");
            }
        }
    }

    props.setprogress(30);
    props.setprogress(60);
    props.setprogress(100);


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="modal('show')">
                <div className="modal-dialog modal-dialog-centered" >
                    {/* <div style={{ backgroundColor: "aqua" }} className="modal-content"> */}
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Create new account</b></h5>
                        </div>
                        <div className="modal-body">
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input style={{ color: "white" }} type="text" required className="form-control bg-dark" value={credentials.name} onChange={onChange} id="name" name='name' minLength={3} placeholder="name@example.com" />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input style={{ color: "white" }} type="email" required className="form-control bg-dark" value={credentials.email} onChange={onChange} id="email" name='email' placeholder="name@example.com" />
                                        <label htmlFor="email">Email</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input style={{ color: "white" }} type="password" required className="form-control bg-dark" value={credentials.password} onChange={onChange} id="password" name='password' minLength={5} placeholder='Password' />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input style={{ color: "white" }} type="password" required className="form-control bg-dark" value={credentials.conpassword} onChange={onChange} id="conpassword" name='conpassword' minLength={5} placeholder='Password' />
                                        <label htmlFor="conpassword">Confirm Password</label>
                                    </div>

                                    <button style={{ width: "100%", backgroundColor: "#042459" }} type="submit" className="btn btn-primary"><b>Sign in</b></button>

                                    <h6 id="sepline">OR</h6>

                                    <div align="center">
                                        <div>
                                            Already have an account? <Link style={{ color: "#aaf3ff", textDecoration: "none", fontWeight: "bold" }} id="newaccount" to='/login'>Login</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSignup;