import MakerPost from "../../scripts/maker-post.js";

new MakerPost("test")
  .mainImage({ url: "test", src: "tedts" })
  .title("Hello world! as as as as")
  .introduction("Une belle intro")
  .addSection({
    title: "New section",
    content: "bla bla",
    image: { url: "htp", src: "src" },
    code: 'const test = "Hello world!"',
  })
  .conclusion("c'est la fin")
  .publish();
