const fs = require("fs");
const path = require("path");
const fileName = "user.json";
const filePath = path.join(__dirname, "..", "database", fileName);

class userRepository {
  static async writeUserFile(users) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.error(`Error writing to file: ${err}`);
          reject(err);
        } else {
          console.log(`Data written to file: ${filePath}`);
          resolve(users);
        }
      });
    });
  }

  static async listAllUsers() {
    try {
      const users = await this.getUsers();
      return users;
    } catch (err) {
      console.error(`Error listing users: ${err}`);
      throw err;
    }
  }

  static async getUsers() {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", async (err, data) => {
        if (err) {
          if (err.code === "ENOENT") {
            await this.writeUserFile([]);
            resolve([]);
          } else {
            console.error(`Error reading file: ${err}`);
            reject(err);
          }
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }

  static async createUser(user) {
    try {
      const users = await this.getUsers();
      user.id = users.length + 1;
      users.push(user);
      await this.writeUserFile(users);
      return user;
    } catch (err) {
      console.error(`Error creating user: ${err}`);
      throw err;
    }
  }

  static async getUserById(id) {
    try {
      const users = await this.getUsers();
      const user = users.find((u) => u.id === parseInt(id));
      return user;
    } catch (err) {
      console.error(`Error getting user by id ${id}: ${err}`);
      throw err;
    }
  }
}

module.exports = userRepository;
