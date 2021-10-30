import React, {useEffect, useState} from "react";
import _ from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function CountryInfo(props){
    const [details,setDetails] = useState();
    const goBack = () => {
        props.setCountry('');
    }
    const showCountryData = async ()=>{
        let URL = `https://restcountries.com/v3.1/name/${props.country}`;
        let data = await fetch(URL);
        let parseData = await data.json();
        setDetails(parseData);
        
    }
    useEffect(() => {
        showCountryData();   
        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [])
    return(
        <div>
            <button className='back-btn' onClick={goBack} ><FontAwesomeIcon icon={faArrowLeft} /> Back </button>
            <div className='country-details'>
                <img src={details && details[0].flags.png} alt={props.country + '-Flag'}/>
                <div>
                    <h2>{props.country}</h2>
                    <div className='details'>
                        <div>
                            <p><strong>Native Name:</strong> {details && details[0].name.official}</p>
                            <p><strong>Population:</strong> {details && details[0].population}</p>
                            <p><strong>Region:</strong> {details && details[0].region}</p>
                            <p><strong>Sub Region:</strong> {details && details[0].subregion}</p>
                            <p><strong>Capital:</strong> {details && details[0].capital[0]}</p>
                        </div>
                        <div>
                            <p><strong>Top Level Domain:</strong> {details && details[0].tld[0]}</p>
                            <p><strong>Currencies:</strong> {details && _.values(details[0].currencies)[0].name}</p>
                            <p><strong>Languages:</strong> {details &&_.join(_.valuesIn(details[0].languages),', ')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CountryInfo;