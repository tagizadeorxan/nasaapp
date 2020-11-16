import React, { useEffect, useState } from 'react';
import key from './key';
import './Asteroid.css';
import tape from './assets/tape.png'
import rocket from './assets/rocket.png'

const Asteroids = () => {

    let [data, setData] = useState();
    let [error, setError] = useState(false);
    let [date, setDate] = useState();
    let [page, setPage] = useState();


    useEffect(() => {
        getData();

    }, [])


    let getData = () => {

        let today = new Date();
        let searchDate = today.toISOString().split('T')[0];
        setDate(searchDate)
        fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${searchDate}&end_date=${searchDate}&api_key=${key.nasa}`)
            .then(data => data.json())
            .then(data => {
                setData(data.near_earth_objects[searchDate]);

                if (data.near_earth_objects[searchDate].length >= 0) {
                    setPage(0)
                }
            })
            .catch(() => setError(true))
    }

    let setCurrent = (type) => {

        console.log(data.length)
        if (data.length >= 0) {
            switch (type) {
                case 'prev':
                    if ((page - 1) >= 0) {
                        setPage(page - 1)
                    }
                    break;

                case 'next':
                    if ((page + 1) <= data.length - 1) {
                        setPage(page + 1)
                    }
                    break;

                default:
                    break;
            }
        }
    }

    return (
        <div id="second">
         <img id="second-tape" src={tape}/>
            {data && page >= 0 ? <div className="content">
                <h1>Near Earth Objects</h1>
                <h3>Quantity: {data.length}</h3>
                <h4>Date: {date}</h4>

                <div>
                    <p><span className="black-color">ID:</span> {data[page].id}</p>
                    <p><span className="black-color">Name:</span> {data[page].name}</p>
                    <p><span className="black-color">Dangerous:</span> {data[page].is_potentially_hazardous_asteroid ? "yes" : "no"}</p>
                    <p><span className="black-color">Centry Object:</span> {data[page].is_sentry_object ? "yes" : "no"}</p>
                    <p><span className="black-color">Estimated diameter (km):</span> min {data[page].estimated_diameter.kilometers.estimated_diameter_min},
                  max {data[page].estimated_diameter.kilometers.estimated_diameter_max} </p>
                    <a href={data[page].nasa_jpl_url}>JPL data</a>
                </div>
                
                <div className="asteroid-buttons">
                <p><span className="black-color">Page:</span> {page+1}</p>
                <img onClick={() => setCurrent('prev')} id="prev"  src={rocket}/>
                <img onClick={() => setCurrent('next')} id="next"  src={rocket}/>
                </div>
       
                

            </div> : <p>Loading</p>

            }
        </div>
    );
}

export default Asteroids;
