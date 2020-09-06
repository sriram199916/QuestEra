import React, { Component } from 'react';
import {Form,Container,Button, InputGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import main from './main';
import quest from './quest';
import questStore from './questStore';

class Sbar extends Component{

    onIdChange=(event)=>{
        this.setState({qid:event.target.value})
      }
    
      onFetch= async (event)=>{
        event.preventDefault()
        const questAddress=await questStore.methods.questsById(this.state.qid).call()
        const Quest=quest(questAddress)
        console.log(questAddress)
        const reward=await Quest.methods.rewards().call()
        const time=await Quest.methods.time().call()
        const region=await Quest.methods.region().call()
        const tier=await Quest.methods.reqd_tier().call()
        const state=await Quest.methods.state().call()
        const desc=await Quest.methods.description().call()
        console.log("Rewards: "+reward+"\nTime: "+time+"\nRegion: "+region+"\nTier: "+tier+"\nState: "+state+"\nDescription: "+desc)
        const participants=await Quest.methods.getParticipants().call()
        console.log("Participants:")
        console.log(participants)
        console.log("Heroes:")
        const heroes=await Quest.methods.getHeroes().call()
        heroes.map(async (address)=>{
          const id=await main.methods.playerIDs(address).call()
          console.log(id)
        })
      }
      
      constructor(props) {
        super(props)
        this.state = {
          qid: ''
        }
      }

      render() {
        return (
          <div class="p-3">
            <Container>
              <Form>
                <InputGroup controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Quest ID" onChange={this.onIdChange} />
                    <InputGroup.Append>
                      <Button variant="dark" onClick={this.onFetch}>
                      Fetch Quest!
                      </Button>
                    </InputGroup.Append>
                </InputGroup>
              </Form>
            </Container>
          </div>
        );
      }

}

export default Sbar;