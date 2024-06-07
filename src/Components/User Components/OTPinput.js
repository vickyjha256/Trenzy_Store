import React, { useContext, useState } from 'react'
import OTPInput, { ResendOTP } from "otp-input-react";
import ProductContext from '../../Context/Products/ProductContext';
import ResetPassword from './ResetPassword';

const OTPinput = (props) => {
    const context = useContext(ProductContext);
    const { setotpBoxToggle, toggleRP, settoggleRP } = context;

    const [OTP, setOTP] = useState(null);

    const style = {
        borderColor: "blue",
        width: "100%",
        height: "40px",
        marginTop: "20px",
        marginBottom: "20px",
    }

    const handleClick = async (e) => {
        e.preventDefault();

        // const response = await fetch("http://localhost:5000/api/userauth/otpverify", {
        const response = await fetch("https://trenzy-backend.onrender.com/api/userauth/otpverify", {
        // const response = await fetch("https://trenzybackend1.cyclic.cloud/api/userauth/otpverify", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ otp: OTP })
        });
        const json = await response.json()
        if (json.verified) {
            props.showAlert("OTP verified ✔ successfully.", "success");
            setotpBoxToggle(false);
            settoggleRP(true);
        }
        else {
            props.showAlert("Please enter correct OTP !!", "danger");
        }


        // setotpBoxToggle(false);
        // settoggleRP(true);
        // console.log("OTP: " + OTP);
        // console.log("OTP Verified.");
    }

    return (
        <>
            {!toggleRP ?
                <>
                    <div className='container'>
                        <form onSubmit={handleClick}>
                            <OTPInput value={OTP} className="d-flex justify-content-center" inputStyles={style} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />
                            {/* <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}

                            {/* <button style={{ width: "100%", backgroundColor: "blue" }} onClick={handleClick} className="btn btn-primary my-1"><b>Verify</b></button> */}
                            <button style={{ width: "100%", backgroundColor: "blue" }} type='submit' className="btn btn-primary my-1"><b>Verify</b></button>
                        </form>
                    </div>
                </>
                : <ResetPassword showAlert={props.showAlert} />
            }
        </>
    )
}

export default OTPinput;