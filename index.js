const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// Connect With MongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.y0oum.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

// Collections
async function run() {
    try {
        await client.connect();
        const bannerCollection = client
            .db("genius-car-service")
            .collection("banner-ing");
        const aboutCollection = client
            .db("genius-car-service")
            .collection("about");
        const serviceCollection = client
            .db("genius-car-service")
            .collection("service");

        // Banner Image API
        app.get("/banner", async (req, res) => {
            const query = {};
            const cursor = bannerCollection.find(query);
            const banners = await cursor.toArray();
            res.send(banners);
        });
        // About API
        app.get("/about", async (req, res) => {
            const query = {};
            const cursor = aboutCollection.find(query);
            const abouts = await cursor.toArray();
            res.send(abouts);
        });
        // Service API
        app.get("/service", async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
    } finally {
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Server is Running");
});

app.listen(port, () => {
    console.log("Port is Running", port);
});
