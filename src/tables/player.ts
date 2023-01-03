import * as fs from "fs";
import toml from "toml";
import { container } from "tsyringe";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IInventoryConfig } from "@spt-aki/models/spt/config/IInventoryConfig";

export default function init(): void
{
    const configServer = container.resolve<ConfigServer>("ConfigServer");
    const inventoryConfig = configServer.getConfig<IInventoryConfig>(ConfigTypes.BOT);
    const config = toml.parse(fs.readFileSync("./../config.toml","utf-8"));


    if (config["All Items Examined"])
        inventoryConfig.newItemsMarkedFound = true;
    
}