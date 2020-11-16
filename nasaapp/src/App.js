import APOD from './APOD';
import Asteroids from './Asteroids';
import Weather from './Weather';
import './App.css'
import satelite from './assets/satelite.png'

const App = () => {
    return (
        <div>
            <img  src={satelite} alt="satelite"/>
            <div className="app-container">
            <APOD/>
            <Asteroids/>
            <Weather/>
        </div>
        </div>
    )
       
      
}

export default App;