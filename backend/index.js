const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const Stripe = require("stripe");

const app = express();
const port = process.env.PORT || 6011;

// ✅ Stripe secret key (replace with your actual key)
const stripe = new Stripe("51S8l6m365JZlMhSqQxEdXHxgRXpMwZYxQgW8LxEhlrU2no4I0j0l82hrbxQRHuli63sC3vVkadZC5jC35mt06ZfV00BzsQyBsC");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// MongoDB
const uri = "mongodb+srv://srinidhioct16:mano28@cluster0.q65vo4j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("Footwear");
    const usersCollection = db.collection("Sandals");
    const ordersCollection = db.collection("Orders"); // ✅ New collection for orders

   
    app.post("/upload", async (req, res) => {
      const { name, email, password } = req.body;
      if (!name || !email || !password) return res.status(400).json({ success: false, message: "All fields are required" });

      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) return res.status(409).json({ success: false, message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await usersCollection.insertOne({ name, email, password: hashedPassword });

      res.status(201).json({ success: true, message: "User registered", userId: result.insertedId });
    });

    app.post("/login", async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ success: false, message: "Email and password required" });

      const user = await usersCollection.findOne({ email });
      if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ success: false, message: "Invalid email or password" });

      res.status(200).json({ success: true, message: "Login successful", user: { name: user.name, email: user.email, _id: user._id } });
    });

    
    app.put("/reset-password", async (req, res) => {
      const { email, newPassword } = req.body;
      if (!email || !newPassword) return res.status(400).json({ message: "Email and new password are required." });

      const user = await usersCollection.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found." });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await usersCollection.updateOne({ email }, { $set: { password: hashedPassword } });

      res.json({ message: "Password reset successful" });
    });

    
    app.post("/create-checkout-session", async (req, res) => {
      try {
        const { items, userId } = req.body; // userId from frontend
        if (!items || items.length === 0) return res.status(400).json({ error: "No items provided" });

        // Convert items to Stripe format
        const lineItems = items.map((item) => ({
          price_data: {
            currency: "inr",
            product_data: { name: item.name },
            unit_amount: Math.round(Number(item.price) * 100),
          },
          quantity: item.quantity,
        }));

        // Calculate total
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Save order in MongoDB
        const orderDoc = {
          userId,
          items,
          total,
          date: new Date(),
          status: "pending", // will mark as completed after payment webhook if needed
        };
        const result = await ordersCollection.insertOne(orderDoc);

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url: `http://localhost:3000/Order?orderId=${result.insertedId}`,
          cancel_url: "http://localhost:3000/cart?canceled=true",
        });

        res.json({ id: session.id });
      } catch (error) {
        console.error("Stripe checkout error:", error);
        res.status(500).json({ error: error.message });
      }
    });

    app.get("/orders/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const order = await ordersCollection.findOne({ _id: new ObjectId(id) });
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
      }
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("DB connection error:", error);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
