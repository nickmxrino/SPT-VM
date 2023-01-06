import * as fs from "fs";
import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { initMod } from "./tables/index";

export class Mod implements IPostDBLoadMod
{
    public postDBLoad(container: DependencyContainer): void
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const status = initMod();
        if (status)
            fs.readdir("./tables/", (err, files) => logger.info(`Initialized ${files.length - 1} SPT-VM modules.`));
        else
            logger.info("Issue occured attempting to load SPT-VM.");
    }
}

module.exports = { mod: new Mod() };