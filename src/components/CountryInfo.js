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
            props.setProgress(10);
            let URL = `https://restcountries.com/v3.1/name/${props.country}`;
            let data = await fetch(URL);
            props.setProgress(40);
            let parseData = await data.json();
            let [parseDataObject] = parseData;
            props.setProgress(70);
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
            props.setProgress(100);
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
            <button className={props.theme==='light'?'back-btn':'back-btn back-btn-dark'} onClick={goBack} ><FontAwesomeIcon icon={faArrowLeft} /> Back </button>
            <div className='country-details'>
                <img src={details && details.flags.png} alt={props.country + '-Flag'}/>
                <div>
                    <h2>{props.country}</h2>
                    <div className='details'>
                        <div>
                            <p><strong>Native Name:</strong> {_.has(details,'name')  && details.name.official}</p>
                            <p><strong>Population:</strong> {_.has(details,'population')  && details.population}</p>
                            <p><strong>Region:</strong> {_.has(details,'region')  && details.region}</p>
                            <p><strong>Sub Region:</strong> {_.has(details,'subregion')  && details.subregion}</p>
                            <p><strong>Capital:</strong> {_.has(details,'capital') && details.capital[0]}</p>
                        </div>
                        <div>
                            <p><strong>Top Level Domain:</strong> {_.has(details,'tld') && details.tld[0]}</p>
                            <p><strong>Currencies:</strong> {_.has(details,'currencies') && _.values(details.currencies)[0].name}</p>
                            <p><strong>Languages:</strong> {_.has(details,'languages') && _.join(_.valuesIn(details.languages),', ')}</p>
                        </div>
                    </div>
                    <p style={{paddingTop: '50px'}}><strong>Border Countries:</strong>
                        {border.length >= 1 ? border.map((borderCountry)=>(
                            <button key={borderCountry} className={props.theme==='light'?'border-btn':'border-btn border-btn-dark'} onClick={()=>(handleClick(borderCountry))} >{borderCountry}</button>
                        )):<button className={props.theme==='light'?'border-btn':'border-btn border-btn-dark'} >N/A</button>}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CountryInfo;