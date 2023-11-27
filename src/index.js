const fs = require("fs");
const path = require("path");

const toDoJsonFilePath = path.join(__dirname, "to-dos.json");

try {
  const toDoList = ['Take out garbage'];
  fs.writeFileSync(toDoJsonFilePath, JSON.stringify(toDoList));

  const toDoListRaw = fs.readFileSync(toDoJsonFilePath, "utf-8");
  const jsonData = JSON.parse(toDoListRaw);
  console.log(jsonData);
} catch (error) {
    console.error("Error reading JSON file:", error);
}

console.log(toDoJsonFilePath)