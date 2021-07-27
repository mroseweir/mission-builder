const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());




app.listen(4000, () => console.log('Server up and running on port 4000.'));