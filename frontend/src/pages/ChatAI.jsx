import React, {useContext} from 'react'

import Navbar from '../components/Navbar'

import ChatAIContent from '../components/ChatAIContent'
import Chats from '../components/Chats'
import Footer from '../components/Footer'

import { AuthContext } from '../contexts/authContext'

function ChatAI() {

  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <Navbar/>
      <ChatAIContent/>
      <Chats currentUser={currentUser}/>
      <Footer/>
    </div>
  )
}

export default ChatAI