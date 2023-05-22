import React from 'react'
import { Link } from 'react-router-dom'

const Collection = () => {
    return (
        <>
            <div className='container-fluid my-2'>
                <div className='row'>
                    <div align="center" className='col-xxl-6 col-6'>
                        {/* <img className='btn' id='boximg' src='Carousel Images/men.jpg' alt='' /> */}
                        <Link to='/men'> <img className='btn' id='boximg' src='Carousel Images/men.jpg' alt='' /> </Link>
                    </div>
                    <div className='col-xxl-6 col-6'>
                        {/* <img className='btn' id='boximg' src='Carousel Images/women.jpg' alt='' /> */}
                        <Link to='/women'> <img className='btn' id='boximg' src='Carousel Images/women.jpg' alt='' /> </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Collection