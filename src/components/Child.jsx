import React from 'react'

export default function Child({increment, decrement, count}) {  
  
  const handlePlus = () => {
    increment();
  }  
  const handleMinus = () => {
    decrement();
  }
  const isNotWhole = count <= 0;
  return (
    <div>
        <button onClick={handlePlus}>+</button>
        {" "}
        <button disabled={isNotWhole} onClick={handleMinus}>-</button>
    </div>
  )
}
