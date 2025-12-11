const { Router } = require("express");
const { UserRecord } = require("../record/UserRecord");
const { ValidationError } = require("../utils/handleErrors");

const registerRouter = new Router();

registerRouter.post("/", async (req, res) => {
  const { email, password, role, name, surname, phone } = req.body;
  let user = await UserRecord.findOneByEmail(email);
  if (user !== null) {
    throw new ValidationError("Konto z takim emailem istnieje");
  }

  user = await new UserRecord({
    email,
    password,
    role,
    name,
    surname,
    phone,
  });
  await user.insert();
  res.status(200).send(`Dodano użytkownika o numerze id: ${user.id}`);
});

module.exports = {
  registerRouter,
};
