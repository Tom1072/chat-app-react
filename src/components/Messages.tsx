import React from 'react'

export interface Message {
  name: string
  message: string
}

interface MessagesProps {
  messages: Message[]
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <ul className='list-group list-group-flush'>
      {messages.map((message, index) => (
        <li className='list-group-item'> {message.name} says: {message.message}</li>
      ))}
    </ul>
  )
}

export default Messages