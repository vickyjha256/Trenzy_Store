import { React } from 'react'
import Carousel from './Carousel';
import Collection from './Collection';
import Footer from './Footer';

const Home = (props) => {
  return (
    <>
      <Carousel />
      <Collection />
      <Footer />
    </>
  )
}

export default Home;