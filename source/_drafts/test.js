import MakerPost from "../../scripts/maker-post.js";

new MakerPost("test")
  .mainImage({ url: 'test', src: 'tedts' })
  .title('True false VS truthy et falsy')
  .tags(['Javascript'])
  .introduction(
    `Ca m'arrive souvent avec les opérateurs que je me demande si ma variable est interpréter comme vrai ou pas en javascript. ` +
    `C'est vrai que que la notion de "valeur de type fausse" est assez`)
  .addSection({
    title: "New section",
    content: "bla bla",
    image: { url: "htp", src: "src" },
    code: 'const test = "Hello world!"',
  })
  .conclusion("c'est la fin")
  .publish();
