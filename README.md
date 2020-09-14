QuestEra - Your Adventure begins here :
 
Setting up Things:

		1) Use command 'npm i' to install required dependencies

		2) Use command 'npm run start' to start the development server

What is QuestEra?

		This is actually a simulation of Guild Systems where you can create or conquer quests for rewards.

How this Works?
	
		This Guild System has following actors:
			
			*) Administator

			*) Guild Master

			*) Players
		
			*) Team

			*) Hero

		Administrator: This one is responsible for entire System. He assigns a Guild Master for a region.

		Guild Master: This one manages the region assigned to him/her. He is the one who can provide membership of his/her Guild to players upon request. He/She is also responsible for approving,disapproving Quests as well as adding Heros to Quests and conclude them.

		Player: Everyone can register themselves as Player but they wont have region mapped with them until they get membership from a GuildMaster. He/She can request a GuildMaster to do so. Player can create or join a Team.

		Team: Every Team can have 3 members along with a TeamLeader. When a Team joins a Quest and conquer it, Team Leader will get the rewards. When Team Leader creates a new Team, the first ever Team Member will be crowned as leader. When a Team Member decides to create a new Team, he/she will be removed from old Team. Teams with no members will be discarded.

		Hero: Player/Team with submission a valid proof of Quest completion shall be crowned as Hero by the Guild Master and will get a share of reward along with other heros.

Who can give Quests ?

		Anyone can create Quests but the GuildMaster has to approve them inorder for Players/Teams to participate. Quest's requirements can be specified in description which will help Guild Master in choosing Heros. Creator of Quest has to pay the rewards which will be stored in Contracts and will be distributed to Heros upon Quest completion. A Quest with zero participants can be discarded by the Creator with the consequence of Guild Master receiving a small part of reward and remaining part will be refunded to the Creator. 

Future Works to be implemented:

		*) Grinding System

		*) Armors as rewards for completing Quests		
