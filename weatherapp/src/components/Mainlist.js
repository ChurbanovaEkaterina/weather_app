import {useState, useContext, useEffect} from 'react'
import { AppContext } from '../AppContext'
import React from "react"
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { TbWind } from 'react-icons/tb';
import { BsFillDropletFill, BsFillCloudRainFill } from 'react-icons/bs';
import { MdCompress } from 'react-icons/md';




const Mainlist =(props)=> {




const {areAllCities, setAreAllCities, search, setSearch, oneCity, setOneCity, celsius, setCelsium, trigger, setTrigger, msg,setMsg} =useContext(AppContext)

console.log("oneCity", oneCity)
console.log("areAllCities", areAllCities)

useEffect(() => {

if(oneCity===""){
  const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'aa7c5eda80msh0c8392bc75a3a95p19bbf7jsn8b53ecb924e7',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};
fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=tel-aviv&days=3`, options)
  .then(response => response.json())
  .then(data=>{
        setSearch(data)
      console.log(data)
    })
  .catch(err => console.error(err));}
  
},[]);
useEffect(()=>{
  if(trigger===true){
    setOneCity(search?.location?.name)
  }
}, [search])



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
   
     {search?.error?.message?<div style={{display:'flex', justifyContent:"center", marginTop:"20%", fontSize:"20px"}}>{search.error.message}</div>: <div className="datashow">
      <div className="current" style={{display:"flex", alignItems: "center", justifyContent:"center",gap: "12%", flexDirection:"row", padding:"1%"}}>
        {/* */}
      <div style={{display:"flex", alignItems: "flex-start", flexDirection:"column", padding:"1%"}}> 
          <h3> <span style={{padding:"3px"}}>{areAllCities.some(checkCityInArray)?<AiFillHeart onClick={addCity}/>:(search?.location?.name==="Tel Aviv-Yafo"?null:<AiOutlineHeart onClick={addCity}/>)}</span> {search.location&&search.location.name}, {search.location&&search.location.country} </h3>
          <h1 style={{display:"flex", justifyContent:'center',alignItems: "center"}}>{search.current&&search.current.condition.text} <img src={search.current&&search.current.condition.icon} alt={search.location&&search.location.name}/> </h1>
          <h3 >{celsius?search.current&&search.current.temp_c:search.current&&search.current.temp_f}  {celsius?<><span onClick={()=>{setCelsium(true)}}>°C |</span><span style={{color:"lightgrey"}} onClick={()=>{setCelsium(false)}}> °F</span></>:<><span onClick={()=>{setCelsium(true)}} style={{color:"lightgrey"}} >°C |</span><span onClick={()=>{setCelsium(false)}}> °F</span></>}</h3>
       </div>
       <div style={{display:"flex", alignItems: "flex-end", flexDirection:"column", padding:"1%"}}> 
          <p><BsFillDropletFill size={20}/> Humidity: {search.current&&search.current.humidity}%</p>
          <p><BsFillCloudRainFill size={20}/> Precipitation: {search.current&&search.current.precip_mm}mm</p>
          <p><MdCompress size={20}/> Pressure: {search.current&&search.current.pressure_mb}mb</p>
          <p><TbWind size={20}/> Wind: {search.current&&search.current.wind_kph}kph </p>
       </div>
      
      </div>
    
      <div style={{padding:'10px', borderTop:"1px grey solid", width:"50%", margin:"auto"}}>{}</div>
      <section className='forecast' style={{display:"flex", justifyContent:'center', flexWrap:'wrap'}}>
          {search.forecast&&search.forecast.forecastday.map((item, i)=>{
            return(
              <>
              <div key={i} style={{padding:'14px', display:"flex", justifyContent:'center', flexDirection:'column',margin:'20px'}}>
                <div style={{padding:'10px', alignSelf: 'center'}}>{item.date}</div>
                <div style={{padding:'10px', alignSelf: 'center'}}>{celsius?item.day.avgtemp_c:item.day.avgtemp_f} {celsius?"°C":"°F"}</div>
                <img src={item.day&&item.day.condition.icon} alt={item.day&&item.condition?.text}/> 
                <div style={{padding:'10px', alignSelf: 'center'}}>{item.day.condition.text}</div>
              </div>
              
              </>
            )
          })}
          
      </section>
      </div>}

    </>
  )
}


export default Mainlist
