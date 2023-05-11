import fs from "fs";

export default class MakerPost {
  _title;
  resume;
  newPost = fs.createWriteStream("remove-me.md", {
    flags: "w", // 'a' means appending (old data will be preserved)
  });

  title(title) {
    this._emptyChecking(title);
    this._title = title;
    return this;
  }

  publish() {
    this.newPost.write(`# ${this._title}`);
    this.newPost.end();
  }

  _write(line) {
    this.newPost.write(`\n\n${line}`);
  }

  // Functional errors
  _emptyChecking(content) {
    if (!content) {
      throw new Error("Content is empty");
    }
  }
}
