import React, { Component } from 'react';
import {Form,Button,Container} from 'react-bootstrap';
import main from './main';

class TTools extends Component {

    onIdChange=(event)=>{
        this.setState({id:event.target.value})
      }

    onNameChange=(event)=>{
        this.setState({name:event.target.value})
      }

    onCreateTeam=async (event)=>{
        event.preventDefault()
        await main.methods.createTeam(this.state.id,this.state.name).send({from:this.props.account})
      }

    onAddMember=async (event)=>{
      event.preventDefault()
      await main.methods.addMember(this.state.id).send({from:this.props.account})
    }

    onRemoveMember=async (event)=>{
      event.preventDefault()
      await main.methods.removeMember(this.state.id).send({from:this.props.account})
    }

    onDissolveTeam=async (event)=>{
      event.preventDefault()
      await main.methods.dissolveTeam().send({from:this.props.account})
    }


    constructor(props) {
        super(props)
        this.state = {
          id:'',
          name:''
        }
      }

  render() {
      return (
        <div>
          <Container>
            <Form onSubmit={this.onCreateTeam}>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Team ID:</Form.Label>
                  <Form.Control type="text" placeholder="Team ID" onChange={this.onIdChange} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Team Name:</Form.Label>
                  <Form.Control type="text" placeholder="Team Name" onChange={this.onNameChange} />
               </Form.Group>
              <Button variant="dark" type="submit">
              Create Team!
              </Button>
            </Form>
            <hr/>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Player ID:</Form.Label>
                <Form.Control type="text" placeholder="Player ID" onChange={this.onIdChange} />
              </Form.Group>
              <Button variant="dark" onClick={this.onAddMember} >
              Add to Team!
              </Button>
              {' '}
              <Button variant="dark" onClick={this.onRemoveMember} >
              Remove from Team!
              </Button>
           </Form>
           <hr/>
          <Form onSubmit={this.onDissolveTeam}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Team ID:</Form.Label>
                <Form.Control type="text" placeholder="Team ID" onChange={this.onIdChange} />
              </Form.Group>
              <Button variant="dark" type="submit">
               Dissolve Team!
              </Button>
          </Form>
        </Container>
       </div>
      );
    }

}
    export default TTools;
