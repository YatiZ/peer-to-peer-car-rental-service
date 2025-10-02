"use client"
import React, { useState } from 'react'

const Testing = () => {
    const [test, setTest] = useState(['b','c','f']);
    const [take, setTake] = useState(0);
    const output = setTake(test.length)
    console.log(output)
    // const extractTest = test.length
    // console.log(extractTest)

  return (
    <div>Testing</div>
  )
}

export default Testing