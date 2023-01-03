import { default as initPlayer } from "./player";
import { default as initSkills } from "./skills";
import { default as initBots } from "./bots";
import { default as initTraders } from "./traders";
import { default as initHideOut } from "./hideOut";

export function initMod(): boolean
{
    try
    {
        initPlayer();
        initSkills();
        initBots();
        initTraders();
        initHideOut();
        return true;
    }
    catch (err)
    {
        return false;
    }
}