
import Navbar from './components/Navbar.js'
import { AppContext } from './AppContext';
import {useState, useEffect} from 'react'
function App() {
  const [areAllCities, setAreAllCities] = useState([])
  const [search, setSearch]=useState({})
  const [oneCity, setOneCity]= useState("")
  const [celsius, setCelsium]=useState(true)
  const [trigger, setTrigger]=useState(false)
  const [msg,setMsg] = useState('')
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
        <div className="App">
          <header className="App-header">
            <Navbar/>
          </header>
        </div>
    </AppContext.Provider>
  );
}

export default App;
