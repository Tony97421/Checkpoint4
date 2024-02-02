const argon2 = require("argon2");
const tables = require("../tables");
const login = async (req, res, next) => {
  try {
    const user = await tables.Utilisateurs.readByPseudo(req.body.pseudo);
    if (!user || !user.hashed_password) {
      res.status(422).json({ message: "Invalid email or password" });
      return;
    }
    if (user && user.hashed_password) {
      const verified = await argon2.verify(
        user.hashed_password,
        req.body.password,
      );

      if (verified) {
        res.status(200).json({
          user,
          message: "Logged in successfully",
        });
      } else {
        res.status(422).json({ message: " Invalid email or password " });
      }
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  login,
};
