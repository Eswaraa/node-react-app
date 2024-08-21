import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
  const [config, setConfig] = useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
    fetch(`${process.env.REACT_APP_API_URL}/config`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data:", data);
        setConfig(data);
      });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>{!data ? "Loading..." : data}</p>
        <h1>Environment: {process.env.NODE_ENV}</h1>
        <p>API URL: {process.env.REACT_APP_API_URL}</p>
        <p>API Key: {process.env.REACT_APP_API_KEY}</p>
        <p>DB Host: {config?.dbHost}</p>
      </header>
    </div>
  );
}

export default App;
