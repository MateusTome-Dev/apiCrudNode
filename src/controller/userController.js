const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../services/userRepository");
const secretKey = "your_secret_key";

class userController {
  static async authenticateUser(req, res) {
    const { email, password } = req.body;
    try {
      const users = await userRepository.getUsers();
      const user = users.find((u) => u.email === email);

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign({ email: user.email }, secretKey, {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (error) {
      console.error("Error authenticating user:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async createUser(req, res) {
    const { email, password } = req.body;

    try {
      // Hash da senha usando bcrypt
      const hashedPassword = await bcrypt.hash(password, 5); // O segundo parâmetro é o saltRounds
      // Cria um novo objeto de usuário com a senha hasheada
      const newUser = {
        email,
        password: hashedPassword,
      };
      const user = await userRepository.createUser(newUser);
      // Retorna o novo usuário criado
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user" });
    }
  }

  static async listAllUsers(req, res) {
    try {
      const users = await userRepository.listAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Error listing users" });
    }
  }
}

module.exports = userController;
