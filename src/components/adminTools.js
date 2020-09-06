import React, { Component } from 'react';
import {Form,Button,Container} from 'react-bootstrap';
import main from './main';

class ATools extends Component {

    onAddressChange=(event)=>{
        this.setState({gma:event.target.value})
      }

    onIdChange=(event)=>{
        this.setState({gid:event.target.value})
      }

    onNameChange=(event)=>{
        this.setState({name:event.target.value})
      }

    onAadhaarChange=(event)=>{
        this.setState({aadhaar:parseInt(event.target.value)})
      }

    onRegionChange=(event)=>{
        this.setState({region:event.target.value})
      }

    onSubmit=async (event)=>{
        event.preventDefault()
        await main.methods.createGuildMaster(this.state.gma,this.state.gid,this.state.aadhaar,this.state.region,this.state.name).send({from:this.props.account})
      }
      
    constructor(props) {
        super(props)
        this.state = {
          gma:'',
          gid:'',
          name:'',
          aadhaar:'',
          region:''  
        }
      }

  render() {
      return (
        <div>
          <Container>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>GuildMaster ID:</Form.Label>
                  <Form.Control type="text" placeholder="GuildMaster ID" onChange={this.onIdChange} />
                </Form.Group><Form.Group controlId="formBasicEmail">
                <Form.Label>GuildMaster Address:</Form.Label>
                  <Form.Control type="text" placeholder=" GuildMaster Address" onChange={this.onAddressChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Name:</Form.Label>
                  <Form.Control type="text" placeholder="Name" onChange={this.onNameChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Aadhaar Number:</Form.Label>
                  <Form.Control type="number" placeholder="Aadhaar Number" onChange={this.onAadhaarChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Region:</Form.Label>
                  <Form.Control type="text" placeholder="Region" onChange={this.onRegionChange} />
                </Form.Group>
                <Button variant="dark" type="submit">
                Create GuildMaster!
                </Button>
            </Form>
          </Container>
       </div>
      );
    }

}
    export default ATools;
