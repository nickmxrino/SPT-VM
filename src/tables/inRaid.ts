import { container } from "tsyringe";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import config from "../config.json";

function initDurations(durations: number): void
{
    const locations = container.resolve<DatabaseServer>("DatabaseServer").getTables().locations;
    for (const map in locations)
    {
        const current = locations[map];
        switch (current)
        {
            case "bigmap":
                current.base.EscapeTimeLimit = durations[0];
                break;
            case "factory4_day" || "factory4_night":
                current.base.EscapeTimeLimit = durations[1];
                break;
            case "interchange":
                current.base.EscapeTimeLimit = durations[2];
                break;
            case "laboratory":
                current.base.EscapeTimeLimit = durations[3];
                break;
            case "reservbase":
                current.base.EscapeTimeLimit = durations[4];
                break;
            case "shoreline":
                current.base.EscapeTimeLimit = durations[5];
                break;
            case "woods":
                current.base.EscapeTimeLimit = durations[6];
                break;
            case "lighthouse":
                current.base.EscapeTimeLimit = durations[7];
                break;
            case "tarkovstreets":
                current.base.EscapeTimeLimit = durations[8];
                break;
        }
    }
}

export default function init(): void
{
    // retrieving tables from the database server
    const tables = container.resolve<DatabaseServer>("DatabaseServer").getTables();
    const locations = tables.locations;

    const customsGoonsquad = locations["bigmap"].base.BossLocationSpawn[0];
    const customsReshala = locations["bigmap"].base.BossLocationSpawn[1];
    const customsCultist = locations["bigmap"].base.BossLocationSpawn[2];
    const interchangeKilla = locations["interchange"].base.BossLocationSpawn[0];
    const dayFactoryTagilla = locations["factory4_day"].base.BossLocationSpawn[0];
    const nightFactoryTagilla = locations["factory4_night"].base.BossLocationSpawn[0];
    const nightFactoryCultist = locations["factory4_night"].base.BossLocationSpawn[1];
    const reserveGluhar = locations["rezervbase"].base.BossLocationSpawn[0];
    const woodsGoonsquad = locations["woods"].base.BossLocationSpawn[0];
    const woodsShturman = locations["woods"].base.BossLocationSpawn[1];
    const woodsCultist = locations["woods"].base.BossLocationSpawn[2];
    const shorelineGoonsquad = locations["shoreline"].base.BossLocationSpawn[0];
    const shorelineSanitar = locations["shoreline"].base.BossLocationSpawn[1];
    const shorelineCultist1 = locations["shoreline"].base.BossLocationSpawn[2];
    const shorelineCultist2 = locations["shoreline"].base.BossLocationSpawn[3];
    const lighthouseGoonsquad = locations["lighthouse"].base.BossLocationSpawn[1];
    const streetsGluhar = locations["tarkovstreets"].base.BossLocationSpawn[0];
    const streetsKilla = locations["tarkovstreets"].base.BossLocationSpawn[1];
    
    const raidDurations: any = [
        config.InRaid["Raid Duration"]["Customs"],
        config.InRaid["Raid Duration"]["Factory"],
        config.InRaid["Raid Duration"]["Interchange"],
        config.InRaid["Raid Duration"]["Labs"],
        config.InRaid["Raid Duration"]["Reserve"],
        config.InRaid["Raid Duration"]["Shoreline"],
        config.InRaid["Raid Duration"]["Woods"],
        config.InRaid["Raid Duration"]["Lighthouse"],
        config.InRaid["Raid Duration"]["Streets"]
    ];

    initDurations(raidDurations);

    if (config.InRaid["Consistent Extracts"])
        for (const map in locations)
            if (locations[map] !== "base")
                for (const exit in locations[map].base.exits)
                    locations[map].base.exits[exit].Chance = 100;

    // customs (reshala) handling
    customsReshala.BossChance = config.InRaid.Reshala["Reshala %"];
    customsReshala.BossEscortAmount = config.InRaid.Reshala["Reshala Guards"];
    customsReshala.BossZone = config.InRaid.Reshala["Reshala Locations"];
    customsCultist.BossChance = config.InRaid.Reshala["Customs Cultist %"];
    customsGoonsquad.BossChance = config.InRaid.Reshala["Customs Goonsquad %"];

    // interchange (killa) handling
    interchangeKilla.BossChance = config.InRaid.Killa["Killa %"];
    interchangeKilla.BossZone = config.InRaid.Killa["Killa Locations"];

    // factory (tagilla) handling
    dayFactoryTagilla.BossChance = config.InRaid.Tagilla["Tagilla Day %"];
    nightFactoryTagilla.BossChance = config.InRaid.Tagilla["Tagilla Night %"];
    nightFactoryCultist.BossChance = config.InRaid.Tagilla["Factory Cultist %"];

    // reserve (gluhar) handling
    reserveGluhar.BossChance = config.InRaid.Gluhar["Gluhar %"];
    reserveGluhar.Supports[0].BossEscortAmount = config.InRaid.Gluhar["Gluhar Guards"][2]; // security
    reserveGluhar.Supports[1].BossEscortAmount = config.InRaid.Gluhar["Gluhar Guards"][1]; // assault
    reserveGluhar.Supports[2].BossEscortAmount = config.InRaid.Gluhar["Gluhar Guards"][0]; // scouts
    reserveGluhar.BossZone = config.InRaid.Gluhar["Gluhar Locations"];

    // woods (shturman) handling
    woodsShturman.BossChance = config.InRaid.Shturman["Shturman %"];
    woodsShturman.BossEscortAmount = config.InRaid.Shturman["Shturman Guards"];
    woodsCultist.BossChance = config.InRaid.Shturman["Woods Cultist %"];
    woodsGoonsquad.BossChance = config.InRaid.Shturman["Woods Goonsquad %"];

    // sanitar (shoreline) handling
    shorelineSanitar.BossChance = config.InRaid.Sanitar["Sanitar %"];
    shorelineSanitar.BossEscortAmount = config.InRaid.Sanitar["Sanitar Guards"];
    shorelineSanitar.BossZone = config.InRaid.Sanitar["Sanitar Locations"];
    shorelineCultist1.BossChance = config.InRaid.Sanitar["Shoreline Cultist %"];
    shorelineCultist2.BossChance = config.InRaid.Sanitar["Shoreline Cultist %"];
    shorelineGoonsquad.BossChance = config.InRaid.Sanitar["Shoreline Goonsquad %"];

    // lighthouse (goons/antlerman) handling
    lighthouseGoonsquad.BossChance = config.InRaid.Lighthouse["Lighthouse Goonsquad %"];
    lighthouseGoonsquad.BossZone = config.InRaid.Lighthouse["Lighthouse Goonsquad Locations"];
    
    // streets (gluhar/killa) handling
    streetsGluhar.BossChance = config.InRaid.Streets["STR Gluhar %"];
    streetsGluhar.Supports[0].BossEscortAmount = config.InRaid.Streets["STR Gluhar Guards"][2]; // security
    streetsGluhar.Supports[1].BossEscortAmount = config.InRaid.Streets["STR Gluhar Guards"][1]; // assault
    streetsGluhar.Supports[2].BossEscortAmount = config.InRaid.Streets["STR Gluhar Guards"][0]; // scouts
    streetsKilla.BossChance = config.InRaid.Streets["STR Killa %"];
}