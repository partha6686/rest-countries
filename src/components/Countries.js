import React, {useEffect, useState} from 'react';
import CountryCard from './CountryCard';
import { useLocation, useParams } from "react-router";

function Countries(props){
    const useQuery = ()=> {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    let {regionName} = useParams();
    const [countries, setCountries] = useState();
    const getCountries = async () => {
        let URL;
        props.setProgress(30);
        if(query.get("q")){
            URL = `https://restcountries.com/v3.1/name/${query.get("q")}`;
        }else if(regionName){
            URL = `https://restcountries.com/v3.1/region/${regionName}`;
        }else{
            URL = 'https://restcountries.com/v3.1/all';
        }
        let data = await fetch(URL);
        props.setProgress(50);
        let parseData = await data.json();
        props.setProgress(70);
        setCountries(parseData);
        props.setProgress(100);
    }
    const showInfo = (c)=>{
        props.setCountry(c.name.common);
    }
    useEffect(() => {
        getCountries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [regionName])
    return(
        <div className='countries'>
            {countries && countries.map((country)=>(
                <div key={country.name.common} className={props.theme==='light'?'country-card':'country-card country-card-dark'} onClick={()=>(showInfo(country))}>
                    <CountryCard country={country} />
                </div>
            ))};
        </div>
    );
}
export default Countries;