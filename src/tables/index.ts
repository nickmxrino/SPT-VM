import { default as initPlayer } from "./player";
import { default as initSkills } from "./skills";
import { default as initBots } from "./bots";

export function initMod(): boolean
{
    try
    {
        initPlayer();
        initSkills();
        initBots();
        return true;
    }
    catch (err)
    {
        return false;
    }
}