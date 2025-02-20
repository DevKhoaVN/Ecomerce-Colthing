const app = require("./src/app");
require("dotenv").config({ path: "src/.env" });
const Port = process.env.PORT;

app.listen(Port, () => console.log(`Ecomerce start at ${Port}`));
