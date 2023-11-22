import express from "express";
import restaurants from "./routes/restaurants.mjs";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use("/restaurants", restaurants);

app.use((err,req,res,next)=>{
res.status(500).send("error here");
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
