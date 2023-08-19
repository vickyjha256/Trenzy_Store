import React, { useState } from 'react'

const ChangePassword = (props) => {
    const [credentials, setCredentials] = useState({ currentpassword: "", newpassword: "", conpassword: "" });

    const { currentpassword, newpassword, conpassword } = credentials;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newpassword !== conpassword) {
            props.showAlert("Passwords are not equal ⚠", "danger");
        }
        else {
            const response = await fetch("http://localhost:5000/api/userauth/changepassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': sessionStorage.getItem("usertoken")
                },
                body: JSON.stringify({ currentpassword, newpassword })
            });
            const json = await response.json()
            console.log(json); // This is for testing only.
            if (json.success) {
                props.showAlert("Password changed successfully.", "success");
                document.getElementById("cpbtn").click();
                setCredentials({ currentpassword: "", newpassword: "", conpassword: "" });
                // navigate("/");
            }
            else {
                props.showAlert("Current password is incorrect !!", "danger");
                // document.getElementById("cpbtn").click();
            }

        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div>
                <button hidden id='cpbtn' type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cpmodal">
                    Launch
                </button>

                <div className="modal fade" id="cpmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"><b> Change Password </b></h5>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-floating mb-3">
                                            <input style={{ color: "white" }} type="password" required minLength={5} className="form-control bg-dark" value={credentials.currentpassword} onChange={onChange} id="currentpassword" name='currentpassword' placeholder='Password' />
                                            <label htmlFor="password">Current Password</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input style={{ color: "white" }} type="password" required minLength={5} className="form-control bg-dark" value={credentials.newpassword} onChange={onChange} id="newpassword" name='newpassword' placeholder='Password' />
                                            <label htmlFor="password">New Password</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input style={{ color: "white" }} type="password" required minLength={5} className="form-control bg-dark" value={credentials.conpassword} onChange={onChange} id="conpassword" name='conpassword' placeholder='Password' />
                                            <label htmlFor="password">Confirm New Password</label>
                                        </div>
                                        <button style={{ width: "100%", backgroundColor: 'lime', color: 'black' }} type="submit" className="btn btn-primary"><b>Submit</b></button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;