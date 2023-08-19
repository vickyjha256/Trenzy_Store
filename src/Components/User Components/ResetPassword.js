import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductContext from '../../Context/Products/ProductContext';

const ResetPassword = (props) => {
    const context = useContext(ProductContext);
    const { settoggleRP } = context;
    const [credentials, setCredentials] = useState({ newpassword: "", conpassword: "" });


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate();

    const { newpassword, conpassword } = credentials;
    const handleReset = async (e) => {
        e.preventDefault();

        if (newpassword !== conpassword) {
            props.showAlert("Passwords are not equal ⚠", "danger");
        } else {
            const response = await fetch("http://localhost:5000/api/userauth/resetpassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newpassword: credentials.newpassword })
            });
            const json = await response.json();
            if (json.success) {
                props.showAlert("Password resetted successfully, Please login.", "success");
                settoggleRP(false);
                navigate('/login');
            }
            else {
                props.showAlert("Unauthorized action performed 😠😠 !!", "warning");
            }
        }



        // console.log("Password Resetted Successfully.");
        // settoggleRP(false);
        // navigate('/login');
    }

    return (
        <>
            <div style={{ paddingTop: "120px" }} className="modal('show')">
                <div className="modal-dialog modal-dialog-centered" >
                    {/* <div style={{ backgroundColor: "aqua" }} className="modal-content"> */}
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 align="center" className="modal-title"><b> Reset Password </b></h5>
                        </div>
                        <div className="modal-body">
                            <div>
                                <form onSubmit={handleReset}>
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
        </>
    )
}

export default ResetPassword;