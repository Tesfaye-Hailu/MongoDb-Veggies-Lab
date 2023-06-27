import axios from 'axios'

import React, { useEffect, useState } from 'react'
//show all veggies - this page will wait to get the veggie information from the backend ('/veggies'), when it gets the data, will display it on the page.
const Veggie = () => {
    const [veggies, setVeggies]= useState([])

    useEffect(async ()=>{

        axios('/veggies').then((response)=> {
            console.log(response);
            setVeggies(response.data)
         

        })

    }, [])
    console.log(veggies)
  return (
    <div>

    <h2>Veggies</h2>
    </div>
  )
}

export default Veggie