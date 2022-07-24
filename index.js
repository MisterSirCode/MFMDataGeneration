const vanillaLogs = [
    "oak", "birch", "spruce", "jungle", "dark_oak", "acacia", "mangrove", "warped", "crimson", 
    "stripped_oak", "stripped_birch", "stripped_spruce", "stripped_jungle", "stripped_dark_oak", "stripped_acacia", 
    "stripped_mangrove", "stripped_warped", "stripped_crimson"
];

const fs = require('fs');

function ModelJSON(type, id, stem) {
    if (stem == true) id += "_stem";
    else id += "_log";
    return {
        parent: "mfm_utils:block/" + type,
        textures: {
            top: "minecraft:block/" + id + "_top",
            sides: "minecraft:block/" + id
        }
    };
}

function BlockstateJSON(id) {
    return {
        variants: {
            "": {
                model: "mfm_utils:block/" + id
            }
        }
    };
}

function RecipeJSON(type, id) {
    return {
        type: "minecraft:crafting_shaped",
        pattern: [
            "LL",
            "SS"
        ],
        key: {
            L: {
                item: "minecraft:" + id + "_log"
            },
            S: {
                item: "minecraft:stick"
            }
        },
        result: {
            item: "mfm_utils:" + id + "_" + type,
            count: 1
        }
    };
}


function GenerateWoodModels() {
    vanillaLogs.forEach(wood => {
        let stem = false;
        if (wood.endsWith("warped") || wood.endsWith("crimson")) stem = true; 
        let model = JSON.stringify(ModelJSON("table", wood, stem), null, 4);
        let state = JSON.stringify(BlockstateJSON(wood + "_table"), null, 4);
        let recip = JSON.stringify(RecipeJSON("table", wood), null, 4);
        fs.writeFileSync(`./resources/assets/mfm_utils/models/block/${wood}_table.json`, model);
        fs.writeFileSync(`./resources/assets/mfm_utils/models/item/${wood}_table.json`, model);
        fs.writeFileSync(`./resources/assets/mfm_utils/models/item/${wood}_table.json`, model);
        fs.writeFileSync(`./resources/assets/mfm_utils/blockstates/${wood}_table.json`, state);
        fs.writeFileSync(`./resources/data/mfm_utils/recipes/${wood}_table.json`, recip);
    });
}

GenerateWoodModels();