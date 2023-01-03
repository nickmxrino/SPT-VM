import * as fs from "fs";
import * as tables from "./tables/index";
import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";

export class Mod implements IPostDBLoadMod
{
    public postDBLoad(container: DependencyContainer): void
    {
        tables.initPlayer();
        tables.initSkills();
        
        const logger = container.resolve<ILogger>("Logger");
        fs.readdir("./tables/", (err, files) =>
        {
            logger.info(`Initialized ${files.length - 1} tables.`);
        });
    }
}