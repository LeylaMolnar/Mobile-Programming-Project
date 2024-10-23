const path = require(`path`);
const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This middleware is available in Express v4.16.0 onwards
app.use(express.urlencoded({ extended: true }));

//MongoDB connection
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
var uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello from App Engine!");
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

app.post("/submit", (req, res) => {
  // console.log({
  //   name: req.body.name,
  //   message: req.body.message,
  // });
  console.log("post/submit");
  res.send("Thanks for your message!");
});

//========POKEMON ENDPOINTS=========
app.get("/pingdb", (req, res) => {
  pingdb().then((response) => res.send(response));
});

app.get("/PokeForm", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/pokeForm.html"));
});

app.post("/addPoke", (req, res) => {
  console.log("/addPoke");
  let pokemon = req.body;
  addPoke(pokemon).then((response) => res.send(response));
});

app.get("/getAllPoke", (req, res) => {
  readall().then((z) => res.send(z));
});

app.get("/getPoke/:name", (req, res) => {
  console.log("/getpoke/" + req.params.name);
  readonepoke(req.params.name)
    .then((z) => {
      if (z) {
        // console.log("Response Object:", z); // Log the object you're sending
        res.json(z); // Send the document as JSON
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    })
    .catch((err) => {
      console.error("Error occurred:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.get("/getPokeByDate/:date", (req, res) => {
  readonebydate(req.params.date)
    .then((z) => {
      if (z) {
        // console.log("Response Object:", z); // Log the object you're sending
        res.json(z); // Send the document as JSON
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    })
    .catch((err) => {
      console.error("Error occurred:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.put("/updatePoke", (req, res) => {
  console.log("/updatePoke");
  let pokemon = req.body;
  updatePoke(pokemon);
});

app.delete("/deletePoke/:id", (req, res) => {
  const id = req.params.id;
  // console.log("/deletepoke " + id);
  deletePoke(id);
});

//========POKEMON FUNCTIONS=========

async function addPoke(pokemon) {
  console.log("addPoke function called");
  try {
    await client.connect();
    await client.db("pokeguesser").collection("game").insertOne(pokemon);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

async function readall() {
  console.log("readall started");
  const options = {
    sort: { date: 1 },
    projection: { _id: 1, date: 1, name: 1 },
  };
  try {
    let arr = new Array();
    await client.connect();
    result = client.db("pokeguesser").collection("game").find({}, options);
    for await (const doc of result) {
      arr.push(doc);
    }
    return arr;
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

async function readonepoke(pokeName) {
  console.log("readonepoke started (pokemon)");
  try {
    await client.connect();

    console.log(pokeName);
    // Query to find the document by name
    const result = await client
      .db("pokeguesser")
      .collection("game")
      .findOne({ name: pokeName });

    console.log("Result retrieved:", result); // Log the retrieved result

    return result; // Return only the document
  } catch (e) {
    console.error("Error occurred:", e);
  } finally {
    await client.close(); // Ensure the client is closed
  }
}

async function readonebydate(pokeDate) {
  console.log("readonebydate started");
  try {
    await client.connect();

    // Query to find the document by name
    const result = await client
      .db("pokeguesser")
      .collection("game")
      .findOne({ date: pokeDate });

    // console.log("Result retrieved:", result); // Log the retrieved result

    return result; // Return only the document
  } catch (e) {
    console.error("Error occurred:", e);
  } finally {
    await client.close(); // Ensure the client is closed
  }
}

async function updatePoke(pokemon) {
  console.log("Updating pokemon by id: " + pokemon._id);
  try {
    var filter = { _id: new ObjectId("" + pokemon._id) };
    let { _id, ...updateFields } = pokemon;
    var update = {
      $set: updateFields,
    };
    await client.connect();
    await client.db("pokeguesser").collection("game").updateOne(filter, update);
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

async function deletePoke(id) {
  console.log("Deleting pokemon by id: " + id);
  try {
    var deletequery = { _id: new ObjectId("" + id) };
    await client.connect();
    await client.db("pokeguesser").collection("game").deleteOne(deletequery);
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

//========USER ENDPOINTS=========
app.get("/UserForm", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/userForm.html"));
});

app.post("/addUser", (req, res) => {
  console.log("/addUser");
  let user = req.body;
  addUser(user).then((response) => res.send(response));
});

app.get("/getUser/:username", (req, res) => {
  readoneuser(req.params.username)
    .then((z) => {
      if (z) {
        // console.log("Response Object:", z); // Log the object you're sending
        res.json(z); // Send the document as JSON
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    })
    .catch((err) => {
      console.error("Error occurred:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.put("/updateUser", (req, res) => {
  console.log("/updateUser");
  let user = req.body;
  updateUser(user);
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  // console.log("/deletepoke " + id);
  deleteUser(id);
});

//========USER FUNCTIONS=========
async function addUser(user) {
  console.log("addUser function called");
  try {
    await client.connect();
    await client.db("pokeguesser").collection("user").insertOne(user);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

async function readoneuser(username) {
  console.log("readoneuser started");
  try {
    await client.connect();
    const result = await client
      .db("pokeguesser")
      .collection("user")
      .findOne({ username: username });
    return result;
  } catch (e) {
    console.error("Error occurred:", e);
  } finally {
    await client.close();
  }
}

async function updateUser(user) {
  console.log("Updating user by id: " + user._id);
  try {
    var filter = { _id: new ObjectId("" + user._id) };
    let { _id, ...updateFields } = user;
    var update = {
      $set: updateFields,
    };
    await client.connect();
    await client.db("pokeguesser").collection("user").updateOne(filter, update);
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

async function deleteUser(id) {
  console.log("Deleting user by id: " + id);
  try {
    var deletequery = { _id: new ObjectId("" + id) };
    await client.connect();
    await client.db("pokeguesser").collection("user").deleteOne(deletequery);
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}
