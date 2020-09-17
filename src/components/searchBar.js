import React, { Component } from 'react';
import {Form,Container,Button,InputGroup,Dropdown,DropdownButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import main from './main';
import quest from './quest';
import questStore from './questStore';
import web3 from './web3';

class Sbar extends Component{

    onIdChange=(event)=>{
        this.setState({qid:event.target.value})
      }

      onOption=(eventKey)=>{
        if(eventKey==='0'){
          this.setState({iphelp:'Quest ID'})
          this.setState({disp:'Quest'})
        }
        else if(eventKey==='1'){
          this.setState({iphelp:'Player ID'})
          this.setState({disp:'Player'})
        }
        else if(eventKey==='2'){
          this.setState({iphelp:'Team ID'})
          this.setState({disp:'Team'})
        }
        else{
          this.setState({iphelp:'Region'})
          this.setState({disp:'GuildMaster'})
        }
      }

      onFetch=async (event)=>{
        event.preventDefault()
      const selection=this.state.disp
      if(selection==='Quest')
       this.onFetchQuest()
      else if(selection==='Player')
       this.onFetchPlayer()
      else if(selection==='Team')
       this.onFetchTeam()
      else if(selection==='GuildMaster')
       this.onFetchGuild()
      else
        alert('Choose a Search Team')
      }

      onFetchQuest= async ()=>{
        let notice;
        const qstats={0:'Posted',1:'Live',2:'Disapproved',3:'Aborted',4:'Ended'}
        const tiers={0:'Bronze',1:'Silver',2:'Gold',3:'Diamond',4:'Platinum'}
        const questAddress=await questStore.methods.questsById(this.state.qid).call()
        const Quest=quest(questAddress)
        console.log(questAddress)
        const reward=await Quest.methods.rewards().call()
        const time=await Quest.methods.time().call()
        const region=await Quest.methods.region().call()
        if(region===null)
        notice='Quest doesnot exist!'
        else{
        const tier=await Quest.methods.reqd_tier().call()
        const state=await Quest.methods.state().call()
        const desc=await Quest.methods.description().call()
        notice="Rewards: "+web3.utils.fromWei(reward.toString())+" Ethers\nTime: "+time+"\nRegion: "+region+"\nTier: "+tiers[tier]+"\nStatus: "+qstats[state]+"\nDescription: "+desc
        const participants=await Quest.methods.getParticipants().call()
        notice=notice+"\nParticipants: "+participants+"\nHeroes (Followed by hashKey):"
        const heroes=await Quest.methods.getHeroes().call()
        for(var itr=0;itr<heroes.length;itr++)
        {
          const id=await main.methods.playerIDs(heroes[itr]).call()
          const player=await main.methods.players(id).call()
          let proof=await Quest.methods.heroProof(id).call()
          if(proof==='')
          proof=await Quest.methods.heroProof(player.team_id).call()
          notice=notice+ "\n"+id+' : '+proof
        }
        notice=notice+'\n\n To preview proof of Hero visit: https://ipfs.infura.io/ipfs/hashKey'
      }
        alert(notice)
      }

      onFetchPlayer= async ()=>{
        let notice;
        const tiers={0:'Bronze',1:'Silver',2:'Gold',3:'Diamond',4:'Platinum'}
        const player=await main.methods.players(this.state.qid).call()
        notice='Name: '+player.name+'\nRegion: '+player.region_id+'\nTier: '+tiers[player.player_tier]
        if(player.team_id!=='')
        notice=notice+'\nTeam ID: '+player.team_id
        notice=notice+'\nQuests Attended: '+player.quest_count+'\nQuests Won: '+player.completed_quests_individual+'\nEarned Rewards: '+web3.utils.fromWei((player.total_rewards).toString())+' Ethers'
        alert(notice)
      }

      onFetchTeam= async ()=>{
        let notice;
        const tiers={0:'Bronze',1:'Silver',2:'Gold',3:'Diamond',4:'Platinum'}
        const team=await main.methods.teams(this.state.qid).call()
        notice='Leader: '+team.leader+'\nRegion: '+team.region_id+'\nTier: '+tiers[team.team_tier]+'\nParticipants: '
        let members=await main.methods.getTeam(this.state.qid).call()
        for(var i=2;i<5;i++){
          if(members[i]===undefined)
          break
          notice=notice+members[i]+','
        }
        notice=notice+'\nQuests Attended: '+team.quest_count+'\nQuests Won: '+team.completed_quests_team+'\nEarned Rewards: '+web3.utils.fromWei((team.team_rewards).toString())+' Ethers'
        alert(notice)
      }

      onFetchGuild= async ()=>{
        let notice;
        const gmaster=await main.methods.guildMasters(this.state.qid).call()
        notice='GuildMaster ID: '+gmaster.guild_id+'\nName: '+gmaster.name+'\nAddress: '+gmaster.master
        alert(notice)
      }

      constructor(props) {
        super(props)
        this.state = {
          qid: '',
          disp:'Choose a Search Term!',
          iphelp:''
        }
      }

      render() {
        return (
          <div class="p-3">
            <Container>
              <Form>
                <InputGroup controlId="formBasicEmail">
                  <Form.Control type="text" placeholder={this.state.iphelp} onChange={this.onIdChange} />
                  <DropdownButton variant="dark" bsStyle="success" title={this.state.disp} onSelect={this.onOption}>
                    <Dropdown.Item eventKey="0">Quest</Dropdown.Item>
                    <Dropdown.Item eventKey="1">Player</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Team</Dropdown.Item>
                    <Dropdown.Item eventKey="3">GuildMaster</Dropdown.Item>
                  </DropdownButton>
                    <InputGroup.Append>
                      <Button variant="dark" onClick={this.onFetch}>
                      Fetch!
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
