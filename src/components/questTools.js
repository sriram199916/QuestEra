import React, { Component } from 'react';
import {Form,Button,Container,Dropdown,DropdownButton} from 'react-bootstrap';
import main from './main'
import quest from './quest'; 
import questStore from './questStore';
import web3 from "./web3"
//IPFS to be implemented
class QTools extends Component {
      onIdChange=(event)=>{
        this.setState({qid:event.target.value})
      }
    
      onRegionChange=(event)=>{
        this.setState({region:event.target.value})
      }
    
      onTierChange=(eventKey,event)=>{
        event.preventDefault()
        const tiers=['Bronze','Silver','Gold','Diamond','Platinum']
        this.setState({tier:parseInt(eventKey)})
        this.setState({disp:tiers[eventKey]})
      }
    
      onRewardChange=(event)=>{
        this.setState({reward:event.target.value})
      }
    
      onDescChange=(event)=>{
        this.setState({desc:event.target.value})
      }
    
      onSubmit= async (event)=>{
        event.preventDefault()
        const gmaster=await main.methods.guildMasters(this.state.region).call()
        await questStore.methods.createQuest(this.state.qid,gmaster.master,Date.now().toString(),this.state.region,this.state.tier,this.state.desc).send({from:this.props.account,value:web3.utils.toWei(this.state.reward,"Ether")})
      }

      onAbort= async (event)=>{
        event.preventDefault()
        const questAddess=await questStore.methods.questsById(this.state.qid).call()
        const Quest=new quest(questAddess)
        await Quest.methods.abortQuest().send({from:this.props.account})
      }

      constructor(props) {
        super(props)
        this.state = {
          qid:'',
          region:'',
          tier:'',
          desc:'',
          reward:1,
          disp:'Choose Tier'
        }
      }

  render() {
      return (
        <div>
          <Container>
            <Form onSubmit={this.onSubmit} >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Quest ID:</Form.Label>
                <Form.Control type="text" placeholder="Quest ID" onChange={this.onIdChange} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Reward (in Ethers):</Form.Label>
                <Form.Control type="number" placeholder="Reward" onChange={this.onRewardChange} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Region:</Form.Label>
                <Form.Control type="text" placeholder="Region" onChange={this.onRegionChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Required Tier:</Form.Label>
                <DropdownButton variant="dark" bsStyle="success" title={this.state.disp} onSelect={this.onTierChange}>
                  <Dropdown.Item eventKey="0" >Bronze</Dropdown.Item>
                  <Dropdown.Item eventKey="1" >Silver</Dropdown.Item>
                  <Dropdown.Item eventKey="2" >Gold</Dropdown.Item>
                  <Dropdown.Item eventKey="3" >Diamond</Dropdown.Item>
                  <Dropdown.Item eventKey="4" >Platinum</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Description:</Form.Label>
                <Form.Control type="text" placeholder="Description" onChange={this.onDescChange} />
              </Form.Group>
              <Button variant="dark" type="submit">
               Create Quest!
              </Button>
            </Form>
            <hr/>
            <Form onSubmit={this.onAbort} >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Quest ID</Form.Label>
                <Form.Control type="text" placeholder="Quest ID" onChange={this.onIdChange} />
              </Form.Group>
              <Button variant="dark" type="submit">
               Abort Quest!
              </Button>
            </Form>
          </Container>
        </div>
      );
    }
}
    export default QTools;
