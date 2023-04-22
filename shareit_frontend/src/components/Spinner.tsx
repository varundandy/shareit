import React from 'react'
import {Circles, TailSpin} from 'react-loader-spinner'

type SpinnerProps = {
    message:string
}
const Spinner = (props: SpinnerProps) => {
    const {message} = props;
  return (
    <div className='flex flex-col justify-center items-center w-full h-full m-5'>
        <Circles color='#00BFFF' height={50} width={200}/>
        <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner
