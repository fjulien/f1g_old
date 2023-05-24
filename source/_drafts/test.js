import MakerPost from "../../scripts/maker-post.js";

new MakerPost("test")
  .mainImage({ url: "test", src: "tedts" })
  .title("True false VS truthy et falsy")
  .tags(['Javascript'])
  .introduction("Une belle intro")
  .addSection({
    title: "New section",
    content: "bla bla",
    image: { url: "htp", src: "src" },
    code: 'const test = "Hello world!"',
  })
  .conclusion("c'est la fin")
  .publish();
