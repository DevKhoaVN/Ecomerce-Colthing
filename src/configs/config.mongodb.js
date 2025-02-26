require("dotenv").config();

// level 0

// const config = {
//     app:
//     {
//         port: 3000
//     },
//     db:
//     {
//         host: "localhost",
//         port: 27017,
//         dbname: "db"
//     }
// =================================================================
// level 1

// const dev = {
//   app: {
//     port: process.env.PORT || 3000,
//   },
//   db: {
//     host: process.env.DB_HOST || "localhost",
//     port: process.env.DB_PORT || 27017,
//     dbname: process.env.DB_NAME || "dbDev",
//   },
// };

// const pro = {
//   app: {
//     port: process.env.PORT || 3000,
//   },
//   db: {
//     host: process.env.DB_HOST || "localhost",
//     port: process.env.DB_PORT || 27017,
//     dbname: process.env.DB_NAME || "dbProduct",
//   },
// };

// level max

const dev = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27017,
    dbname: process.env.DEV_DB_NAME || "dbDev",
  },
};

const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 3000,
  },
  db: {
    host: process.env.PRO_DB_HOST || "localhost",
    port: process.env.PRO_DB_PORT || 27017,
    dbname: process.env.PRO_DB_NAME || "dbProduct",
  },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
