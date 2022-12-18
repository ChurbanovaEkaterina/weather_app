import Favlist from './Favlist.js'
import Mainlist from './Mainlist.js'
import {Routes, Route, Link } from "react-router-dom"
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {useState, useContext, useEffect} from 'react'
import { AppContext } from '../AppContext'


const Navbar =()=>{
  const [weather_city, setCity] =useState('')
  const [favList, setFavList]=useState(true)
  const { setSearch, oneCity, setTrigger, msg,setMsg} =useContext(AppContext)
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
          //console.log(data)
        })
      .catch(err => console.error(err));}
      
    },[]);
  let handleClick=()=>{

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'aa7c5eda80msh0c8392bc75a3a95p19bbf7jsn8b53ecb924e7',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    
    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${weather_city}&days=3`, options)
      .then(response => response.json())
      .then(data=>{
            setSearch(data)
            console.log(data)
        })
      .catch(err => console.error(err));
      setTrigger(true)
  }
  
  
  const getCity =(e)=> {
    setCity(e.target.value)
  };
  return(
    <>
    <div>
      <div style={{padding:'20px', backgroundColor:'DodgerBlue'}}>
        <Link to='/' onClick={()=>{setFavList(true)}} style={{padding:'20px', textDecoration:'none', color:"white"}}><strong>Home</strong></Link>
        <Link to='/favlist' onClick={()=>{setFavList(false)}} style={{padding:'20px', textDecoration:'none', color:"white"}}><strong>Favorites</strong></Link>
      </div>
    </div>
   {favList&& <div style={{display:"flex", justifyContent:"center", margin:"2%"}}>
        <Input onChange={getCity} type="text" />
        <Button onClick={handleClick} id='butsearch'>Search</Button>
    </div>}

    <Routes>
    <Route path='/' element={<Mainlist/>}/>
    <Route path='/favlist' element={<Favlist/>}/>

    </Routes>
    </>

  )
}


export default Navbar
