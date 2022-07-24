const vanillaLogs = [
    "oak", "birch", "spruce", "jungle", "dark_oak", "acacia", "mangrove", "warped", "crimson", 
    "stripped_oak", "stripped_birch", "stripped_spruce", "stripped_jungle", "stripped_dark_oak", "stripped_acacia", 
    "stripped_mangrove", "stripped_warped", "stripped_crimson"
];

const furnitures = [
    "table", "bench"
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
    furnitures.forEach(type => {
        vanillaLogs.forEach(wood => {
            let stem = false;
            if (wood.endsWith("warped") || wood.endsWith("crimson")) stem = true; 
            let model = JSON.stringify(ModelJSON(type, wood, stem), null, 4);
            let state = JSON.stringify(BlockstateJSON(wood + "_" + type), null, 4);
            let recip = JSON.stringify(RecipeJSON(type, wood), null, 4);
            fs.writeFileSync(`./resources/assets/mfm_utils/models/block/${wood}_${type}.json`, model);
            fs.writeFileSync(`./resources/assets/mfm_utils/models/item/${wood}_${type}.json`, model);
            fs.writeFileSync(`./resources/assets/mfm_utils/models/item/${wood}_${type}.json`, model);
            fs.writeFileSync(`./resources/assets/mfm_utils/blockstates/${wood}_${type}.json`, state);
            fs.writeFileSync(`./resources/data/mfm_utils/recipes/${wood}_${type}.json`, recip);
        });
    })
}

GenerateWoodModels();