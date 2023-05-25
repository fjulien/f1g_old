import fs from "fs";

export default class MakerPost {
  #title;
  #introduction;
  #sections = [];
  #newPost;
  #conclusion;
  #mainImage;
  #languageType = "javascript";
  #tags = [];

  constructor(fileName, languageType) {
    this.#emptyChecking(fileName);
    this.#newPost = fs.createWriteStream(`${fileName}.md`, {
      flags: "w",
    });
    this.#languageType = languageType;
  }

  /**
   * 
   * @param {String} title 
   * @returns this
   */
  title(title) {
    const cleanTitle = this.#trimText(title);
    this.#emptyChecking(cleanTitle);
    this.#sizeTitleChecking(cleanTitle);
    this.#title = cleanTitle;
    return this;
  }

  mainImage({ src, url }) {
    this.#emptyChecking(src, url);
    this.#mainImage = this.#setImage({ src, url });
    return this;
  }


  /**
   * 
   * @param {String} introduction 
   * @returns this
   */
  introduction(introduction) {
    this.#emptyChecking(introduction);
    this.#introduction = introduction;
    return this;
  } // who what when where why

  /**
   * 
   * @param {String[]} tags 
   * @returns this
   */
  tags(tags) {
    this.#tags = tags;
    return this;
  }

  /**
   * 
   * @param {{ title: String, content: String, image: {url:String, src: String}, code: String }} section 
   * @returns this
   */
  addSection({ title, content, image, code }) {
    this.#emptyChecking(title, content, image, code);
    const section = {
      title,
      content,
      code,
      image: image && this.#setImage(image), // Set image if has it
    }
    this.#sections.push(section);
    return this;
  }

  /**
   * 
   * @param {String} conclusion 
   * @returns this
   */
  conclusion(conclusion) {
    this.#emptyChecking(conclusion);
    this.#conclusion = conclusion;
    return this;
  }

  /**
   * 
   */
  publish() {
    this.#checkingAllPostBeforPublish();
    this.#makePostHeader();
    this.#makePostBody();
    this.#makePostFooter();
    this.#newPost.end();
  }

  #makePostHeader() {
    this.#writeWithouLineBreaker(`---`);
    this.#writeWithOneLineBreaker(`title: ${this.#title}`);
    this.#writeWithOneLineBreaker(`date: ${Date.now()}`);
    this.#writeWithOneLineBreaker(`tags: [${this.#tags.join(', ')}]`);
    this.#writeWithOneLineBreaker(`categories: `);
    this.#writeWithOneLineBreaker(`- [Angular]`);
    this.#writeWithOneLineBreaker(`---`);
    this.#write(this.#mainImage);
    this.#write(`# ${this.#title}`);
    this.#write(this.#introduction);
  }

  #makePostBody() {
    this.#sections.forEach(article => {
      this.#write(`## ${article.title}`);
      if (!!article.image) {
        this.#write(article.image);
      }
      this.#write(article.content);
      if (!!article.code) {
        this.#write(`\`\`\`${this.#languageType}\n${article.code}\n\`\`\``);
      }
    });
  }

  #makePostFooter() {
    this.#write(`## Conclusion`);
    this.#write(this.#conclusion);
  }

  #checkingAllPostBeforPublish() {
    this.#mustHasInPost(this.#mainImage, "Main image");
    this.#mustHasInPost(this.#title, "Title");
    this.#mustHasInPost(this.#tags, "Tags");
    this.#mustHasInPost(this.#introduction, "Introduction");
    this.#mustHasInPost(this.#sections.length, "Sections");
    this.#mustHasInPost(this.#conclusion, "Conclusion");
  }

  #setImage({ src, url }) {
    this.#emptyChecking(src, url);
    return `![${src}](${url})`;
  }

  #trimText(text) {
    return text.trim();
  }

  #write(line) {
    this.#newPost.write(`\n\n${line}`);
  }

  #writeWithouLineBreaker(line) {
    this.#newPost.write(line);
  }

  #writeWithOneLineBreaker(line) {
    this.#newPost.write(`\n${line}`);
  }

  // Functional checking
  #emptyChecking(...contents) {
    if (!contents.some(Boolean)) {
      throw new Error("Content is empty");
    }
  }

  #mustHasInPost(content, element) {
    if (!content) {
      throw new Error(`${element} is required`);
    }
  }

  /**
   * 6 to 12 words and max 90 characters
   *
   */
  #sizeTitleChecking(title) {
    const numberOfWords = title.split(" ").length;
    if (numberOfWords < 6) {
      throw new Error(`The title does not contain enough words : ${numberOfWords}`);
    }
    if (numberOfWords > 12) {
      throw new Error(`Title contains too many words : ${numberOfWords}`);
    }
    if (title.length > 90) {
      throw new Error(`Title contains too many characters : ${title.length}`);
    }
  }
  /**
   * 15 to 20 words by phrase
   *
   */
  #sizePhraseChecking(content) { }

  /**
   * 500 to 2000 words in post
   *
   */
  #sizePostChecking(content) { }

  /**
   * Use first person in post
   *
   */
  #firstPersonChecking(content) { }
}
