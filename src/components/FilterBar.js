import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function FilterBar(props){
    const [query,setQuery] = useState('');
    const [region,setRegion] = useState('');
    
    const handleChange = (e)=>{
        setQuery(e.target.value);
    }
    const handleSubmit = ()=>{
        props.setFinal(query);
    }
    const handleRegion = (e)=>{
        setRegion(e.target.value);
    }
    const changeRegion = ()=>{
        props.setFinalReg(region);
    }
    useEffect(() => {
        if(region){
            changeRegion();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [region])
    return(
        <div className={props.theme==='light'?'filter-bar':'filter-bar filter-bar-dark'}>
            <div className={props.theme==='light'?'custom-search-bar':'custom-search-bar custom-search-bar-dark' }>
                <Link to={{
                    pathname: "/query",
                    search: "?q=" + query
                }}><button onClick={handleSubmit}><FontAwesomeIcon icon={faSearch} /></button></Link>
                <input onChange={handleChange} type='text' placeholder='Search for a country' name='q' value={query}/>
            </div>
            <select onChange={handleRegion} name="region" id="region" defaultValue='DEFAULT'>
                <option value='DEFAULT' disabled hidden>Filter by Region</option>
                <option value="africa">Africa</option>
                <option value="america">America</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
            </select>
        </div>
    );
}

export default FilterBar;