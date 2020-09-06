import React, { Component } from 'react';
import {Form,Button,Container,Dropdown,DropdownButton} from 'react-bootstrap';
import main from './main';
import quest from './quest';
import questStore from './questStore';

class PTools extends Component {

    onIdChange=(event)=>{
        this.setState({id:event.target.value})
      }

    onNameChange=(event)=>{
        this.setState({name:event.target.value})
      }

    onAadhaarChange=(event)=>{
        this.setState({aadhaar:parseInt(event.target.value)})
      }

    onJoinChange=(eventKey)=>{
        this.setState({disp:"Join As: "+eventKey})
    }

    onCreatePlayer=async (event)=>{
        event.preventDefault()
        try{
        await main.methods.createPlayer(this.state.id,this.state.aadhaar,this.state.name).send({from:this.props.account})
        }
        catch(error){
          console.log(error)
        }
      }

    onParticipate=async (event)=>{
      event.preventDefault()
      const playerID=await main.methods.playerIDs(this.props.account).call()
      const player=await main.methods.players(playerID).call()
      const questAddess=await questStore.methods.questsById(this.state.id).call()
      const Quest=new quest(questAddess)
      let block=false
      let Id=player.player_id
      if(this.state.disp==='Join As: Team' && player.team_id!==''){
        Id=player.team_id
        const team=await main.methods.teams(Id).call()
        if(team.leader!==player.player_id){
          block=true
          alert("Only Team Leader can enroll his/her team in a Quest!")
        }
      }
      if(!block)
      await Quest.methods.addParticipant(Id,player.region_id,player.player_tier).send({from:this.props.account})
    }

    constructor(props) {
        super(props)
        this.state = {
          id:'',
          name:'',
          aadhaar:'',
          disp:'Join As:'
        }
      }

  render() {
      return (
        <div>
          <Container>
            <Form onSubmit={this.onCreatePlayer}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Player ID:</Form.Label>
                <Form.Control type="text" placeholder="Player ID" onChange={this.onIdChange} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" placeholder="Name" onChange={this.onNameChange} />
              </Form.Group>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Aadhaar Number:</Form.Label>
                <Form.Control type="number" placeholder="Aadhaar Number" onChange={this.onAadhaarChange} />
              </Form.Group>
              <Button variant="dark" type="submit">
              Create Player!
              </Button>
              </Form>
            <hr/> 
          <Form onSubmit={this.onParticipate}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Quest ID:</Form.Label>
                <Form.Control type="text" placeholder="Quest ID" onChange={this.onIdChange} />
              </Form.Group>
              <Form.Group>
                <DropdownButton variant="dark" bsStyle="success" title={this.state.disp} onSelect={this.onJoinChange}>
                  <Dropdown.Item eventKey="Solo" >Solo</Dropdown.Item>
                  <Dropdown.Item eventKey="Team" >Team</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
              <Button variant="dark" type="submit" >
              Participate in Quest!
               </Button>
           </Form>
         </Container>
       </div>
      );
    }

}
    export default PTools;
