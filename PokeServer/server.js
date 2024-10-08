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

//========ENDPOINTS=========
app.get("/pingdb", (req, res) => {
  pingdb().then((response) => res.send(response));
});

app.get("/addPokeForm", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/form.html"));
});

app.post("/addPoke", (req, res) => {
  console.log("/addPoke");
  let pokemon = req.body;
  addPoke(pokemon).then((response) => res.send(response));
});

app.post("/submit", (req, res) => {
  console.log({
    name: req.body.name,
    message: req.body.message,
  });
  res.send("Thanks for your message!");
});

//========FUNCTIONS=========
async function pingdb() {
  try {
    console.log("pingdb started");
    await client.connect();
    await client.db("pokedb").command({ ping: 1 });
    console.log("Ping succeeded");
    return "woah";
  } catch (e) {
    return e;
  } finally {
    await client.close();
  }
}

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
