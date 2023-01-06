import { container } from "tsyringe";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import config from "../config.json";

export default function init(): void
{
    // retrieving config files from the aki server
    const configServer = container.resolve<ConfigServer>("ConfigServer");
    const botConfig = configServer.getConfig<IBotConfig>(ConfigTypes.BOT);

    botConfig.pmc.isUsec = config.Bots["Usec:Bear"];
    botConfig.pmc.chanceSameSideIsHostilePercent = config.Bots["Friendly Fire Chance"];
    botConfig.pmc.convertIntoPmcChance.assault.min = config.Bots["PMC Generation"]["Scav to PMC Min"];
    botConfig.pmc.convertIntoPmcChance.assault.max = config.Bots["PMC Generation"]["Scav to PMC Max"];
    botConfig.pmc.convertIntoPmcChance.cursedAssault.min = 0; // we dont like cursed assault pmcs
    botConfig.pmc.convertIntoPmcChance.cursedAssault.max = 0;
    botConfig.pmc.convertIntoPmcChance.marksman.min = 0; // we dont like sniper pmcs
    botConfig.pmc.convertIntoPmcChance.marksman.max = 0;
    botConfig.pmc.convertIntoPmcChance.pmcbot.min = config.Bots["PMC Generation"]["Raider to PMC Min"];
    botConfig.pmc.convertIntoPmcChance.pmcbot.max = config.Bots["PMC Generation"]["Raider to PMC Max"];
    botConfig.pmc.convertIntoPmcChance.exusec.min = config.Bots["PMC Generation"]["Rogue to PMC Min"];
    botConfig.pmc.convertIntoPmcChance.exusec.max = config.Bots["PMC Generation"]["Rogue to PMC Max"];

}