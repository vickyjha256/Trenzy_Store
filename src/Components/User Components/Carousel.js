import React from 'react'

const Carousel = () => {
    return (
        <>
            <div className=''>
                <div id="carouselExampleIndicators" className="carousel slide cardiv" data-bs-interval="1800" data-bs-ride="true">
                    <div className="carousel-indicators">
                        <button id='indic' type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button id='indic' type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button id='indic' type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button id='indic' type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        <button id='indic' type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
                        <button id='indic' type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 6"></button>
                    </div>
                    {/* <div style={{margin: 0, padding: 0}} className='row'> */}
                    {/* <div style={{margin: 0, padding: 0}} className='col-xxl-6 col-8'> */}
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="Carousel Images/sports.jpg" id='carsz' className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="Carousel Images/mb.jpg" id='carsz' className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="Carousel Images/wb.jpg" id='carsz' className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="Carousel Images/sneakers.jpg" id='carsz' className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="Carousel Images/we.jpg" id='carsz' className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="Carousel Images/me.jpg" id='carsz' className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    {/* </div> */}
                    {/* <div style={{ backgroundColor: "black", margin: 0, padding: 0 }} className='col-xxl-6 col-4'>
                                <h1>This is second div</h1>
                            </div> */}
                    {/* </div> */}


                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        {/* <span className="carousel-control-prev-icon" aria-hidden="true"></span> */}
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        {/* <span className="carousel-control-next-icon" aria-hidden="true"></span> */}
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    )
}
export default Carousel;