import 'dotenv/config'
import app from './app.js'
import connectDB from './config/db.js'
const PORT = process.env.PORT || 5001


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on http://localhost:5001");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });