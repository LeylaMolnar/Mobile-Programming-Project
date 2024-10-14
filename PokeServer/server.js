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

app.get("/getAllPoke", (req, res) => {
  readall().then((z) => res.send(z));
});

app.get("/getPoke/:name", (req, res) => {
  readone(req.params.name)
    .then((z) => {
      if (z) {
        console.log("Response Object:", z); // Log the object you're sending
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

async function readall() {
  console.log("readall started");
  const options = {
    projection: { _id: 1, name: 1 },
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

async function readone(pokeName) {
  console.log("readone started");
  try {
    await client.connect();

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
