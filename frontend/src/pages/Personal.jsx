import React, { useContext } from 'react'

import { AuthContext } from '../contexts/authContext';

import Navbar from "../components/Navbar";
import BMIPerson from '../components/BMIPerson';
import Footer from '../components/Footer';


function Personal() {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className=''>
      <Navbar/>
      <BMIPerson currentUser={currentUser}/>
      <Footer/>
    </div>
  )
}

export default Personal