import fs from "fs";

export default class MakerPost {
  #title;
  #introduction;
  #sections = [];
  #newPost;
  #conclusion;
  #mainImage;
  #languageType = "javascript";

  constructor(fileName, languageType) {
    this.#emptyChecking(fileName);
    this.#newPost = fs.createWriteStream(`${fileName}.md`, {
      flags: "w",
    });
    this.#languageType = languageType;
  }

  title(title) {
    title = this.#trimText(title);
    this.#trimText(title);
    this.#emptyChecking(title);
    this.#sizeTitleChecking(title);
    this.#title = title;
    return this;
  }

  mainImage({ src, url }) {
    this.#emptyChecking({ src, url });
    this.#mainImage = this.#setImage({ src, url });
    return this;
  }

  introduction(introduction) {
    this.#emptyChecking(introduction);
    this.#introduction = introduction;
    return this;
  } // who what when where why

  publish() {
    this.#mustHasInPost(this.#mainImage, "Main image");
    this.#mustHasInPost(this.#title, "Title");
    this.#mustHasInPost(this.#introduction, "Introduction");
    this.#mustHasInPost(this.#sections.length, "Sections");
    this.#mustHasInPost(this.#conclusion, "Conclusion");

    this.#newPost.write(this.#mainImage);
    this.#write(`# ${this.#title}`);
    this.#write(this.#introduction);
    this.#sections.forEach(article => {
      this.#write(`## ${article.title}`);
      this.#write(article.image);
      this.#write(article.content);
      if (!!article.code) {
        this.#write(`\`\`\`${this.#languageType}\n${article.code}\n\`\`\``);
      }
    });
    this.#write(`## Conclusion`);
    this.#write(this.#conclusion);
    this.#newPost.end();
  }

  addSection({ title, content, image, code }) {
    this.#emptyChecking(title, content, image, code);
    this.#sections.push({ title, content, image: this.#setImage(image), code });
    return this;
  }

  #setImage({ src, url }) {
    this.#emptyChecking(src, url);
    return `![${src}](${url})`;
  }

  conclusion(conclusion) {
    this.#emptyChecking(conclusion);
    this.#conclusion = conclusion;
    return this;
  }

  #trimText(text) {
    return text.trim();
  }

  #write(line) {
    this.#newPost.write(`\n\n${line}`);
  }

  // Functional errors
  #emptyChecking(...contents) {
    if (!contents.every(Boolean)) {
      throw new Error("Content is empty");
    }
  }

  #mustHasInPost(content, element) {
    if (!content) {
      throw new Error(`${element} is required`);
    }
  }

  // 6 à 12 mots &  max 90 char
  #sizeTitleChecking(title) {
    if (title.split(" ").length < 6) {
      throw new Error("Title has not less words");
    }
    if (title.split(" ").length > 12) {
      throw new Error("Title has over words");
    }
    if (title.length > 90) {
      throw new Error("Title has many chars");
    }
  }
  #sizePhraseChecking(content) {} // 15 a 20 mots
  #sizePostChecking(content) {} // 500 -1000 à 1000 à 2000
  #firstPersonChecking(content) {} // utilisation de la première personnee
}
