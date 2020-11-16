import APOD from './APOD';
import Asteroids from './Asteroids';
import Weather from './Weather';
import './App.css'


const App = () => {
    return (
        <div className="app-container">
            <APOD/>
            <Asteroids/>
            <Weather/>
        </div>
    )
}

export default App;