import React, { Component } from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import './App.css';
import web3 from './web3';
import Home from'./Home';
import QTools from './questTools';
import ATools from './adminTools';
import GTools from './guildTools';
import Player from './Player';
import Error from './Error';

class App extends Component {

  async componentWillMount() {
    await this.initiate()
  }

  async initiate(){
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0]})
  }

  constructor(props) {
    super(props)
    this.state = {
      account: ''
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
        <Route path="/" exact>
          <Home account={this.state.account}/>
        </Route>
        <Route path="/Admin">
          <ATools account={this.state.account}/>
        </Route>
        <Route path="/GuildMaster">
          <GTools account={this.state.account}/>
        </Route>
        <Route path="/Player">
          <Player account={this.state.account}/>
        </Route>
        <Route path="/Quest">
          <QTools account={this.state.account}/>
        </Route>
        <Route component={Error}/>
        </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
