
//import Navbar from './components/Navbar.js'
import { AppContext } from './AppContext';
import {useState, useEffect, useContext} from 'react'
import Favlist from './components/Favlist';
import Mainlist from './components/Mainlist';
import {Routes, Route, Link } from "react-router-dom"
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';



function App() {
  const [areAllCities, setAreAllCities] = useState([])
  const [search, setSearch]=useState({})
  const [oneCity, setOneCity]= useState("")
  const [celsius, setCelsium]=useState(true)
  const [trigger, setTrigger]=useState(false)
  const [msg,setMsg] = useState('')
  const [weather_city, setCity] =useState('')
  const [favList, setFavList]=useState(true)


  // console.log("oneCity==---------->>>>", oneCity)
  // console.log("favList==---------->>>>", favList)
  // console.log("search==---------->>>>", search)
  // console.log("areAllCities==---------->>>>", areAllCities)
  // console.log("trigger==---------->>>>", trigger)

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
            setOneCity(data?.location?.name)
            
        })
      .catch(err => console.error(err));
      
      setTrigger(true)
  }
  
  const getCity =(e)=> {
    setCity(e.target.value)}
  return (
    <AppContext.Provider
       value={{
        areAllCities,
        setAreAllCities,
        search, 
        setSearch,
        oneCity, 
        setOneCity,
        celsius, 
        setCelsium,
        trigger, 
        setTrigger,
        msg,
        setMsg
       }}>
        <div className="App" style={{backgroundColor:"lightblue"}}>
        <div>
      <div style={{padding:'20px', backgroundColor:'indigo', display:"flex", justifyContent:"center", gap:"5%"}}>
        <Link to='/' onClick={()=>{setFavList(true)}} style={{ textDecoration:'none', color:"white", fontSize:"20px"}}><strong>Home</strong></Link>
        <Link to='/favlist' onClick={()=>{setFavList(false)}} style={{ textDecoration:'none', color:"white", fontSize:"20px"}}><strong>Favorites</strong></Link>
      </div>
          </div>
             {favList&& <div style={{display:"flex", justifyContent:"center", margin:"2%"}}>
              <Input onChange={getCity} type="text" />
              <Button onClick={handleClick} id='butsearch' variant="contained">Search</Button>
          </div>}

          <Routes>
          <Route path='/' element={<Mainlist/>}/>
          <Route path='/favlist' element={<Favlist/>}/>

          </Routes>
        </div>
    </AppContext.Provider>
  );
}

export default App;
