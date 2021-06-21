import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Table } from "./components/Table";
import { Chart } from './components/Chart';
import { Geo } from "./components/Geo";
import { Navbar } from "./components/Navbar";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { start, eventshourly, eventsdaily, statsdaily, statshourly, poi, table_data, geo_data } from './api_calls';
import { Ieventshourly, Ieventsdaily, Istatshourly, Istatsdaily, Ipoi, Itable_data, Igeo_data } from './interfaces';

const App: React.FC = () => {
  const [User, setUser] = useState<string>("");
  const [Poi, setPoi] = useState<Ipoi[]>();
  const [Statsdaily, setStatsdaily] = useState<Istatsdaily[]>();
  const [Statshourly, setStatshourly] = useState<Istatshourly[]>();
  const [Eventshourly, setEventshourly] = useState<Ieventshourly[]>();
  const [Eventsdaily, setEventsdaily] = useState<Ieventsdaily[]>();
  const [Table_data, setTable_data] = useState<Itable_data[]>();
  const [Geo_Data, setGeo_Data] = useState<Igeo_data[]>();

  useEffect(() => {
    start(setUser);
  }, [])
  useEffect(() => {
    if (User !== "") {
      console.log("test")
      eventshourly(setEventshourly);
      eventsdaily(setEventsdaily);
      statsdaily(setStatsdaily);
      statshourly(setStatshourly)
      poi(setPoi);
      table_data(setTable_data);
      geo_data(setGeo_Data);
    }
  }, [User])


  return (
    <div >
      <BrowserRouter>
        <Navbar />
        <div id="userinfo"><span>User ID:</span> {User}</div>
        {/* <div>Poi:{Poi?.toString()}</div>
        <div>Stats:{Statsdaily?.toString()}</div>
        <div>Stats:{Statshourly?.toString()}</div>
        <div>Events:{Eventshourly?.toString()}</div>
        <div>Events:{Eventsdaily?.toString()}</div> */}
        <Switch>
          <Route exact path='/'>
            <Chart statshour={Statshourly} statsdaily={Statsdaily} poi={Poi} eventshour={Eventshourly} eventsdaily={Eventsdaily} />
          </Route>

          <Route path='/chart'>
            <Chart statshour={Statshourly} statsdaily={Statsdaily} poi={Poi} eventshour={Eventshourly} eventsdaily={Eventsdaily} />
          </Route>
          <Route path='/table' >
            <Table data={Table_data} />
          </Route>
          <Route path='/geo'>
            <Geo data={Geo_Data} />
          </Route>
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
