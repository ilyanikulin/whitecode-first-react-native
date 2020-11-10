import fs from "fs";

const readJsonFile = (fullPathFile, property) => {
  const rawData = fs.readFileSync(fullPathFile);
  const jsonData = JSON.parse(rawData);
  return jsonData[property] || {};
};

export { readJsonFile };
