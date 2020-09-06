pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract main{
    address admin;
	enum Tier {Bronze, Silver, Gold, Diamond, Platinum}
    
    struct GuildMaster{
        address payable master; 
        string guild_id;
        uint aadhaar;
        string region_id;
        string name;
    }

    struct Player{
        string player_id; 
        uint aadhaar;
        address payable player;
        string team_id;
        string region_id;
        uint quest_count;
        uint completed_quests_individual;
        uint total_rewards;
        Tier player_tier;
        string name;
    }

    struct Team{
        string team_id;
        string region_id;             
        string leader;
		uint quest_count;
        uint completed_quests_team;
        uint team_rewards;
        Tier team_tier;
        string name;
    }

    constructor() public payable{
        admin=msg.sender;
    }

    mapping(string=>GuildMaster) public guildMasters;
    mapping(address=>string) public guildMasterIDs;
    mapping(string=>Player) public players;
    mapping(address=>string) public playerIDs;
    mapping(string=>Team) public teams;
    mapping(string=>string[]) public teamMembers;

    function string_check(string memory str1, string memory str2) pure internal returns (bool) {
        return (keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2)));
    }   

    function createGuildMaster(address payable _address,string memory _id,uint _aadhaar,string memory _region,string memory _name) public{
        require(msg.sender==admin,'Forbidden! Only admin has this previlege.');      
        guildMasters[_region] = GuildMaster(_address,_id,_aadhaar,_region,_name);
        guildMasterIDs[_address] = _region;
    }

    function getGuildMaster(string memory _region) public view returns (string memory,string memory,address payable){
        return(guildMasters[_region].guild_id,guildMasters[_region].name,guildMasters[_region].master);
    }

    function membership(string memory _id) public{
        string memory region = guildMasterIDs[msg.sender];
        require(msg.sender==guildMasters[region].master,'Only guildmaster can access this!');
        require(!string_check(players[_id].player_id,''),'Player doesnot exist!');        
        players[_id].region_id = guildMasters[region].region_id;
    } 

    function createPlayer(string memory _id,uint _aadhaar,string memory _name) public {
		require(string_check(players[_id].player_id,''),'This Player ID is not available');
        players[_id] = Player( _id,_aadhaar,msg.sender,'','',0,0,0,Tier.Bronze,_name);   
        playerIDs[msg.sender] = _id;
    } 

    function getPlayer(string memory _id) public view returns (string memory){
        return players[_id].name;
    }

    function createTeam(string memory _tid,string memory _name) public{
        string memory pid=playerIDs[msg.sender];
        require(!string_check('',players[pid].region_id),'Region must be assigned before Team creation!');
		require(string_check(teams[_tid].team_id,''),'This Team ID is already in use!');
        string memory tid = players[pid].team_id;
		if(!string_check(tid,'')){
		if(string_check(teams[tid].leader,pid)){
                if(teamMembers[tid].length>=1){
                    string memory target = teamMembers[tid][0];
                    removeMember(target);
                    teams[tid].leader = target;
                    players[target].team_id = tid;
                }
                else{
                    delete teams[tid];
                }
		}
		else{
			removeMember(pid);
		}
		}
        teams[_tid] = Team( _tid,players[pid].region_id,pid,0,0,0,Tier.Bronze,_name);
        players[pid].team_id=_tid;
    }

    function getTeam(string memory _id) public view returns (string memory,string memory,string[] memory){
        return(teams[_id].name,teams[_id].leader,teamMembers[_id]);
    }

    function addMember(string memory _id) public{
        string memory pid = playerIDs[msg.sender];
        string memory tid = players[pid].team_id;        
        require(string_check(pid,teams[tid].leader),'Only leader has access to this function!');	
		require(!string_check(players[_id].player_id,''),'Player doesnot exist!');        
        require(!string_check('',players[_id].region_id),'Players should have assigned a region before joining a team!');
		require(!string_check(pid,_id),'Leader cant add himself/herself to the team as a member!');
		require(!string_check(players[_id].team_id,players[pid].team_id),'Player is already in your team!');
        require(string_check('',players[_id].team_id),'Player belongs to another team!');
        require(teamMembers[tid].length<3,'Team can have only 3 members (excluding leader)!');
        teamMembers[tid].push(_id);
        players[_id].team_id=players[pid].team_id;
    }

    function removeMember(string memory _id) public returns(bool){
        string memory pid = playerIDs[msg.sender];
        string memory tid = players[pid].team_id;
        require(!string_check(players[_id].player_id,''),'Player doesnot exist!');        
        require(string_check(pid,teams[tid].leader) || string_check(pid,_id) ,'Removal can be done either by leader or himself/herself');
        players[_id].team_id='';
        for(uint ind=0;ind<teamMembers[tid].length;ind++){
            if(string_check(teamMembers[tid][ind],_id)){
                delete teamMembers[tid][ind];
               teamMembers[tid][ind] = teamMembers[tid][teamMembers[tid].length-1];
                delete teamMembers[tid][teamMembers[tid].length-1];
                teamMembers[tid].length--;
                return true;
            }
        }
        return false;
    }

    function dissolveTeam() public{
        string memory pid = playerIDs[msg.sender];
        string memory tid = players[pid].team_id;
        require(!string_check(tid,''),'You dont have a team yet!');
        require(string_check(pid,teams[tid].leader),'Only leader can access this function!');
        for(uint itr=0;itr<teamMembers[tid].length;itr++){
            players[teamMembers[tid][itr]].team_id='';
        }
        delete teamMembers[tid];
        delete teams[tid];
        players[pid].team_id='';
    }
	
	function changeTier(string memory _region,string memory _id,Tier _tier,bool _isTeam) public{
		require(msg.sender==guildMasters[_region].master,'Only GuildMaster can access this function');
		if(_isTeam){
			require(string_check(teams[_id].team_id,_id),'Team doesnot exist!');
			teams[_id].team_tier=_tier;
		}
		else{
			require(string_check(players[_id].player_id,_id),'Player doesnot exist!');
			players[_id].player_tier=_tier;
		}
	}
	
	function updateStats(string memory _region,string memory _id,uint _reward,bool _isTeam,bool _ishero) public{
		require(msg.sender==guildMasters[_region].master,'Only GuildMaster can access this function');
		if(_isTeam){
			require(string_check(teams[_id].team_id,_id),'Team doesnot exist!');
			teams[_id].quest_count+=1;
			if(_ishero){
			teams[_id].completed_quests_team+=1;
			teams[_id].team_rewards+=_reward;
			}
		}
		else{
			require(string_check(players[_id].player_id,_id),'Player doesnot exist!');
			players[_id].quest_count+=1;
			if(_ishero){
			players[_id].completed_quests_individual+=1;
			players[_id].total_rewards+=_reward;
			}
		}
	}
}

contract quest{
    address payable from;
    address payable guildMaster;
    string[] public participants;
    uint public rewards;
    string public time;
    string public region;
	enum Tier {Bronze, Silver, Gold, Diamond, Platinum}
    Tier public reqd_tier;
    string public description;
    address payable[] public heroes;
    mapping(string=>bool) public isahero;
    mapping(string=>address payable) public players;
    enum State { Posted, Live, Disapproved, Aborted, Ended }
    State public state;
	

    constructor(address payable _questCreator,address  payable _guildMaster,string memory _time,string memory _region,Tier _tier,string memory _desc) public payable{
        from = _questCreator;
        guildMaster = _guildMaster;
        rewards = msg.value;
        time = _time;
        region = _region;
        reqd_tier = _tier;
        description = _desc;
    }

    function string_check(string memory str1, string memory str2) pure internal returns (bool) {
        return (keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2)));
    } 

    function addParticipant(string memory _id,string memory _region,Tier _tier) public{
        require(string_check(region,_region),'This is not available in your region!');
        require(state==State.Live,'Event is not live yet!');
        require(from!=msg.sender,'You cannot participate on your own Quest!');
        require(players[_id]==address(0),'You are already a participant');
		require(reqd_tier<=_tier,'Your tier is below required one');
        participants.push(_id);
        players[_id] = msg.sender;
    }
	
	function getParticipants() public view returns(string[] memory){
		return(participants);
	}

    function getHeroes() public view returns(address payable[] memory){
		return(heroes);
	}

    function approveQuest() public{
        require(msg.sender==guildMaster,'Only GuildMaster can access it!');
        state = State.Live;
    }

    function abortQuest() public{
        require(msg.sender==from,'Only those who created this Quest can access it!');
        require(participants.length==0,'This can not be aborted now!');
        from.transfer(rewards*3/4);
        guildMaster.transfer(rewards*1/4);
        state = State.Aborted;
    }

    function disapproveQuest() public{
        require(msg.sender==guildMaster,'Only GuildMaster can access it!');
        from.transfer(rewards);
        state = State.Disapproved;
    }

    function addHero(string memory _id) public{
        require(msg.sender==guildMaster,'Only GuildMaster can access it!');
        require(state == State.Live,'Quest is not live!');
        require(players[_id]!=address(0),'Player doesnt exist!');
        require(isahero[_id]==false,'Already a hero!');
        heroes.push(players[_id]);
        isahero[_id] = true;
    }

    function completeQuest() public payable{
        require(msg.sender==guildMaster,'Only GuildMaster can access it!');
        require(state == State.Live,'Quest is not live!');
        require(heroes.length>0,'Heroes have to added!');
        rewards = rewards/heroes.length;
        for(uint itr=0;itr<heroes.length;itr++){
            heroes[itr].transfer(rewards);
        }
        state = State.Ended;
    }

}

contract questStore{

    mapping(string=>address) public questsById;
    mapping(string=>string[]) public questsByRegion;

    function string_check(string memory str1, string memory str2) pure internal returns (bool) {
        return (keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2)));
    }  

    function createQuest(string memory _qid,address payable _guildMaster,string memory _time,string memory _region,quest.Tier _tier,string memory _desc) public payable{
	    require(questsById[_qid]==address(0),"Quest ID already in use");
        address Quest = address((new quest).value(msg.value)(msg.sender,_guildMaster,_time,_region,_tier,_desc));
	    questsById[_qid] = Quest;
	    questsByRegion[_region].push(_qid);
	}
	
	function clearQuest(string memory _qid,string memory _rid) public returns(bool){
	    require(questsById[_qid]!=address(0),"Quest is unknown!");
	    for(uint ind=0;ind<questsByRegion[_rid].length;ind++){
            if(string_check(questsByRegion[_rid][ind],_qid)){
                delete questsByRegion[_rid][ind];
               questsByRegion[_rid][ind] = questsByRegion[_rid][questsByRegion[_rid].length-1];
                delete questsByRegion[_rid][questsByRegion[_rid].length-1];
                questsByRegion[_rid].length--;
                return true;
            }
        }
        return false;
	}
}