const { Publication, User } = require("../models");
const postController = {
  index: async function (req, res) {

    const listaDePublications = await Publication.findAll({
      include: [
        {
          model: User,
          as: "user",
          required: true,
        }
      ],
    });
    console.log(listaDePublications)

    res.render("index", { publications: listaDePublications });
  },

  create: (_req, res) => res.render("post"),

  store: async (req, res) => {
    const [photo] = req.files;
    const { user } = req.session;

    const newPost = Publication.create({
      image: `/posts/${photo.filename}`,
      like: 0,
      users_id: user.id,
      create_at: new Date(),
      update_at: new Date(),
    });

    return res.redirect("/home");
  },

  
};

module.exports = postController;
