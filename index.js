const vanillaLogs = [
    "oak", "birch", "spruce", "jungle", "dark_oak", "acacia", "mangrove", "warped", "crimson", 
    "stripped_oak", "stripped_birch", "stripped_spruce", "stripped_jungle", "stripped_dark_oak", "stripped_acacia", 
    "stripped_mangrove", "stripped_warped", "stripped_crimson"
];

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

function BlockstateJSON(id, stem) {
    if (stem == true) id += "_stem";
    else id += "_log";
    return {
        
    }
}

function GenerateWoodModels() {

}

function GenerateWoodBlockstates() {

}