import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import QTools from './questTools';
import Sbar from './searchBar';
import GTools from './guildTools';
import ATools from './adminTools';
import PTools from './playerTools';
import TTools from './teamTools';

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
      <div>
        <Sbar />
        <ATools account={this.state.account}/>
  </div>
    );
  }
}

export default App;
