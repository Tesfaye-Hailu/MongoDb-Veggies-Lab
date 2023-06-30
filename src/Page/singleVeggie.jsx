import axios from 'axios';
import React, { useState } from 'react'

const SingleVeggie = () => {
    const [singleVeggie, setSingleVeggie] = useState([]);
    const [input, setInput] = useState("");
    const handleChange = (e) => {
        setInput(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
       console.log(input);
        let response = await axios(`/veggie/${input}`)
        setSingleVeggie(response.data)
        // setInput('')
    }

    let singleVeggieJSX = singleVeggie.map((veggie)=>{
        return <div>
            <h3>{veggie.name}</h3>
            <p>{veggie.age}</p>
        </div>
        
    })
  return (
    <div>SingleVeggie
    <form id="create-fruit-form" onSubmit={handleSubmit}>
        <div className='input-container'>
          <label htmlFor="name">veggie Name</label>
          <input type="text"  value={input} onChange={handleChange}/>
        </div>
        <button>Submit</button>
      </form>
        {singleVeggieJSX}
      </div>
  )
}

export default SingleVeggie