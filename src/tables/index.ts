import { default as initPlayer } from "./player";
import { default as initSkills } from "./skills";
import { default as initBots } from "./bots";
import { default as initTraders } from "./traders";
import { default as initHideOut } from "./hideOut";
import { default as initInertia } from "./inertia";
import { default as initInRaid } from "./inRaid"; 
import { default as initAirdrop } from "./airdrop";

export function initMod(): void
{
    initPlayer();
    initSkills();
    initBots();
    initTraders();
    initHideOut();
    initInertia();
    initInRaid();
    initAirdrop();
}