const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
        const reviewCollection = client
            .db("genius-car-service")
            .collection("review");
        const userCollection = client
            .db("genius-car-service")
            .collection("user");

        // Banner Image API (Get)
        app.get("/banner", async (req, res) => {
            const query = {};
            const cursor = bannerCollection.find(query);
            const banners = await cursor.toArray();
            res.send(banners);
        });

        // About API (Get)
        app.get("/about", async (req, res) => {
            const query = {};
            const cursor = aboutCollection.find(query);
            const abouts = await cursor.toArray();
            res.send(abouts);
        });

        // Service API (Get)
        app.get("/service", async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        //Review API (Get)
        app.get("/review", async (req, res) => {
            const query = {};
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });

        //User API (Get)
        app.get("/user", async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

        // Review API (POST)
        app.post("/review", async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        });

        // User API (POST)
        // app.put("/user/:email", async (req, res) => {
        //     const email = req.params.email;
        //     const filter = { email: email };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: user,
        //     };
        //     const result = await userCollection.updateOne(
        //         filter,
        //         options,
        //         updateDoc
        //     );
        //     res.send(result);
        // });
        app.post("/user", async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        // About API (PUT)
        app.put("/about/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    image: data.image,
                    title: data.title,
                    content: data.content,
                },
            };
            const result = await aboutCollection.updateOne(
                filter,
                updateDoc,
                options
            );
            res.send(result);
        });

        // Service API (PUT)
        app.put("/service/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    image: data.image,
                    title: data.title,
                    content: data.content,
                },
            };
            const result = await serviceCollection.updateOne(
                filter,
                updateDoc,
                options
            );
            res.send(result);
        });

        //Banner API (PUT)
        app.put("/banner/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    img1: data.img1,
                    img2: data.img2,
                    img3: data.img3,
                },
            };
            const result = await bannerCollection.updateOne(
                filter,
                updateDoc,
                options
            );
            res.send(result);
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
