import React, { useState } from 'react'
import Child from './Child';

export default function Parent() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count+1)
  }  
  const decrement = () => {
    setCount(count-1)
  }
  return (
    <div>
        <p>Count: {count}</p>
        <Child increment={increment} decrement={decrement} count={count}/>
    </div>
  )
}
