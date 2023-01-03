import * as fs from "node:fs";
import toml from "toml";
import { container } from "tsyringe";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

export default function init(): void
{
    // retrieving tables from the database server
    const tables = container.resolve<DatabaseServer>("DatabaseServer").getTables();
    const globals = tables.globals.config;

    // tries to read the config file and stores it in "config"
    const config = toml.parse(fs.readFileSync("./../config.toml","utf-8"));

    // short skill multiplier options
    if (config["Survived"] != 1.3) globals.exp.match_end.survivedMult = config["Survived"];
    if (config["Killed"] != 1.0) globals.exp.match_end.killedMult = config["Killed"];
    if (config["Runthru"] != 0.5) globals.exp.match_end.runnerMult = config["Runthru"];
    if (config["Headshot"] != 1.2) globals.exp.kill.headShotMult = config["Headshot"];
    if (config["Wep Skill Rate"] != 1.0) globals.SkillsSettings.WeaponSkillProgressRate = config["Wep Skill Rate"];
    if (config["Soft Skill Rate"] != 0.4) globals.SkillsSettings.SkillProgressRate = config["Soft Skill Rate"];

    if (config["Disable Skill Fatigue"])
    {   // renders these new values
        globals.SkillFatiguePerPoint = 0;
        globals.SkillMinEffectiveness = 1.0;
        globals.SkillFreshEffectiveness = 1.0;
    }
}