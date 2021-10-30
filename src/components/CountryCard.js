import React from 'react';

function CountryCard(props){

    return(
        <>
            <img src={props.country.flags.png} alt='country-flag' />
            <div className='card-details'>
                <h3>{props.country.name.common}</h3>
                <p><strong>Population:</strong> {props.country.population}</p>
                <p><strong>Region:</strong> {props.country.region}</p>
                <p><strong>Capital:</strong> {props.country.capital}</p>
            </div>
        </>
    )
}
export default CountryCard;