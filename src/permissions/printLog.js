import fs from "fs";
import path from "path";
import txt2json from "./txt2json.js";

const __dirname = path.resolve();

const inputName = "./public/Permissions.cs";
const outputName = "./public/output.json";

function printLog() {
  console.log(new Date().toLocaleString());
  const data = fs.readFileSync(path.join(__dirname, inputName), "UTF-8");
  const tempData = txt2json(data);
  fs.writeFileSync(path.join(__dirname, outputName), tempData);
}

// export default printLog;
printLog();
