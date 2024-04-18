const express = require("express");
const { ConnectDB } = require("./db/db.jsx");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const UserRouter = require("./routes/UserRoute.jsx");
const UserUpdateRoute = require("./routes/UserDetailsUpdate.jsx");
const TranferRoute = require("./routes/TransferAmount.jsx");
const { Auth } = require("./routes/middleware/AuthMiddleware.jsx");
const UserModel = require("./models/UserModel.jsx");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", UserRouter);
app.use(Auth);
app.use("/api/v1", UserUpdateRoute);
app.use("/api/v1/account", TranferRoute);

try {
  mongoose
    .connect("mongodb+srv://Kunal:Ayush3199@paytm.n6rckn4.mongodb.net/")
    .then(() =>
      app.listen(PORT, () => {
        console.log("app is running");
      })
    );

  //   ConnectDB();
} catch (error) {
  console.log(error);
}
