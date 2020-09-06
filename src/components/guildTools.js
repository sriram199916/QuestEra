import React, { Component } from 'react';
import main from './main';
import quest from './quest';
import questStore from './questStore';
import { Form,Container,Button,Dropdown,DropdownButton} from 'react-bootstrap';

class GTools extends Component {

    onIdChange=(event)=>{
        this.setState({pid:event.target.value})
      }

    onQIdChange=(event)=>{
        this.setState({qid:event.target.value})
      }
    
    onTierChange= async (eventKey,event)=>{
      event.preventDefault()
      const player=await main.methods.players(this.state.pid).call()
      const team=await main.methods.teams(this.state.pid).call()
      const tiers=['Bronze','Silver','Gold','Diamond','Platinum']
      if(team.team_id===''){
        this.setState({region:player.region_id})
        this.setState({disp:tiers[player.player_tier]+"=>"+tiers[eventKey]})
        this.setState({tier:eventKey})
      }
      else{
        this.setState({region:team.region_id})
        this.setState({disp:tiers[team.team_tier]+"=>"+tiers[eventKey]})
        this.setState({tier:eventKey})
        this.setState({team:true})
      }
    }

    onMembership=async (event)=>{
        event.preventDefault()
        await main.methods.membership(this.state.pid).send({from:this.props.account})
    }

    onApprove=async (event)=>{
        event.preventDefault()
        const questAddress=await questStore.methods.questsById(this.state.qid).call()
        const Quest=quest(questAddress);        
        await Quest.methods.approveQuest().send({from:this.props.account})
    }

    onDisapprove=async (event)=>{
        event.preventDefault()
        const questAddress=await questStore.methods.questsById(this.state.qid).call()
        const Quest=quest(questAddress);
        await Quest.methods.disapproveQuest().send({from:this.props.account})
    }

    onUpgrade=async (event)=>{
      event.preventDefault()
      await main.methods.changeTier(this.state.region,this.state.pid,this.state.tier,this.state.team).send({from:this.props.account})
    }

    onQuestComplete=async(event)=>{
      event.preventDefault()
      const questAddress=await questStore.methods.questsById(this.state.qid).call()
      const Quest=quest(questAddress);
      await Quest.methods.completeQuest().send({from:this.props.account})
    }

    onAddHero=async(event)=>{
      event.preventDefault()
      const questAddress=await questStore.methods.questsById(this.state.qid).call()
      const Quest=quest(questAddress);
      await Quest.methods.addHero(this.state.pid).send({from:this.props.account})
    }

    onStatChange=async(event)=>{
      event.preventDefault()
      const team=await main.methods.teams(this.state.pid).call()
      const questAddress=await questStore.methods.questsById(this.state.qid).call()
      const Quest=quest(questAddress);
      const reward=await Quest.methods.rewards().call()
      const isHero=await Quest.methods.isahero(this.state.pid).call()
      let region
      let isTeam
      if(team.team_id===''){
        const player=await main.methods.players(this.state.pid).call()
        region=player.region_id
        isTeam=false
      }
      else{
        region=team.region_id
        isTeam=true
      }
     await main.methods.updateStats(region,this.state.pid,reward,isTeam,isHero).send({from:this.props.account})
    }

    constructor(props) {
        super(props)
        this.state = {
          pid:'',
          qid:'',
          disp:'Choose Tier',
          region:'',
          team:false,
          tier:''
        }
      }

  render() {
      return (
        <div>
          <Container>
            <Form onSubmit={this.onMembership} >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Player ID:</Form.Label>
                <Form.Control type="text" placeholder="Player ID" onChange={this.onIdChange} />
              </Form.Group>
              <Button variant="dark" type="submit" >
              Add to your Guild!
              </Button>
            </Form> 
            <hr/>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Quest ID:</Form.Label>
                <Form.Control type="text" placeholder="Quest ID" onChange={this.onQIdChange} />
              </Form.Group>
              <Button variant="dark" onClick={this.onApprove} >
              Approve Quest!
              </Button>
              {' '}
              <Button variant="dark" onClick={this.onDisapprove} >
              Disapprove Quest!
              </Button>
            </Form>
            <hr/>
            <Form onSubmit={this.onUpgrade} >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Player ID/Team ID:</Form.Label>
                <Form.Control type="text" placeholder="PlayerID/TeamID" onChange={this.onIdChange} />
              </Form.Group>
              <Form.Group>
              <Form.Label>Tier Upgrade:</Form.Label>
                <DropdownButton variant="dark" bsStyle="success" title={this.state.disp} onSelect={this.onTierChange}>
                  <Dropdown.Item eventKey="0" >Bronze</Dropdown.Item>
                  <Dropdown.Item eventKey="1" >Silver</Dropdown.Item>
                  <Dropdown.Item eventKey="2" >Gold</Dropdown.Item>
                  <Dropdown.Item eventKey="3" >Diamond</Dropdown.Item>
                  <Dropdown.Item eventKey="4" >Platinum</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
              <Button variant="dark" onClick={this.onUpgrade} >
              Upgrade Tier!
              </Button>
            </Form>
            <hr/>
            <Form onSubmit={this.onQuestComplete} >
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Quest ID:</Form.Label>
                <Form.Control type="text" placeholder="Quest ID" onChange={this.onQIdChange} />
              </Form.Group>
              <Button variant="dark" type="submit" >
              Complete Quest!
              </Button>
            </Form>
            <hr/>
            <Form onSubmit={this.onAddHero} >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Quest ID:</Form.Label>
                <Form.Control type="text" placeholder="Quest ID" onChange={this.onQIdChange} />
              </Form.Group>
              <Form.Group>
              <Form.Label>Player ID/Team ID:</Form.Label>
                <Form.Control type="text" placeholder="PlayerID/TeamID" onChange={this.onIdChange} />
              </Form.Group>
              <Button variant="dark" type="submit" >
              Add Hero!
              </Button>
            </Form>
            <hr/>
            <Form onSubmit={this.onStatChange} >
              <Form.Group>
              <Form.Label>Player ID/Team ID:</Form.Label>
                <Form.Control type="text" placeholder="PlayerID/TeamID" onChange={this.onIdChange} />
              </Form.Group>
              <Button variant="dark" type="submit" >
              Update Stats!
              </Button>
            </Form>
          </Container>
      </div>
      );
    }

}
    export default GTools;
