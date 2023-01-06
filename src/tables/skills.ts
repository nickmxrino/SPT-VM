import { container } from "tsyringe";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import config from "../config.json";

export default function init(): void
{
    // retrieving tables from the database server
    const tables = container.resolve<DatabaseServer>("DatabaseServer").getTables();
    const globals = tables.globals.config;

    // short skill multiplier options
    if (config.Skill.Experience["Survived"] != 1.3) globals.exp.match_end.survivedMult = config["Survived"];
    if (config.Skill.Experience["Killed"] != 1.0) globals.exp.match_end.killedMult = config["Killed"];
    if (config.Skill.Experience["Runthru"] != 0.5) globals.exp.match_end.runnerMult = config["Runthru"];
    if (config.Skill.Experience["Headshot"] != 1.2) globals.exp.kill.headShotMult = config["Headshot"];
    if (config.Skill.Experience["Wep Skill Rate"] != 1.0) globals.SkillsSettings.WeaponSkillProgressRate = config["Wep Skill Rate"];
    if (config.Skill.Experience["Soft Skill Rate"] != 0.4) globals.SkillsSettings.SkillProgressRate = config["Soft Skill Rate"];

    if (config.Skill["Disable Skill Fatigue"])
    {   // renders these new values
        globals.SkillFatiguePerPoint = 0;
        globals.SkillMinEffectiveness = 1.0;
        globals.SkillFreshEffectiveness = 1.0;
    }
}