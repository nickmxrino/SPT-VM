import * as fs from "fs";
import toml from "toml";
import { container } from "tsyringe";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";

export default function airdrop(): void
{
    // tries to read the config file and stores it in "config"
    const config = toml.parse(fs.readFileSync("./../config.toml","utf-8"));

    // retrieving config files from the aki server
    const configServer = container.resolve<ConfigServer>("ConfigServer");
    const airdropConfig = configServer.getConfig<IAirdropConfig>(ConfigTypes.AIRDROP);

    airdropConfig.airdropChancePercent.bigmap = config["ad-customs"];
    airdropConfig.airdropChancePercent.woods = config["ad-woods"];
    airdropConfig.airdropChancePercent.lighthouse = config["ad-lighthouse"];
    airdropConfig.airdropChancePercent.shoreline = config["ad-shoreline"];
    airdropConfig.airdropChancePercent.interchange = config["ad-interchange"];
    airdropConfig.airdropChancePercent.reserve = config["ad-reserve"];
}