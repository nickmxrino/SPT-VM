import * as fs from "fs";
import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { initMod } from "./tables/index";

export class Mod implements IPostDBLoadMod
{
    public postDBLoad(container: DependencyContainer): void
    {
        const logger = container.resolve<ILogger>("Logger");
        initMod();
        fs.readdir("./tables/", (err, files) => logger.info(`Initialized ${files.length - 1} SPT-VM modules.`));
    }
}