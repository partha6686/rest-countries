import React, {useEffect, useState} from "react";
import _ from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function CountryInfo(props){
    const [details,setDetails] = useState();
    const [border, setBorder] = useState([]);
    const goBack = () => {
        props.setCountry('');
    }
    const showCountryData = async ()=>{
        if(props.country){
            let URL = `https://restcountries.com/v3.1/name/${props.country}`;
            let data = await fetch(URL);
            let parseData = await data.json();
            let [parseDataObject] = parseData;
            setDetails(parseDataObject);
            if(_.has(parseDataObject, 'borders')){
                parseDataObject.borders.map(async (borderCountry)=>{
                    let newURL = `https://restcountries.com/v3.1/alpha/${borderCountry}`;
                    let newData = await fetch(newURL);
                    let newParseData = await newData.json();
                    let [newparseDataObject] = newParseData;
                    setBorder((prev)=>{
                        return [...prev, newparseDataObject.name.common];
                    });
                })
            }
        }
    }
    useEffect(() => {
        console.log('called');
        showCountryData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleClick = (c)=>{
        props.setCountry(c);
    }
    return(
        <div>
            <button className='back-btn' onClick={goBack} ><FontAwesomeIcon icon={faArrowLeft} /> Back </button>
            <div className='country-details'>
                <img src={details && details.flags.png} alt={props.country + '-Flag'}/>
                <div>
                    <h2>{props.country}</h2>
                    <div className='details'>
                        <div>
                            <p><strong>Native Name:</strong> {details && details.name.official}</p>
                            <p><strong>Population:</strong> {details && details.population}</p>
                            <p><strong>Region:</strong> {details && details.region}</p>
                            <p><strong>Sub Region:</strong> {details && details.subregion}</p>
                            <p><strong>Capital:</strong> {details && details.capital[0]}</p>
                        </div>
                        <div>
                            <p><strong>Top Level Domain:</strong> {details && details.tld[0]}</p>
                            <p><strong>Currencies:</strong> {details && _.values(details.currencies)[0].name}</p>
                            <p><strong>Languages:</strong> {details && _.join(_.valuesIn(details.languages),', ')}</p>
                        </div>
                    </div>
                    <p style={{paddingTop: '50px'}}><strong>Border Countries:</strong>
                        {border.length >= 1 ? border.map((borderCountry)=>(
                            <button key={borderCountry} className='border-btn' onClick={()=>(handleClick(borderCountry))} >{borderCountry}</button>
                        )):<button className='border-btn'>N/A</button>}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CountryInfo;