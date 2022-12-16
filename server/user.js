var express = require("express");
var router = express.Router();
const conects = require("./connect");

async function generateSQL(resultUser, ServerID) {
  let sql = "";
  var checkuser = `SELECT name
    FROM sys.syslogins WHERE name = '${resultUser.username}'`;
  var resultCheckUser = await conects.execute(ServerID, checkuser);
  if (resultCheckUser.length == 0) {
    sql = `USE [master] \n CREATE LOGIN [${resultUser.username}]
  WITH PASSWORD = N'${resultUser.password}',`;
  } else {
    sql = `USE [master] \n ALTER LOGIN [${resultUser.username}] WITH`;
    if (resultUser.password != "") {
      sql += ` PASSWORD = N'${resultUser.password}',`;
    }
  }

  if (resultUser.checkMust == true) {
    sql = sql + ` MUST_CHANGE,`;
  } else {
    sql = sql + ` `;
  }

  if (resultUser.language == undefined) {
    sql = sql + ``;
  } else {
    if (resultUser.language.length > 2) {
      sql = sql + `\n DEFAULT_LANGUAGE = [` + resultUser.language + `],`;
    } else {
      sql = sql + `,`;
    }
  }

  if ((resultUser.defaultDatabase = undefined)) {
    if (resultUser.defaultDatabase.length > 2) {
      sql = sql + `\n DEFAULT_LANGUAGE = [` + resultUser.defaultDatabase + `],`;
    }
  } else {
    sql = sql + ``;
  }

  if (resultUser.checkPolicy == true) {
    sql = sql + "\n CHECK_POLICY = ON,";
  } else {
    sql = sql + "\n CHECK_POLICY = OFF,";
  }

  if (resultUser.checkExpirated == true) {
    sql = sql + "\n CHECK_EXPIRATION = ON";
  } else {
    sql = sql + "\n CHECK_EXPIRATION = OFF";
  }
  if (resultUser.disableLogin == true) {
    sql = sql + `\n ALTER LOGIN [` + resultUser.username + `] DISABLE`;
  }

  if (resultUser.permissionConnect == false) {
    sql = sql + `\n DENY CONNECT SQL TO [` + resultUser.username + `] CASCADE`;
  }

  

  for (const element of resultUser.serverRole) {
    var roleexist = `SELECT [${
      element.name == "public" ? "hasaccess" : element.name
    }]
    FROM sys.syslogins WHERE name = '${resultUser.username}'`;
    var roleexistresult = await conects.execute(ServerID, roleexist);

    if (
      element.role == 1 &&
      roleexistresult[0][
        element.name == "public" ? "hasaccess" : element.name
      ] == 0
    ) {
      console.log(element.name)
      sql =
        sql +
        `\n ALTER SERVER ROLE [${element.name}] ADD MEMBER [${resultUser.username}]`;
    }else if (element.role == 0 &&
      roleexistresult[0][
        element.name == "public" ? "hasaccess" : element.name
      ] == 1){
        sql =
        sql +
        `\n ALTER SERVER ROLE [${element.name}] DROP MEMBER [${resultUser.username}]`;
      }
  }

  console.log(resultUser.access);

  for (var i = 0; i < resultUser.access.length; i++) {
    var accessExist = `USE ${resultUser.access[i].database}
    SELECT  1 as existAccess FROM [sys].[database_principals] WHERE [name] = N'${resultUser.username}'`;
    var resultExist = await conects.execute(ServerID, accessExist);

    if (resultUser.access[i].role == 1) {
      if (resultExist.length == 0) {
        sql =
          sql +
          `\n USE ${resultUser.access[i].database} \n CREATE USER [${resultUser.username}] FOR LOGIN [${resultUser.username}]`;
      } else { 
        sql = sql + `\n USE ${resultUser.access[i].database} \n ALTER ROLE [${resultUser.access[i].name}] ADD MEMBER [${resultUser.username}]`;
      }
    } else {
      sql =
        sql +
        `\n USE [${resultUser.access[i].database}] \n DROP USER [${resultUser.access[i].userName}]`;
    }
  }

  return sql;
}

router.get("/", function (req, res) {
  res.send("GET route on things.");
});
router.post("/", function (req, res) {
  res.send("POST route on things.");
});

router.post("/databases", async function (req, res, next) {
  var ServerID = req.body.params.ServerID;
  var sql = "select name from sys.databases;";
  try {
    var results = await conects.execute(ServerID, sql);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

router.post("/users", async function (req, res, next) {
  var ServerID = req.body.params.ServerID;
  var sql = `SELECT createdate, name, denylogin, hasaccess, sysadmin, securityadmin, serveradmin, setupadmin, processadmin, diskadmin, dbcreator, bulkadmin 
FROM sys.syslogins WHERE name not like '##MS%' AND name not like '##NT %' AND name not like 'NT %'`;
  try {
    var results = await conects.execute(ServerID, sql);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

router.post("/defaultLanguages", async function (req, res, next) {
  var ServerID = req.body.params.ServerID;
  var sql = `SELECT langid, name, alias FROM sys.syslanguages`;
  try {
    var results = await conects.execute(ServerID, sql);
    res.json(results);
  } catch (err) {
    next(err);
  }
});



router.post("/drop", async function (req, res, next) {
  var ServerID = req.body.params.ServerID;
  var userName = req.body.params.userName;
  var sql = `DROP LOGIN [` + userName + `]`;
  try {
    var results = await conects.execute(ServerID, sql);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

router.post("/access", async function (req, res, next) {
  var ServerID = req.body.params.ServerID;
  var userName = req.body.params.userName;
  var db = req.body.params.database;
  let sql = `
    use [${db}]
    SELECT '${userName}' as userName, name,
    CASE 
     WHEN t.role_principal_name is null THEN 0
     else 1 END as role
   FROM (SELECT r.name role_principal_name, m.name AS member_principal_name
 FROM sys.database_role_members rm 
 LEFT JOIN sys.database_principals r 
     ON rm.role_principal_id = r.principal_id
 LEFT JOIN sys.database_principals m 
     ON rm.member_principal_id = m.principal_id
 where m.name = '${userName}')  as t
 RIGHT JOIN sys.database_principals dp ON dp.name = t.role_principal_name
 WHERE dp.type = 'R'`;
  try {
    var results = await conects.execute(ServerID, sql);
    res.json(results);
  } catch (err) {
    next(err);
  }
});
router.post("/SQLGenerate", async function (req, res, next) {
  var resultUser = req.body.body;
  var ServerID = req.body.params.ServerID;

  const result = await generateSQL(resultUser, ServerID);
  res.send(result);
});

router.post("/create", async function (req, res, next) {
  var resultUser = req.body.body;
  var ServerID = req.body.params.ServerID;
  const result = await generateSQL(resultUser, ServerID);

  try {
    var results = await conects.execute(ServerID, result);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

//export this router to use in our index.js
module.exports = router;
