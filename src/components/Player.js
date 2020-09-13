import React, { Component } from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import PTools from './playerTools';
import TTools from './teamTools';
import Sbar from './searchBar'

class Player extends Component {

  goTo=(path)=>{
  const url=window.location.href.split('/')
  return url[0]+path
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      region:'',
      tid:''
    }
  }

  render() {
    return (
      <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
<a class="navbar-brand" href={this.goTo('/')}>QuestEra</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav">
    <li class="nav-item active">
      <a class="nav-link" href={this.goTo('/Player')}>Player<span class="sr-only">(current)</span></a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href={this.goTo('/Player/Team')}>Team</a>
    </li>
    </ul>
</div>
</nav>
<Sbar/>
<BrowserRouter>
  <Switch>
  <Route path="/Player" exact>
    <PTools account={this.props.account}/>
  </Route>
  <Route path="/Player/Team">
    <TTools account={this.props.account}/>
  </Route>
  </Switch>
  </BrowserRouter>
</div>
    );
  }

}
export default Player;
