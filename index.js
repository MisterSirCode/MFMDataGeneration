const modid = "mfm_utils";

const vanillaLogs = [
    "oak", "birch", "spruce", "jungle", "dark_oak", "acacia", "mangrove", "warped", "crimson", 
    "stripped_oak", "stripped_birch", "stripped_spruce", "stripped_jungle", "stripped_dark_oak", "stripped_acacia", 
    "stripped_mangrove", "stripped_warped", "stripped_crimson"
];

const furnitures = [
    "table", "bench", "scaffold", "crate"
];

const fs = require('fs');

function ModelJSON(type, id, stem) {
    let nid = id;
    if (stem == true) nid += "_stem";
    else nid += "_log";
    let tex = { sides: "minecraft:block/" + nid };
    if (type != furnitures[2]) tex['top'] = "minecraft:block/" + nid + "_top";
    if (type == furnitures[3]) tex['inlay'] = "minecraft:block/" + id.replace("stripped_", "") + "_planks";
    return {
        parent: modid + ":block/" + type,
        textures: tex
    };
}

function BlockstateJSON(id) {
    return {
        variants: {
            "": {
                model: modid + ":block/" + id
            }
        }
    };
}

function RecipeJSON(type, id, stem) {
    let pattern = ["LL","SS"];
    if (type == furnitures[1]) pattern = ["L","S"];
    if (type == furnitures[2]) pattern = ["SSS", "SLS", "SSS"];
    let keym = {
        L: {
            item: "minecraft:" + (stem ? id + "_stem" : id + "_log")
        },
        S: {
            item: "minecraft:stick"
        }
    };
    if (type == furnitures[3]) {
        pattern = ["LSL", "SCS", "LSL"];
        keym["C"] = {
            item: "minecraft:chest"
        }
    }
    return {
        type: "minecraft:crafting_shaped",
        pattern: pattern,
        key: keym,
        result: {
            item: modid + ":" + id + "_" + type,
            count: type == furnitures[2] ? 4 : 1
        }
    };
}

function Generate() {
    let listOfData = {};
    furnitures.forEach(type => {
        vanillaLogs.forEach(wood => {
            let fid = `${wood}_${type}`;
            listOfData[`block.${modid}.${fid}`] = fid.split("_").join(" ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
            let stem = false;
            if (wood.endsWith("warped") || wood.endsWith("crimson")) stem = true; 
            let model = JSON.stringify(ModelJSON(type, wood, stem), null, 4);
            let state = JSON.stringify(BlockstateJSON(wood + "_" + type), null, 4);
            let recip = JSON.stringify(RecipeJSON(type, wood, stem), null, 4);
            fs.writeFileSync(`./resources/assets/${modid}/models/block/${fid}.json`, model);
            fs.writeFileSync(`./resources/assets/${modid}/models/item/${fid}.json`, model);
            fs.writeFileSync(`./resources/assets/${modid}/models/item/${fid}.json`, model);
            fs.writeFileSync(`./resources/assets/${modid}/blockstates/${fid}.json`, state);
            fs.writeFileSync(`./resources/data/${modid}/recipes/${fid}.json`, recip);
        });
    });
    listOfData[`itemGroup.${modid}.mfmitemgroup`] = "Modern Furniture Mod";
    listOfData[`container.${modid}.${furnitures[3]}`] = "Crate";
    let langf = JSON.stringify(listOfData, null, 4);
    fs.writeFileSync(`./resources/assets/${modid}/lang/en_us.json`, langf);
}

Generate();