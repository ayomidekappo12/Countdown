import React from 'react'

type ButtonProps = {
  className: string;
    text: string;
    onclick?: () => void;
}

const Button  = ({className, text, onclick}: ButtonProps) => {
  return (
    <div className='w-full h-full'>
        <button onClick={onclick} className={`${className} w-full h-[56px]`}>{text}</button>
    </div>
  )
}

export default Button
