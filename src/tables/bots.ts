import * as fs from "fs";
import toml from "toml";
import { container } from "tsyringe";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";

export default function init(): void
{
    // retrieving config files from the aki server
    const configServer = container.resolve<ConfigServer>("ConfigServer");
    const botConfig = configServer.getConfig<IBotConfig>(ConfigTypes.BOT);

    // tries to read the config file and stores it in "config"
    const config = toml.parse(fs.readFileSync("./../config.toml","utf-8"));

    // just lazy
    botConfig.pmc.isUsec = config["Usec:Bear"];
    botConfig.pmc.chanceSameSideIsHostilePercent = config["Friendly Fire Chance"];
    botConfig.pmc.convertIntoPmcChance = config["Scav to PMC"];
}