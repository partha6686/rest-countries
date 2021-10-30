import React, {useState} from 'react';
import Countries from './Countries';
import NavBar from './NavBar';
import '../App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import FilterBar from './FilterBar';
import CountryInfo from './CountryInfo';

function App() {
  const [final,setFinal] = useState('');
  const [finalReg,setFinalReg] =useState('');
  const [country,setCountry] = useState();
  return (
    <div className='app'>
      <Router>
        <NavBar />
        {!country && <FilterBar setFinal={setFinal} setFinalReg={setFinalReg}/>}
        {finalReg && <Redirect to={'/region/' + finalReg}/>}
        {!country ? <Redirect to={'/'} /> :<Redirect to={'/country/' + country} />}
        <Switch>
          <Route exact path='/'><Countries setCountry={setCountry} /></Route>
          <Route exact path='/query'><Countries key={final} setCountry={setCountry} /></Route>
          <Route exact path='/region/:regionName'><Countries setCountry={setCountry} /></Route>
          <Route exact path='/country/:countryName'><CountryInfo country={country} setCountry={setCountry} /></Route>
        </Switch>
      </Router>
    </div>
  );

}

export default App;