import React from 'react'

const Spinner = (props) => {
    return (
        <>
            <div style={{ marginTop: "200px" }} className="d-flex justify-content-center">
                <div style={{ color: "aqua", height: "120px", width: "120px" }} className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Spinner;