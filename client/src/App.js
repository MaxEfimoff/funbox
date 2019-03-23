import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

import Map from "./components/Map";
import Posts from "./components/Posts";
import DestinationForm from "./components/Destinationform";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div>
            <DestinationForm />
            <Posts />
            <Map />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
