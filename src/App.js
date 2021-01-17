import './App.css';
import Weather from './components/weatherComponents'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import React from 'react';
import Form from './components/formComponents'

const API_KEY = "c4a5f0312087d7f059b42efc5977fde1";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    this.weathericon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };

  getWeatherIcon(icons, rangeID) {
    switch(true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({icon: this.weathericon.Thunderstorm});
        break;
        case rangeID >= 300 && rangeID <= 321:
          this.setState({icon: this.weathericon.Drizzle});
          break;
          case rangeID >= 300 && rangeID <= 321:
          this.setState({icon: this.weathericon.Drizzle});
          break;
          case rangeID >= 500 && rangeID <= 531:
          this.setState({icon: this.weathericon.Rain});
          break;
          case rangeID >= 600 && rangeID <= 622:
          this.setState({icon: this.weathericon.Snow});
          break;
          case rangeID >= 701 && rangeID <= 781:
          this.setState({icon: this.weathericon.Atmosphere});
          break;
          case rangeID === 800:
          this.setState({icon: this.weathericon.Clear});
          break;
          case rangeID >= 800 && rangeID <= 804:
          this.setState({icon: this.weathericon.Clouds});
          break;
          default:
            this.setState({icon: this.weathericon.Clouds});
            break;
    }
  }

  

  getWeather = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if (city && country) {
      const API_CALL = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
      const response = await API_CALL.json();
  
      console.log(response);
  
      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      })
      this.getWeatherIcon(this.weathericon, response.weather[0].id);
    } else {
      this.setState({error: true});
    }
  }

  state = {}

render() {
  return (
  <div className="App">
    <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather 
        city={this.state.city} 
        country={this.state.country}
        temp_celsius={this.state.celsius} 
        temp_min={this.state.temp_min} 
        temp_max={this.state.temp_max} 
        description={this.state.description}
        weathericon={this.state.icon} />
      </div>
  )
}
} 

export default App;
