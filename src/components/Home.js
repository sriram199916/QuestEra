import React, { Component } from 'react';
// import {Navbar,NavbarBrand,NavItem,Container,Row} from 'react-bootstrap';
import'bootstrap/dist/css/bootstrap.min.css';
class Home extends Component {

  goTo=(path)=>{
  const url=window.location.href.split('/')
  return url[0]+'/'+path
  }

  render() {
      return (
    <div>
    <div style={{position:'fixed',top:'0',zIndex:'-1'}} className="open container-fluid" >
      <nav class="navbar navbar-expand-lg navbar-dark" style={{background:'transparent'}} >
        <a class="navbar-brand" href={this.goTo('/')} style={{fontFamily: 'Cinzel',fontSize:'40px'}}>QuestEra</a>
        <div class="collapse navbar-collapse" id="navbarToggleExternalContent">
          <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href={this.goTo('Admin')}>Administator</a>
          </li>
            <li class="nav-item">
              <a class="nav-link" href={this.goTo('GuildMaster')}>GuildMaster</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href={this.goTo('Player')}>Player</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href={this.goTo('Quest')}>Create your own Quest!</a>
            </li>
          </ul>
            </div>
          </nav>
          <div className="titlecard mx-auto" style={{marginTop:'415px'}}/>
    </div>
    </div>
      );
  }
}

export default Home;
