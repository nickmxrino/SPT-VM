import * as fs from "fs";
import toml from "toml";
import { container } from "tsyringe";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";

export default function init(): void
{
    // retrieving tables from the database server
    const tables = container.resolve<DatabaseServer>("DatabaseServer").getTables();
    const globals = tables.globals.config;
    const items = tables.templates.items;
    const traders = tables.traders;
    const clothing = tables.templates.customization;

    // retrieving config files from the aki server
    const configServer = container.resolve<ConfigServer>("ConfigServer");
    const traderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);

    // tries to read the config file and stores it in "config"
    const config = toml.parse(fs.readFileSync("./../config.toml","utf-8"));

    globals.RagFair.minUserLevel = config["Flea Level"];
    globals.RagFair.enabled = (!config["Disable Flea"]);
    traderConfig.fence.assortSize = config["Assortment Size"];

    if (config["Disable Fleamarket Blacklist"])
        for (const id in items)
            items[id]._props.CanSellOnRagfair = true

    if (config["Disable Insurance"])
        for (const id in traders)
            traders[id].base.insurance.availability = false;

    if (config["Hybrid Clothing"])
        for (const item in clothing)
            clothing[item]._props.Side = ["Usec", "Bear", "Savage"];
}