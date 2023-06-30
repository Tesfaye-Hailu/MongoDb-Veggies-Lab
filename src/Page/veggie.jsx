import axios from 'axios'

import React, { useEffect, useState } from 'react'

const Veggie = () => {
    const [veggies, setVeggies]= useState([])
    const [formData, setFormData] = useState({
      name: '',
      age: 1,
      canEat: false
    });

    const [veggieArray, setVeggieArray] = useState([])

    
    //3.1 show all veggies - this page will wait to get the veggie information from the backend ('/veggies'), when it gets the data, will display it on the page.
     
    useEffect( ()=>{

        axios('/veggies').then((response)=> {
            // console.log(response);
            setVeggies(response.data)
         
        })

    }, [])
    // console.log(veggies)

    
    const handleSubmit = (e) => {
      e.preventDefault();
       
        axios({
           method: "POST",
           url: "/create_veggie",
           // goes to the server the app is from!
           data: formData
         })
     
       setFormData({
        name: '',
        age: 1,
        canEat: false
      })
    }
  
    const handleChange = (e) => {
      let value = e.target.name === "canEat" ? e.target.checked : e.target.value;
      let newStateObject = {
        ...formData,
        [e.target.name]: value
      }
      setFormData(newStateObject)
    }
  
  
    let veggiesJSX = veggies.map((veggie) => {
      return <div key={veggie._id} className={veggie.canEat ? "green" : "red"} >{veggie.name}</div>
    });

    

  return (
    <div>

    <h2>Veggies</h2>

    <form id="create-fruit-form" onSubmit={handleSubmit}>
        <div className='input-container'>
          <label htmlFor="name">veggie Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}/>
        </div>
        <div className='input-container'>
          <label htmlFor="age">veggie Age</label>
          <input type="number" name="age" min="1" value={formData.age} onChange={handleChange}/>
        </div>
        <div className='input-container'>
          <label htmlFor="canEat">Can Eat veggie?</label>
          <input type="checkbox" name='canEat' checked={formData.canEat} onChange={handleChange}/>
        </div>
        <button>Submit</button>
      </form>
      <div>{veggiesJSX }</div>
    </div>
  )
}

export default Veggie