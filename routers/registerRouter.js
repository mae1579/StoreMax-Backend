const { Router } = require("express");
const { UserRecord } = require("../record/UserRecord");
const { ValidationError } = require("../utils/handleErrors");
const bcrypt = require("bcrypt");

const registerRouter = new Router();

registerRouter.post("/", async (req, res) => {
  const { email, password, role, name, surname, phone } = req.body;
  let user = await UserRecord.findOneByEmail(email);
  if (user !== null) {
    throw new ValidationError("Konto z takim emailem istnieje");
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT),
  );
  console.log(hashedPassword);

  user = await new UserRecord({
    email,
    password: hashedPassword,
    role,
    name,
    surname,
    phone,
  });
  console.log(user);
  await user.insert();
  res.status(200).send(`Dodano użytkownika o numerze id: ${user.id}`);
});

module.exports = {
  registerRouter,
};
