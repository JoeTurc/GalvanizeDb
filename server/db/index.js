const {Pool} = require("pg")

const pool = new Pool({
  user: "gmdb_app",
  host: "localhost",
  database: "movies",
  password: "123",
  port: 5432
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}