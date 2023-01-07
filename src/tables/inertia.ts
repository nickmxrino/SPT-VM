import { container } from "tsyringe";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import config from "../config.json";

function modifyStat(stat: any, mult: number)
{
    if (stat.x != undefined)
    {
        for (const value in stat)
        {
            stat[value] *= mult;
            if (stat[value] <= 0)
                stat[value] = 0.01;
        }
    }
    else
    {
        stat *= mult;
        if (stat <= 0)
            stat = 0.01;
    }
    return stat;
}

export default function init(): void
{

    const inertia = container.resolve<DatabaseServer>("DatabaseServer").getTables().globals.config.Inertia;

    inertia.SideTime.x = 0
    inertia.SideTime.y = 0
    
    inertia.MinDirectionBlendTime = modifyStat(inertia.MinDirectionBlendTime, config["Inertia Multipliers"]["Direction Change"]);
    
    inertia.WalkInertia = modifyStat(inertia.WalkInertia, config["Inertia Multipliers"]["Walking Inertia"]);
    
    inertia.MoveTimeRange.x = 0;
    inertia.MoveTimeRange.y = 0;

    inertia.TiltInertiaMaxSpeed = modifyStat(inertia.TiltInertiaMaxSpeed, config["Inertia Multipliers"]["Leaning Speed"]);
    inertia.TiltMaxSideBackSpeed = modifyStat(inertia.TiltMaxSideBackSpeed, config["Inertia Multipliers"]["Leaning Speed"]);
    inertia.TiltStartSideBackSpeed = modifyStat(inertia.TiltStartSideBackSpeed, config["Inertia Multipliers"]["Leaning Speed"]);
    
    inertia.SprintBrakeInertia = modifyStat(inertia.SprintBrakeInertia, config["Inertia Multipliers"]["Stopping Inertia"]);
    
    inertia.BaseJumpPenalty = modifyStat(inertia.BaseJumpPenalty, config["Inertia Multipliers"]["Jumping"]);
    inertia.BaseJumpPenaltyDuration = modifyStat(inertia.BaseJumpPenaltyDuration, config["Inertia Multipliers"]["Jumping"]);
    
    inertia.SpeedLimitAfterFallMax = modifyStat(inertia.SpeedLimitAfterFallMax, config["Inertia Multipliers"]["Falling"]);
    inertia.SpeedLimitAfterFallMin = modifyStat(inertia.SpeedLimitAfterFallMin, config["Inertia Multipliers"]["Falling"]);
}