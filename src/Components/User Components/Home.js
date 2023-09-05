import { React } from 'react'
import Carousel from './Carousel';
import Collection from './Collection';
import Footer from './Footer';

const Home = (props) => {
  props.setprogress(30);
  props.setprogress(60);
  props.setprogress(100);
  return (
    <>
      <Carousel setprogress={props.setprogress} />
      <Collection setprogress={props.setprogress} />
      <Footer setprogress={props.setprogress} />
    </>
  )
}

export default Home;