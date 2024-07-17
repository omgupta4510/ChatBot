import app  from "./app.js";
import { connectToDatabase } from "./db/db.js";

console.log("Hare Krishna");
const PORT=process.env.PORT || 5000
connectToDatabase()
.then(()=>{
  app.listen(PORT ,()=>console.log("Server is open with database"));
})
.catch((err)=>console.log(err));
