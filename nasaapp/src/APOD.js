import React, {useEffect,useState} from 'react';
import './APOD.css';
import key from './key'
import tape from './assets/tape.png'

const APOD = () => {

  let [data,setData] = useState();
  let [error,setError] = useState(false)

  useEffect(()=>{
    getData();

  },[])


 let getData = () => {
   console.log(key.nasa)
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key.nasa}`)
    .then(data=>data.json())
    .then(data=> setData(data))
    .catch(() => setError(true))
 }

  return (
   <div id="first">
       <img id="first-tape" src={tape}/>
     {data ? <div className="content">
    <img src={data.hdurl} alt="hdphoto" />
    <h3>{data.title}</h3>
    <p>{data.explanation}</p>
    
</div> : <p>Loading</p>
     
     }
   </div>
  );
}

export default APOD;
