import React, { useContext, useState } from 'react'
import OTPinput from './OTPinput';
import ProductContext from '../../Context/Products/ProductContext';
import ResetPassword from './ResetPassword';

const ForgotPassword = (props) => {
  const context = useContext(ProductContext);
  const { otpBoxToggle, setotpBoxToggle, toggleRP, settoggleRP } = context;

  const [credentials, setcredentials] = useState({ email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const response = await fetch("http://localhost:5000/api/userauth/forgotpassword", {
    const response = await fetch("https://trenzy-backend.onrender.com/api/userauth/forgotpassword", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email })
    });
    const json = await response.json();
    if (json.sent) {
      props.showAlert("OTP sent successfully.", "success");
      setotpBoxToggle(true);
    }
    else {
      props.showAlert("Email doesn't exist !!", "danger");
    }
  }

  const onChange = (e) => {
    e.preventDefault();
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <>
      {!toggleRP ?
        <>
          <div style={{ paddingTop: "120px" }} className="modal('show')">
            <div className="modal-dialog modal-dialog-centered" >
              {/* <div style={{ backgroundColor: "aqua" }} className="modal-content"> */}
              <div className="modal-content">
                <div className="modal-header">
                  <h5 align="center" className="modal-title"><b> Forgot Password </b></h5>
                </div>
                <div className="modal-body">
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="form-floating mb-3">
                        <input style={{ color: "white" }} type="email" required className="form-control bg-dark" value={credentials.email} onChange={onChange} id="email" name='email' placeholder="name@example.com" />
                        <label htmlFor="email">Email</label>
                      </div>

                      {!otpBoxToggle ? <button style={{ width: "100%", backgroundColor: "blue" }} type='submit' className="btn btn-primary my-1"><b>Send OTP</b></button> : <></>}
                      {/* <button style={{ width: "100%", backgroundColor: "blue" }} type='submit' className="btn btn-primary my-1"><b>Send OTP</b></button> */}


                    </form>
                    {otpBoxToggle ? <OTPinput showAlert={props.showAlert} /> : <></>}
                    {/* <OTPinput showAlert={props.showAlert} /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        : <ResetPassword showAlert={props.showAlert} />
      }
    </>

  )
}

export default ForgotPassword