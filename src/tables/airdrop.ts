import { container } from "tsyringe";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";
import config from "../config.json";

export default function airdrop(): void
{
    // retrieving config files from the aki server
    const configServer = container.resolve<ConfigServer>("ConfigServer");
    const airdropConfig = configServer.getConfig<IAirdropConfig>(ConfigTypes.AIRDROP);

    airdropConfig.airdropChancePercent.bigmap = config.Airdrops["ad-customs"];
    airdropConfig.airdropChancePercent.woods = config.Airdrops["ad-woods"];
    airdropConfig.airdropChancePercent.lighthouse = config.Airdrops["ad-lighthouse"];
    airdropConfig.airdropChancePercent.shoreline = config.Airdrops["ad-shoreline"];
    airdropConfig.airdropChancePercent.interchange = config.Airdrops["ad-interchange"];
    airdropConfig.airdropChancePercent.reserve = config.Airdrops["ad-reserve"];
}