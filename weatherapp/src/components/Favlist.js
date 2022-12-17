import axios from 'axios'
import {useEffect,useState, useContext} from 'react';
import { AppContext } from '../AppContext'
import React from "react"
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { TbWind } from 'react-icons/tb';
import { BsFillDropletFill, BsFillCloudRainFill } from 'react-icons/bs';
import { MdCompress } from 'react-icons/md';

const Favlist =()=>{
  //const [allcities, setAllcities]=useState([{weather_city: "Tel-aviv"}])
  const [datacities, setDatacities]=useState([])
  const [fake, setFake]=useState('')
  const {areAllCities, setAreAllCities, search, celsius, oneCity, setOneCity} =useContext(AppContext)


  useEffect(()=>{
    areAllCities.map((item, i) => {
      const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'aa7c5eda80msh0c8392bc75a3a95p19bbf7jsn8b53ecb924e7',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${item}&days=5`, options)
      .then(response => response.json())
      .then(data1=>{
        setDatacities(datacities=>[...datacities, data1])
        })
      .catch(err => console.error(err));
    })
    console.log("i inside second")
  },[areAllCities])

  const checkCityInArray=(city)=>city===oneCity
  
  const addCity=()=>{
    const emptyArray=[...areAllCities]
    if(areAllCities.some(checkCityInArray)){
      const filterCities=emptyArray.filter((city)=>{
        return city!==oneCity
      })
      setAreAllCities(filterCities)
    }else{
      setAreAllCities(areAllCities=>[...areAllCities, oneCity])
    }  
  }
 

  return(
    <>
      {areAllCities.length===0?<div style={{display:'flex', justifyContent:"center", marginTop:"20%", fontSize:"20px"}}>There are no your favourite cities. Let's add first one!</div>:<div className='forecast' style={{display:"flex", justifyContent:'center', flexWrap:'wrap'}}>{datacities.map((item,i)=>{
          return(
            <>
              <div key={i} style={{display:"flex", alignItems: "center", justifyContent:"center",gap: "12%", flexDirection:"row", padding:"1%", width:"80%"}}>
              
              <div style={{padding:'10px', display:"flex", justifyContent:'center', flexDirection:'column'}}>
                  <h2 style={{padding:'10px', alignSelf: 'center'}}>{areAllCities.some(checkCityInArray)?<AiFillHeart onClick={addCity} style={{margin:"3px"}}/>:null} {item.location&&item.location.name}</h2>
                  <div style={{padding:'10px', alignSelf: 'center'}}>{celsius?item.current&&item.current.temp_c:item.current&&item.current.temp_f} {celsius?"°C":"°F"}</div>
                  <div style={{padding:'10px', alignSelf: 'center'}}>{item.current&&item.current.condition.text}</div>
                </div>
                <div  style={{padding:'10px', display:"flex", justifyContent:'center', flexDirection:'column'}}>
                      <p><BsFillDropletFill size={20}/> Humidity: {item.current&&item.current.humidity}%</p>
                      <p><BsFillCloudRainFill size={20}/> Precipitation: {item.current&&item.current.precip_mm}mm</p>
                     
                  </div>
                  <div  style={{padding:'10px', display:"flex", justifyContent:'center', flexDirection:'column'}}>
                      <p><MdCompress size={20}/> Pressure: {item.current&&item.current.pressure_mb}mb</p>
                      <p><TbWind size={20}/> Wind: {item.current&&item.current.wind_kph}kph </p>
                  </div>
              </div>
              <div style={{borderTop:"1px solid grey", width:"50%"}}>{}</div>
            </>
           )
          })
        }
      </div>}
    </>
  )
}

export default Favlist
