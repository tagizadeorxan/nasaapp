import React, { useState, useEffect } from 'react';
import rocket from './assets/rocket.png'


let NaturalEvents = () => {

    let [data, setData] = useState();
    let [error, setError] = useState(false);
    let [page, setPage] = useState();

    useEffect(() => {
        getData();
    }, [])


    let getData = () => {
        fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events').
            then(data => data.json())
            .then(data => {
                if (data.events.length > 1) {
                    setData(data);
                    setPage(0);
                }
            })
            .catch(err => setError(err))
    }


    let setCurrent = (type) => {

        if (data.events.length >= 0) {
            switch (type) {
                case 'prev':
                    if ((page - 1) >= 0) {
                        setPage(page - 1)
                    }
                    break;

                case 'next':
                    if ((page + 1) <= data.events.length - 1) {
                        setPage(page + 1)
                    }
                    break;

                default:
                    break;
            }
        }
    }



    return (
        <div id="four">
            {data && page >= 0 ?
                <div className="content">
                    <h1>{data.description || 'not exist'}</h1>
                    <h3>Quantity:{data.events.length || 'not exist'}</h3>
                    <div>
                       <p><span className="black-color">Cateogry: </span>{data.events[page].categories[0].title || 'not exist'}</p>
                       <p><span className="black-color"></span>{data.events[page].title || 'not exist'}</p>
                       <a href={data.events[page].sources[0].url || 'not exist'}>PDC</a>
                       <p><span className="black-color">ID: </span>{data.events[page].id || 'not exist'}</p>
                       <p><span className="black-color">Date: </span>{new Date(data.events[page].geometries[0].date).toUTCString() || 'not exist'}</p>
                       <div className="asteroid-buttons">
                <p><span className="black-color">Page:</span> {page+1}</p>
                <img onClick={() => setCurrent('prev')} id="prev"  src={rocket} alt="prev"/>
                <img onClick={() => setCurrent('next')} id="next"  src={rocket} alt="next"/>
                </div>
                    </div>

                </div> : error ? <p>internal error</p> : <p>Loading</p>
            }
        </div>
    )
}

export default NaturalEvents;












//https://eonet.sci.gsfc.nasa.gov/api/v2.1/events