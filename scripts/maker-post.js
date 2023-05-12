import fs from "fs";

export default class MakerPost {
  #title;
  #introduction;
  #sections = [];
  newPost;
  
  constructor(fileName){
    this.newPost = fs.createWriteStream(`${fileName}.md`, {
    flags: "w",
  });
  }

  title(title) {
    this.#emptyChecking(title);
    this.#title = title;
    return this;
  }
  
  introduction(introduction){
    return this;
  } // who what when where why

  publish() {
    this.newPost.write(`# ${this._title}`);
    this.newPost.end();
  }
  
  addSection(title, content, image){
  return this;
  }

  #write(line) {
    this.newPost.write(`\n\n${line}`);
  }

  // Functional errors
  #emptyChecking(content) {
    if (!content) {
      throw new Error("Content is empty");
    }
  }
  #sizeTitleChecking(title){} // 6 à 12 mots &  max 90 char
  #sizePhraseChecking(content){} // 15 a 20 mots
  #sizePostChecking(content){} // 500 -1000 à 1000 à 2000
  #firstPersonChecking(content){} // utilisation de la première personnee
 
}
