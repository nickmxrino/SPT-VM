import { container } from "tsyringe";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import config from "../config.json";

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

    globals.RagFair.minUserLevel = config.Traders.Flea["Flea Level"];
    globals.RagFair.enabled = (!config.Traders.Flea["Disable Flea"]);
    traderConfig.fence.assortSize = config.Traders.Fence["Assortment Size"];

    if (config.Traders.Flea["Disable Fleamarket Blacklist"])
        for (const id in items)
            items[id]._props.CanSellOnRagfair = true

    if (config.Traders.Trader["Disable Insurance"])
        for (const id in traders)
            traders[id].base.insurance.availability = false;

    if (config.Traders.Trader["Hybrid Clothing"])
        for (const item in clothing)
            clothing[item]._props.Side = ["Usec", "Bear", "Savage"];
}