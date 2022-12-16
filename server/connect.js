const sql = require("mssql");
var config = {
    user: "BDMonitor",
    password: "Sabd2021!!",
    server: "172.16.150.34",
    database: "app",
    trustServerCertificate: true,
  };

  async function connectDB() {
    const pool = new sql.ConnectionPool(config);

    try {
      await pool.connect();
      console.log("Connected to database");

      return pool;
    } catch (err) {
      console.log("Database connection failed!", err);

      return err;
    }
  }

  async function dconnectDB(server) {

    let dconfig = {
      user: server[0].username,
      password: server[0].password,
      server: server[0].server,
      database: "master",
      trustServerCertificate: false,
        options: {
        encrypt: false
      }
    };
    const pool = new sql.ConnectionPool(dconfig);

    try {
      await pool.connect();
      console.log("Connected to database");

      return pool;
    } catch (err) {
      console.log("Database connection failed!", err);
      return err;
    }
  }

  async function getServer(id) {
    const DB = await connectDB();

    try {
      const result = await DB.request().query(
        "SELECT * FROM app.dbo.connectdb WHERE id = " + id
      );

      return result.recordset;
    } catch (err) {
      console.log("Error querying database", err);
      DB.close();

      return err;
    } finally {
      DB.close();
    }
  }

  async function getName(server,sql) {
    const DB = await dconnectDB(server);

    try {
      const result = await DB.request().query(
        sql
      );

      return result.recordset;
    } catch (err) {
      console.log("Error querying database", err);
      DB.close();

      return err;
    } finally {
      DB.close();
    }
  }

  async function execute(id, sql) {
    let server = await getServer(id);
    let result = await getName(server, sql);
    return result;
  }
//   var test = execute();
//   console.log('aici')
//   console.log(execute())
//   execute();

  module.exports = { execute };