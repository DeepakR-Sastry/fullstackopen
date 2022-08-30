import { useEffect, useState } from 'react'
import axios from 'axios'


const App = () => {
  const [countries, setCountries] = useState("")
  const [searchCountry, setSearchCountry] = useState([])
  const [displayedCountries, setDisplayedCountries] = useState([])
  

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchCountry = (event) =>{
    setSearchCountry(event.target.value)
    setDisplayedCountries(
      countries.filter((country) => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    )
    
  }

  return(
    <div>
      <div>
        Find countries <input value={searchCountry} onChange={handleSearchCountry}/>
      </div>
      <Countries countries={displayedCountries}/>
    </div>
  )
}

const Countries = (props) => {
  if(props.countries.length > 10){
    return <div>Too many matches, specify another filter</div>
  }
  else if(props.countries.length === 1){
    return(
      <div>
        <h1>{props.countries[0].name.common}</h1>
        <div>capital {props.countries[0].capital}</div>
        <div>area {props.countries[0].area}</div>
        
        <img src={props.countries[0].flags.png} alt={`${props.countries[0].name.common} flag`} />
      </div>
    )
  }
  return props.countries.map((country) => (<div key={country.name.common}>{country.name.common}</div>))
}




export default App;
