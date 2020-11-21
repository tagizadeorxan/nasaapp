


import React, {useState,useEffect} from 'react';
import key from './key';



let EarthEpic = () => {

    let [image,setImage] = useState()
    let [date,setDate] = useState()
    let [data,setData] = useState()
    let [error,setError] = useState()

    useEffect(()=>{
        getID();
       },[])
       
       
       let getID = () => {
           fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${key.nasa}`)
           .then(data=>data.json())
           .then(data=> {
               if(data[0]) {
                   setData(data[0])
                setImage(data[0].image)
                setDate(data[0].date.slice(0,10).replaceAll('-','/'))
               }
         
           }).catch(err=>setError(err))
       }


    return (
      <div className="content" id="five">
      {
          image?  <div>

     <p><span className="black-color">Last photo: </span>{date || 'not exist'}</p>

           <p><span className="black-color">caption: </span>{data.caption || 'not exist'}</p>
           <p><span className="black-color">identifier: </span>{data.identifier || 'not exist'}</p>
           <p><span className="black-color">exact time: </span>{data.date || 'not exist'}</p>
           <p><span className="black-color"></span></p>
          <img src={`https://api.nasa.gov/EPIC/archive/natural/${date}/png/${image}.png?api_key=${key.nasa}`} alt="earth"/> 
          </div>: error ? <p>internal error</p> : <p>Loading</p>
      }
        
      </div>
    )
}

export default EarthEpic;

