import React from 'react'
import Navbar from '../componets/Navbar'
import Banner from '../componets/Banner'
import Certification from '../componets/Certification'
import HomeDoctors from '../componets/HomeDoctors'
import Testimonial from '../componets/Testimonial'
import Footer from '../componets/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Banner />
        <Certification />
        <HomeDoctors />
        <Testimonial />
        <Footer />
    </div>
  )
}

export default Home