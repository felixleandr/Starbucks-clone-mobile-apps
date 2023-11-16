require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
const cors = require("cors");
const users = require('./routes/users')
const {connect} = require('./config/mongo')


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", users)


connect().then(() => {
    console.log('Success connect to mongo');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
})

