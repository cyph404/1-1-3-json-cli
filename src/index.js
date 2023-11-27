const fs = require("fs");
const path = require("path");
const prompt = require('prompt-sync')({ sigint: true });

const toDoJsonFilePath = path.join(__dirname, "to-dos.json");
const toDoList = []
const toDoListRaw = fs.readFileSync(toDoJsonFilePath, "utf-8");
const jsonData = JSON.parse(toDoListRaw);

const createSpace = () => {
  console.log('')
}

const getUserNumber = () => {
  const chosenNum = Number(prompt('What would you like to do?: ').trim())
  createSpace()
  return chosenNum
}

const goodbye = () => {
  console.log('Toodles!')
}

const menu = () => {
  console.log('Menu:')
  console.log('1 - View to-do list')
  console.log('2 - Add item to list')
  console.log('3 - Remove item from list')
  console.log('4 - Clear entire list')
  console.log('Press any other key to exit.')
  createSpace()
}

const handleView = () => {
  try {
    console.log(jsonData);
  } catch (error) {
      console.error("Error reading JSON file:", error);
  }
  createSpace();
}

const handleAdd = () => {
  try {
    const item = prompt('Write your task here: ');
    toDoList.push(item);
    fs.writeFileSync(toDoJsonFilePath, JSON.stringify(toDoList));
    // console.log('Updated list:')
    // console.log(toDoListRaw)
  } catch (error) {
    console.error('Error adding task: ', error)
  }
}

const handleSubmit = () => {
  while (true) {
    menu();
    const option = getUserNumber();

    switch (option) {
      case 1:
        handleView();
        break;
      case 2:
        handleAdd();
        break;
      case 3:
        handleRemove();
        break;
      case 4:
        handleClear();
        break;
      default:
        goodbye();
        return;
    }
  }
}

const main = () => {
  console.log('insert welcome msg lol')
  handleSubmit()
  console.log('')
};

main();
