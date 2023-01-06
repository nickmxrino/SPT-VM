# SPT-VM (SPT - Value Modifier)
Basic value modifier for client & server-sided spt values.
Currently v1.0.0 @ SPT-AKI v3.5.0
> As this mod is not made for public usage, no support or aid
> may be provided to anybody who chooses to use it.

## Configuration Options
format: `option = default / type : property descripton`

### Player & Health Section
**All Items Examined** = *false* / boolean : renders all items already examined   
**Armored Rigs** = *false* / boolean : allows armor rigs to be worn with vests   
**Disable Container Restrictions** = *false* / boolean : allow all items to fit inside secure containers   
**Disable Penalties** = *false* / boolean : remove all gear penalties (ie. mouse speed)   
**Disable Malfunctions** = *false* / boolean : remove all weapon malfunction chances   
**Scavmode Cooldown** = *1200* / number : modify the time in seconds between scav runs   
**Weight Modifier** = *1.0* / float : multiply the weight of all items   

**Disable Fall Damage** = *false* / boolean : set all fall heights to safe   
**Disable Hunger** = *false* / boolean : disable hunger and hydration loops   
**Energy Drain** = *3.2* / float : how many energy pts are drained every minute   
**Hydration Drain** = *2.6* / float : how many hydration pts are drained every minute   

### Skill & Experience Section
**Survived** = *1.3* / float : experience modifier on raid survival   
**Killed** = *1.0* / float : experience modifier for raid kia   
**Runthru** = *0.5* / flaot : experience modifier for run through raids   
**Headshot** = *1.2* / float : experience modifier for headshot kills   

**Wep Skill Rate** = *1.0* / float : progression modifier for weapon skills   
**Soft Skill Rate** = *0.4* / float : progression modifier for soft skills   
**Disable Skill Fatigue** = *false* / boolean : disables all aspects of skill fatigue   

### Bot Section
**Usec:Bear** = *50* / number : percentage-wise value of how many pmcs are usec   
**Friendly Fire Chance** = *50* / number : percentage-wise value of whether a pmc of same side may shoot you   

**Scav to PMC Min/Max** = *0* / number : chance of scavs converting to ai-pmcs   
**Raider to PMC Min/Max** = *0* / number : chance of raiders converting to ai-pmcs (affects labs)   
**Rogue to PMC Min/Max** = *0* / number : chance of rogues converting to ai-pmcs (affects lighthouse)   

### Traders, Flea & Fence Section
**Flea Level** = *15* / number : default level for flea market access   
**Disable Flea** = *false* / boolean : disables flea market access altogether   
**Disable Flea Blacklist** = *false* / boolean : disables all blacklisted flea items   

**Fence Assortment Size** = *100* / number : how many items fence holds at once   

**Disable Insurance** = *false* / boolean : disables prapor & therapist insurance options   
**Hybrid Clothing** = *false* / boolean : allow usec clothing on bears and vice-versa    

### Hideout Section
**Instant Construction** = *false* / boolean : make all construction instant    
**Construction Modifier** = *1.0* / float : multiply all construction times by value   
**Instant Production** = *false* / boolean : make all production instant   
**Production Modifier** = *1.0* / float : multiply all production times by value   

### InRaid Section
**Consistent Extracts** = *false* / boolean : make all ??? extracts always available   

**Raid Duration** : modify raid time   
> Customs: *40*   
> Factory: *20*   
> Interchange: *40*   
> Labs: *35*   
> Reserve: *40*   
> Shoreline: *45*   
> Woods: *40*   
> Lighthouse: *40*   
> Streets: *50*   

**Boss Section** : modify chance, guard count, and location of each scav boss   
> Reshala Locations: "ZoneDormitory,ZoneGasStation"   
> Killa Locations: "ZoneCenterBot,ZoneCenter,ZoneOLI,ZoneIDEA,ZoneGoshan,ZoneIDEAPark,ZoneOLIPark"   
> Gluhar Locations: "ZoneRailStrorage,ZoneRailStrorage,ZoneRailStrorage,ZonePTOR1,ZonePTOR2,ZoneBarrack,ZoneBarrack,ZoneBarrack,ZoneSubStorage"   
> Sanitar Locations: "ZonePort,ZoneGreenHouses,ZoneSanatorium1,ZoneGreenHouses,ZoneSanatorium2"   
> Goonsquad Locations: "Zone_TreatmentContainers,Zone_Chalet"   

### Airdrop Section
**ad-map** = *1.0* / float : modify the chance of an airdrop occuring in each map   
