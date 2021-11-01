import React, {useState} from 'react';
import '../App.css';
import Countries from './Countries';
import NavBar from './NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import FilterBar from './FilterBar';
import CountryInfo from './CountryInfo';
import LoadingBar from 'react-top-loading-bar';

function App() {
  const [final,setFinal] = useState('');
  const [finalReg,setFinalReg] =useState('');
  const [country,setCountry] = useState();
  const [theme, setTheme] = useState('light');
  const [progress, setProgress] = useState(0);

  return (
    <div className={theme==='light'?'app':'app app-dark'}>
      <Router>
        <NavBar theme={theme} setTheme={setTheme} />
        <LoadingBar
          height={3}
          color={theme!=='light'?"#16E2F5":'#FF5151'}
          progress={progress}
        />
        {!country && <FilterBar theme={theme} setFinal={setFinal} setFinalReg={setFinalReg}/>}
        {finalReg && <Redirect to={'/region/' + finalReg}/>}
        {!country ? <Redirect to={'/'} /> :<Redirect to={'/country/' + country} />}
        <Switch>
          <Route exact path='/'><Countries theme={theme} setCountry={setCountry} setProgress={ setProgress} /></Route>
          <Route exact path='/query'><Countries theme={theme} key={final} setCountry={setCountry} setProgress={ setProgress} /></Route>
          <Route exact path='/region/:regionName'><Countries theme={theme} setCountry={setCountry} setProgress={ setProgress} /></Route>
          <Route exact path='/country/:countryName'><CountryInfo key={country} theme={theme} country={country} setCountry={setCountry} setProgress={ setProgress} /></Route>
        </Switch>
      </Router>
    </div>
  );

}

export default App;