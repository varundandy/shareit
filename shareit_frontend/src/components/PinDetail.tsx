import React, { ReactNode, useContext } from 'react'
import { User } from '../types/interface'
import UserContext from '../store/UserContext'


const PinDetail = () => {
  const {user} = useContext(UserContext);
  return (
    <div>
      PinDetail
    </div>
  )
}

export default PinDetail
