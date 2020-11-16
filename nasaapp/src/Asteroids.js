import React, { useEffect, useState } from 'react';
import key from './key';
import './Asteroid.css';

const Asteroids = () => {

    let [data, setData] = useState();
    let [error, setError] = useState(false);
    let [date,setDate] = useState();
   

    useEffect(() => {
        getData();

    }, [])


    let getData = () => {
        
        let today = new Date();
        let searchDate = today.toISOString().split('T')[0];
        setDate(searchDate)
        fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${searchDate}&end_date=${searchDate}&api_key=${key.nasa}`)
            .then(data => data.json())
            .then(data => setData(data.near_earth_objects[searchDate]))
            .catch(() => setError(true))
    }

 

    return (
        <div>
            {data ? <div className="content">
               <h1>Near Earth Objects</h1>
               <h4>Date: {date}</h4>
               {data.map((asteroid,index)=>
               <div key={index}>
               <p><span className="black-color">ID:</span> {asteroid.id}</p>
               <p><span className="black-color">Name:</span> {asteroid.name}</p>
                  <p><span className="black-color">Dangerous:</span> {asteroid.is_potentially_hazardous_asteroid? "yes": "no"}</p>
                  <p><span className="black-color">Centry Object:</span> {asteroid.is_sentry_object? "yes" : "no"}</p>
                  <p><span className="black-color">Estimated diameter (km):</span> min {asteroid.estimated_diameter.kilometers.estimated_diameter_min}, 
                  max {asteroid.estimated_diameter.kilometers.estimated_diameter_max} </p>
                  <a href={asteroid.nasa_jpl_url}>JPL data</a>
               </div>
               )}

            </div> : <p>Loading</p>

            }
        </div>
    );
}

export default Asteroids;
