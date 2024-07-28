import obj2gltf from "obj2gltf";
import fs from "fs"
import path from "path"

const OBJ_FOLDER_PATH = "./obj";

// Convert Obj -> Glhf
const objFolderExists = fs.existsSync(OBJ_FOLDER_PATH)
if(objFolderExists){
    const folderContent = fs.readdirSync(OBJ_FOLDER_PATH);
    const objFiles = folderContent.filter(file => path.extname(file) === '.obj');
    objFiles.forEach(file => {
        obj2gltf(path.join(OBJ_FOLDER_PATH, file)).then(function (gltf) {
            const data = Buffer.from(JSON.stringify(gltf));
            fs.writeFileSync(path.join(OBJ_FOLDER_PATH, `${path.basename(file, ".obj")}.gltf`), data);
        });
    })
}else {
    console.log("Creating obj-Folder...");
    fs.mkdir(OBJ_FOLDER_PATH)
}

// Write Folder Content to JSON-File
const FLOOR_FILE_NAME = "floors.json";
const floors = fs.readdirSync(OBJ_FOLDER_PATH).filter(file => path.extname(file) === '.gltf').map((item, index) => {
    return {
        file: item,
        displayName: path.basename(item, ".gltf"),
        id: index
    }
})
fs.writeFileSync(FLOOR_FILE_NAME, JSON.stringify(floors));

