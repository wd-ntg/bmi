import React from 'react'

import Navbar from '../components/Navbar'
import BlogContent from '../components/BlogContent'
import BlogMain from '../components/BlogMain'
import Footer from '../components/Footer'

function Blog() {
  return (
    <div>
      <Navbar/>
      <BlogContent/>
      <BlogMain/>
      <Footer/>
    </div>
  )
}

export default Blog