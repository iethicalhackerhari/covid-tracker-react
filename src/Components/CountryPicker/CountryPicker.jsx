import React, { useState, useEffect } from 'react'

import { Form } from 'react-bootstrap'
import './CountryPicker.scss'
function CountryPicker(props) {


const [countryList, setCountryList]=useState([])


  

  return (
    
    <div className='countryPicker-div'><Form.Select className='form-div' style={{ width:'75%',}} aria-label="Default select example" onChange={(e)=>props.submitHandler(e.target.value)} >
    <option style={{ width:'75%',}} >Global</option>
    {
      
      !props.countries?'Loading...':(props.countries.map((country,index)=> <option style={{ width:'75%',}} key={index}>{country.name}</option>)) 
    }
    
  </Form.Select></div>
  )
}

export default CountryPicker