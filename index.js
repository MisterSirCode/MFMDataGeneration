const modid = "mfm_utils";

const vanillaLogs = [
    "oak", "birch", "spruce", "jungle", "dark_oak", "acacia", "mangrove", "warped", "crimson", 
    "stripped_oak", "stripped_birch", "stripped_spruce", "stripped_jungle", "stripped_dark_oak", "stripped_acacia", 
    "stripped_mangrove", "stripped_warped", "stripped_crimson"
];

const furnitures = [
    "table", "bench", "grate"
];

const fs = require('fs');

function ModelJSON(type, id, stem) {
    if (stem == true) id += "_stem";
    else id += "_log";
    let tex = { sides: "minecraft:block/" + id };
    if (type != "grate") tex['top'] = "minecraft:block/" + id + "_top";
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
    if (type == "bench") pattern = ["L","S"];
    if (type == "grate") pattern = ["SSS", "SLS", "SSS"];
    return {
        type: "minecraft:crafting_shaped",
        pattern: pattern,
        key: {
            L: {
                item: "minecraft:" + (stem ? id + "_stem" : id + "_log")
            },
            S: {
                item: "minecraft:stick"
            }
        },
        result: {
            item: modid + ":" + id + "_" + type,
            count: type == "grate" ? 4 : 1
        }
    };
}

function TagJSON(ids) {
    return {
        replace: false,
        values: ids
    };
}

function Generate() {
    let listOfData = {};
    let grates = [];
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
            if (type == "grate") grates.push(`${modid}:${wood}_grate`);
        });
    });
    listOfData[`itemGroup.${modid}.mfmitemgroup`] = "Modern Furniture Mod";
    let langf = JSON.stringify(listOfData, null, 4);
    fs.writeFileSync(`./resources/assets/${modid}/lang/en_us.json`, langf);
    let climb = JSON.stringify(TagJSON(grates), null, 4);
    fs.writeFileSync(`./resources/data/minecraft/tags/climbable.json`, climb);
}

Generate();