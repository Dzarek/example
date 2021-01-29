import React, { Component } from "react";
import "./App.css";
import Form from "./Form";
import Result from "./Result";

//Klucz do API
const APIKey = "32c9e1f12931409af602daf1b7e25f97";

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    country: "",
    err: false,
    dateClock: new Date(),
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({ dateClock: new Date() });
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value.toUpperCase(),
    });
  };

  // handleCitySubmit = (e) => {
  //   e.preventDefault();

  //   const API = `http://api.openweathermap.org/data/2.5/weather?q=${
  //     this.state.value
  //   }&appid=${APIKey}&units=metric`;

  //   fetch(API)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response;
  //       }
  //       throw Error("nie udało się");
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const time = new Date().toLocaleString();
  //       this.setState((prevState) => ({
  //         err: false,
  //         date: time,
  //         sunrise: data.sys.sunrise,
  //         sunset: data.sys.sunset,
  //         temp: data.main.temp.toFixed(0),
  //         pressure: data.main.pressure,
  //         wind: data.wind.speed,
  //         city: prevState.value,
  //       }));
  //     })
  //     .catch((err) =>
  //       this.setState((state) => ({
  //         err: true,
  //         city: state.value,
  //       }))
  //     );
  // };
  // handleMove = () => {
  //   if (this.state.value.length > 0) {
  //     styleMedia;
  //   }
  // };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length === 0) return;
    if (prevState.value !== this.state.value) {
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${
        this.state.value
      }&appid=${APIKey}&units=metric`;

      fetch(API)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error("nie udało się");
        })
        .then((response) => response.json())
        .then((data) => {
          const time = new Date().toLocaleString();
          this.setState((prevState) => ({
            err: false,
            date: time,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp.toFixed(0),
            pressure: data.main.pressure,
            wind: data.wind.speed,
            city: prevState.value,
            country: data.sys.country,
          }));
        })
        .catch((err) =>
          this.setState((state) => ({
            err: true,
            city: state.value,
          }))
        );
    }
  }

  render() {
    // const { date, sunrise, sunset, temp, pressure, wind } = this.state;
    return (
      <div className="App">
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          // submit={this.handleCitySubmit}
        />
        <Result className="result" weather={this.state} />
        <div className="infoBar">
          <p>Informacje pogodowe dla: {this.state.city}</p>
          <span>{this.state.dateClock.toLocaleString()}</span>
        </div>
      </div>
    );
  }
}

export default App;
