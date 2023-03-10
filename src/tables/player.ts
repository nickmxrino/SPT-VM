import { container } from "tsyringe";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IInventoryConfig } from "@spt-aki/models/spt/config/IInventoryConfig";
import config from "../config.json";

export default function init(): void
{
    // retrieving tables from the database server
    const tables = container.resolve<DatabaseServer>("DatabaseServer").getTables();
    const globals = tables.globals.config;
    const items = tables.templates.items;

    // retrieving config files from the aki server
    const configServer = container.resolve<ConfigServer>("ConfigServer");
    const inventoryConfig = configServer.getConfig<IInventoryConfig>(ConfigTypes.INVENTORY);
    
    // short gameplay options
    if (config.Player["All Items Examined"])
        inventoryConfig.newItemsMarkedFound = true;

    globals.SavagePlayCooldown = config.Player["Scavmode Cooldown"];

    if (config.Player["Weight Modifier"] !== 1.0)
        for (const id in items)
            items[id]._props.Weight *= config.Player["Weight Modifier"];

    // short health options
    if (config.Player.Health["Disable Fall Damage"])
        globals.Health.Falling.DamagePerMeter = 0;

    globals.Health.Effects.Existence.EnergyDamage = config.Player.Health["Energy Drain"];
    globals.Health.Effects.Existence.HydrationDamage = config.Player.Health["Hydration Drain"];

    if (config.Player["Armored Rigs"])
    {
        for (const id in items)
            // checks for restriction property and disables it
            if (items[id]._props.BlocksArmorVest) 
                items[id]._props.BlocksArmorVest = false;
    }

    if (config.Player["Disable Container Restrictions"])
    {
        for (const id in items)
            // if an item is a container ... clears the item filter
            if (items[id]._parent === "5448bf274bdc2dfc2f8b456a")
                items[id]._props.Grids[0]._props.filters = [];
    }

    if (config.Player["Disable Backpack Restrictions"])
    {
        for (const id in items)
            // if an item is a backpack ... clears the item filter
            if (items[id]._parent === "5448e53e4bdc2d60728b4567")
                items[id]._props.Grids[0]._props.filters = [];
    }

    if (config.Player["Disable Penalties"])
    {
        for (const id in items)
        {   // if the item is a piece of headwear...
            if (items[id]._parent === "5a341c4086f77401f2541505")
            {   // clears out penalties
                items[id]._props.mousePenalty = 0;
                items[id]._props.speedPenaltyPercent = 0;
                items[id]._props.weaponErgonomicPenalty = 0;
            } // if the item is a piece of body armor...
            if (items[id]._parent === "5448e54d4bdc2dcc718b4568")
            {   // clears out penalties
                items[id]._props.mousePenalty = 0;
                items[id]._props.speedPenaltyPercent = 0;
                items[id]._props.weaponErgonomicPenalty = 0;
            }
        }
    }

    if (config.Player["Disable Malfunctions"])
    {
        for (const id in items)
        {   // checks if an item has malfunction props and disables them
            if (items[id]._props.AllowJam)
                items[id]._props.AllowJam = false;
            if (items[id]._props.AllowFeed)
                items[id]._props.AllowFeed = false;
            if (items[id]._props.AllowMisfire)
                items[id]._props.AllowMisfire = false;
            if (items[id]._props.AllowSlide)
                items[id]._props.AllowSlide = false;
            if (items[id]._props.AllowOverheat)
                items[id]._props.AllowOverheat = false;
        }
    }

    if (config.Player.Health["Disable Hunger"])
    {
        globals.Health.Effects.Existence.EnergyDamage = 0;
        globals.Health.Effects.Existence.HydrationDamage = 0;
    }
}