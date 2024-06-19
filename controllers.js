const { connection } = require("./db");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).json({ error: "Please provide the credentials!" });

  const query = "SELECT * FROM users WHERE email = ?";

  connection.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error logging in" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found!" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.status(200).json({ status: "success", data: user });
  });
};

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "Please provide the credentials!" });

  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  connection.query(query, [name, email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error sign up" });
    }

    res.status(200).json({ status: "success", data: results });
  });
};

exports.getUsers = (req, res) => {
  const query = "select * from users";
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error getting users" });
    }
    res.status(200).json({ status: "success", data: result });
  });
};
