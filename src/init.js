import "./db";
import "./models/Survey";
import app from "./server";

const PORT = 7000;
const handleListening = ()=> 
    console.log(`✅ Server listening on http://localhost:${PORT} 🚀`);
app.listen(PORT,handleListening);