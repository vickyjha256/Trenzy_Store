import React from 'react'
import { Link } from 'react-router-dom'

const Footer = (props) => {
    return (
        <>
            <div id='footer' className='container-fluid'>
                <div>
                    <div className='row'>
                        <div id='footerStorename' align="center" className='col-xxl-6 col-6'>
                            <h3>Trenzy</h3>
                        </div>
                        <div align="center" className='col-xxl-3 col-3'>
                            <h5> Men Shoes </h5>
                            <ul className='list-unstyled'>
                                <li>
                                    <Link id='footerlinks' to="/casualmen">Casual</Link>
                                </li>
                                <li>
                                    <Link id='footerlinks' to="/formalmen">Formal</Link>
                                </li>
                                <li>
                                    <Link id='footerlinks' to="/ethnicmen">Ethnic</Link>
                                </li>
                            </ul>

                        </div>
                        <div align="center" className='col-xxl-3 col-3'>
                            <ul className='list-unstyled'>
                                <h5> Women Shoes </h5>
                                <li>
                                    <Link id='footerlinks' to="/casualwomen">Casual</Link>
                                </li>
                                <li>
                                    <Link id='footerlinks' to="/formalwomen">Formal</Link>
                                </li>
                                <li>
                                    <Link id='footerlinks' to="/ethnicwomen">Ethnic</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='row my-2'>
                    <h6>About Company</h6>
                    <p>
                        Online place for amazing styles of footwears. This is online portal that provides a good product and also our team available 24x7 for services. Your order issues will be solved ASAP.
                    </p>
                    <p> Support Emails - <a style={{ textDecoration: "none" }} href="mailto:help@trendz.com">help@trendz.com</a> </p>
                </div>
                <div id='footbar' className='row text-center fixed-bottom'>
                    <h6>Trendz - Redefine the style.</h6>
                </div>
            </div>
        </>
    )
}

export default Footer