import * as fs from "fs";
import toml from "toml";
import { container } from "tsyringe";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

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
    // tries to read the config file and stores it in "config"
    const config = toml.parse(fs.readFileSync("./../config.toml","utf-8"));
    // retrieving tables from the database server
    const tables = container.resolve<DatabaseServer>("DatabaseServer").getTables();
    const locations = tables.locations;

    // index 0 of boss arrays belongs to santa/gifter ...
    const customsGoonsquad = locations["bigmap"].base.BossLocationSpawn[1];
    const customsReshala = locations["bigmap"].base.BossLocationSpawn[2];
    const customsCultist = locations["bigmap"].base.BossLocationSpawn[3];
    const interchangeKilla = locations["interchange"].base.BossLocationSpawn[1];
    const dayFactoryTagilla = locations["factory4_day"].base.BossLocationSpawn[1];
    const nightFactoryTagilla = locations["factory4_night"].base.BossLocationSpawn[0];
    const nightFactoryCultist = locations["factory4_night"].base.BossLocationSpawn[1];
    const reserveGluhar = locations["rezervbase"].base.BossLocationSpawn[1];
    const woodsGoonsquad = locations["woods"].base.BossLocationSpawn[1];
    const woodsShturman = locations["woods"].base.BossLocationSpawn[2];
    const woodsCultist = locations["woods"].base.BossLocationSpawn[3];
    const shorelineGoonsquad = locations["shoreline"].base.BossLocationSpawn[1];
    const shorelineSanitar = locations["shoreline"].base.BossLocationSpawn[2];
    const shorelineCultist1 = locations["shoreline"].base.BossLocationSpawn[3];
    const shorelineCultist2 = locations["shoreline"].base.BossLocationSpawn[4];
    const lighthouseGoonsquad = locations["lighthouse"].base.BossLocationSpawn[2];
    const streetsGluhar = locations["tarkovstreets"].base.BossLocationSpawn[1];
    const streetsKilla = locations["tarkovstreets"].base.BossLocationSpawn[2];
    
    const raidDurations: any = [
        config["Customs"],
        config["Factory"],
        config["Interchange"],
        config["Labs"],
        config["Reserve"],
        config["Shoreline"],
        config["Woods"],
        config["Lighthouse"],
        config["Streets"]
    ];

    initDurations(raidDurations);

    if (config["Consistent Extracts"])
        for (const map in locations)
            if (locations[map] !== "base")
                for (const exit in locations[map].base.exits)
                    locations[map].base.exits[exit].Chance = 100;

    // customs (reshala) handling
    customsReshala.BossChance = config["Reshala %"];
    customsReshala.BossEscortAmount = config["Reshala Guards"];
    customsReshala.BossZone = config["Reshala Locations"];
    customsCultist.BossChance = config["Customs Cultist %"];
    customsGoonsquad.BossChance = config["Customs Goonsquad %"];

    // interchange (killa) handling
    interchangeKilla.BossChance = config["Killa %"];
    interchangeKilla.BossZone = config["Killa Locations"];

    // factory (tagilla) handling
    dayFactoryTagilla.BossChance = config["Tagilla Day %"];
    nightFactoryTagilla.BossChance = config["Tagilla Night %"];
    nightFactoryCultist.BossChance = config["Factory Cultist %"];

    // reserve (gluhar) handling
    reserveGluhar.BossChance = config["Gluhar %"];
    reserveGluhar.Supports[0].BossEscortAmount = config["Gluhar Guards"][2]; // security
    reserveGluhar.Supports[1].BossEscortAmount = config["Gluhar Guards"][1]; // assault
    reserveGluhar.Supports[2].BossEscortAmount = config["Gluhar Guards"][0]; // scouts
    reserveGluhar.BossZone = config["Gluhar Locations"];

    // woods (shturman) handling
    woodsShturman.BossChance = config["Shturman %"];
    woodsShturman.BossEscortAmount = config["Shturman Guards"];
    woodsCultist.BossChance = config["Woods Cultist %"];
    woodsGoonsquad.BossChance = config["Woods Goonsquad %"];

    // sanitar (shoreline) handling
    shorelineSanitar.BossChance = config["Sanitar %"];
    shorelineSanitar.BossEscortAmount = config["Sanitar Guards"];
    shorelineSanitar.BossZone = config["Sanitar Locations"];
    shorelineCultist1.BossChance = config["Shoreline Cultist %"];
    shorelineCultist2.BossChance = config["Shoreline Cultist %"];
    shorelineGoonsquad.BossChance = config["Shoreline Goonsquad %"];

    // lighthouse (goons/antlerman) handling
    lighthouseGoonsquad.BossChance = config["Lighthouse Goonsquad %"];
    lighthouseGoonsquad.BossZone = config["Lighthouse Goonsquad Locations"];
    
    // streets (gluhar/killa) handling
    streetsGluhar.BossChance = config["STR Gluhar %"];
    streetsGluhar.Supports[0].BossEscortAmount = config["STR Gluhar Guards"][2]; // security
    streetsGluhar.Supports[1].BossEscortAmount = config["STR Gluhar Guards"][1]; // assault
    streetsGluhar.Supports[2].BossEscortAmount = config["STR Gluhar Guards"][0]; // scouts
    streetsKilla.BossChance = config["STR Killa %"];
}