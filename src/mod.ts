import * as fs from "node:fs";
import * as tables from "./tables/index";
import { DependencyContainer } from "tsyringe";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
//import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

export class Mod implements IPostAkiLoadMod
{
    public postAkiLoad(container: DependencyContainer): void
    {
        tables.initPlayer();

        const logger = container.resolve<ILogger>("Logger");
        fs.readdir("./tables/", (err, files) => {
            logger.info(`Initialized ${files.length - 1} tables.`);
        });
    }
}