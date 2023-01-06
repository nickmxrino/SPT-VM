import { container } from "tsyringe";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import config from "../config.json";

function constructionModify(configCase: number): void
{
    // table and hideout area declaration
    const tables = container.resolve<DatabaseServer>("DatabaseServer").getTables();
    const hideoutConstruction = tables.hideout.areas;

    // iterating through every area
    for (const area in hideoutConstruction)
    {   // iterating through every stage
        for (const stage in hideoutConstruction[area].stages)
        { 
            const current = hideoutConstruction[area].stages[stage];
            if (configCase === 1) // if the user wants to make construction instant...
                current.constructionTime = 1;
            else if (configCase === 2) // if the user wants to modify construction time...
                current.constructionTime *= config.Hideout["Construction Modifier"];
        }
    } 
}

function productionModify(configCase: number): void
{
    // table and hideout production declaration
    const tables = container.resolve<DatabaseServer>("DatabaseServer").getTables();
    const hideoutProduction = tables.hideout.production;

    // iterating through all items up for production
    for (const id in hideoutProduction)
    {   
        const current = hideoutProduction[id];
        if (configCase === 1) // if the user wants to make production instant...
            current.productionTime = 1;
        else if (configCase === 2) // if the user wants to modify production time...
            current.productionTime *= config.Hideout["Production Modifier"];
    }
}

export default function init(): void
{
    // function calls in config decision cases
    if (config.Hideout["Instant Construction"]) constructionModify(1);
    else if (config.Hideout["Construction Modifier"] !== 1.0) constructionModify(2);
    if (config.Hideout["Instant Production"]) productionModify(1);
    else if (config.Hideout["Production Modifier"] !== 1.0) productionModify(2);
}