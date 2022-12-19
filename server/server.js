var express = require("express");
var router = express.Router();
const conects = require("./connect");
var prisma = require("./client");

router.get("/", async (req, res) => {
  const result = await prisma.$queryRaw`SELECT * FROM connectdb`;
  res.json(result);
});

router.post("/add", async function (req, res, next) {
  try {
    const user = await prisma.connectdb.create({
      data: {
        name: req.body.server.name,
        server: req.body.server.ip,
        port: req.body.server.port,
        username: req.body.server.username,
        password: req.body.server.password,
        type: req.body.server.type,
      },
    });
    console.log(user);
  } catch (err) {
    next(err);
  }
});

router.get("/get/:id", async function (req, res, next) {
  try {
    const serverIDDetail = await prisma.connectdb.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(serverIDDetail);
  } catch (err) {
    next(err);
  }
});

router.post("/edit", async function (req, res, next) {
  try {
    const user = await prisma.connectdb.create({
      data: {
        name: req.body.server.name,
        server: req.body.server.ip,
        port: req.body.server.port,
        username: req.body.server.username,
        password: req.body.server.password,
        type: req.body.server.type,
      },
    });
    console.log(user);
  } catch (err) {
    next(err);
  }
});

router.post("/detail", async function (req, res, next) {
  var ServerID = req.body.params.ServerID;
  var sql = `declare @tables nvarchar(max); 
    DECLARE @tmp TABLE (nr int);
    DECLARE @tablre_result int;
    DECLARE @databasses_result int;
    
    set @tables = N'select 0 as counts';
    select @tables = @tables + N' union all select count(*) as counts' + N' from ' + quotename(name) + N'.sys.tables'
    from sys.databases where database_id > 4
    and state = 0
    and user_access = 0;
    set @tables = N'SELECT SUM(t.counts) from  (' + @tables + ') as t'
    INSERT INTO @tmp
    exec sp_executesql @tables;
    SELECT @tablre_result = nr  from @tmp
    
    declare @wiews nvarchar(max);
    DECLARE @tmp_views TABLE (nr int);
    declare @wiews_result int;
    set @wiews = N'select 0 as counts';
    select @wiews = @wiews + N' union all select count(*) as counts' + N' from ' + quotename(name) + N'.sys.sysobjects WHERE xtype = ''V'''
    from sys.databases where database_id > 4
    and state = 0
    and user_access = 0;
    set @wiews = N'SELECT SUM(t.counts) from  (' + @wiews + ') as t'
    INSERT INTO @tmp_views
    exec sp_executesql @wiews;
    SELECT @wiews_result = nr from @tmp_views
    PRINT @wiews_result
    
    declare @procedure nvarchar(max);
    DECLARE @tmp_procedure TABLE (nr int);
    declare @procedure_result int;
    set @procedure = N'select 0 as counts';
    select @procedure = @procedure + N' union all select count(*) as counts' + N' from ' + quotename(name) + N'.sys.sysobjects WHERE xtype = ''P'''
    from sys.databases where database_id > 4
    and state = 0
    and user_access = 0;
    set @procedure = N'SELECT SUM(t.counts) from  (' + @procedure + ') as t'
    INSERT INTO @tmp_procedure
    exec sp_executesql @procedure;
    SELECT @procedure_result = nr from @tmp_procedure
    PRINT @procedure_result
    
    declare @function nvarchar(max);
    DECLARE @tmp_function TABLE (nr int);
    declare @function_result int;
    set @function = N'select 0 as counts';
    select @function = @function + N' union all select count(*) as counts' + N' from ' + quotename(name) + N'.sys.sysobjects WHERE xtype = ''FN'''
    from sys.databases where database_id > 4
    and state = 0
    and user_access = 0;
    set @function = N'SELECT SUM(t.counts) from  (' + @function + ') as t'
    INSERT INTO @tmp_function
    exec sp_executesql @function;
    SELECT @function_result = nr from @tmp_function
    PRINT @function_result
    
    SELECT @databasses_result = count(*) from sys.databases where database_id > 4
    
    --time work
    DECLARE @work int
    SELECT @work = DATEDIFF(day,sqlserver_start_time,GETDATE()) FROM sys.dm_os_sys_info;
    
    DECLARE @PRODUCTVER VARCHAR(50) = (SELECT
                                        CAST(SERVERPROPERTY('productversion') AS 
                                        VARCHAR(50))) DECLARE @VERSION VARCHAR( 30)= 
    CAST(LEFT(@PRODUCTVER,
    CHARINDEX('.', @PRODUCTVER)-1) AS INT) 
    SELECT
     SERVERPROPERTY('MachineName')                        AS MACHINENAME,
     'SQL Server '+ 
     CASE @VERSION 
      WHEN 9 
      THEN '2005' 
      WHEN 10 
      THEN '2008' 
      WHEN 11 
      THEN '2012' 
      WHEN 12 
      THEN '2014' 
      WHEN 13 
      THEN '2016' 
      WHEN 14 
      THEN '2017' 
      WHEN 15 
      THEN '2019' 
      ELSE 'Unknow Version' 
     END + ' ' + CAST(SERVERPROPERTY('edition') AS VARCHAR(50)) AS SQLSERVEREDITION,
     @PRODUCTVER                                          AS PRODUCTVERSION,
     SERVERPROPERTY('productlevel')                       AS PRODUCTLEVEL ,
     SERVERPROPERTY('NumLicenses')                        AS NUMLICENSES,
     SERVERPROPERTY('LicenseType')                        AS ISCLUSTERD,
     @tablre_result as tables,
     @databasses_result as databases,
     @wiews_result as views,
     @procedure_result as procedures,
     @function_result as functions,
     @work as worktime,
     'https://img.icons8.com/color/480/microsoft-sql-server.png' as img`;
  try {
    var results = await conects.execute(ServerID, sql);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

router.post("/mssql/CPU", async function (req, res, next) {
  var ServerID = req.body.params.ServerID;
  var sql = `      DECLARE @pct decimal (6, 3)  
    SELECT @pct = T.[CPUTimeAsPercentage]
    FROM
     (SELECT 
         [Database],
         CONVERT (DECIMAL (6, 3), [CPUTimeInMiliSeconds] * 1.0 / 
         SUM ([CPUTimeInMiliSeconds]) OVER () * 100.0) AS [CPUTimeAsPercentage]
      FROM 
       (SELECT 
           dm_execplanattr.DatabaseID,
           DB_Name(dm_execplanattr.DatabaseID) AS [Database],
           SUM (dm_execquerystats.total_worker_time) AS CPUTimeInMiliSeconds
        FROM sys.dm_exec_query_stats dm_execquerystats
        CROSS APPLY 
         (SELECT 
             CONVERT (INT, value) AS [DatabaseID]
          FROM sys.dm_exec_plan_attributes(dm_execquerystats.plan_handle)
          WHERE attribute = N'dbid'
         ) dm_execplanattr
        GROUP BY dm_execplanattr.DatabaseID
       ) AS CPUPerDb
     )  AS T
     SELECT @pct as cpuUsed`;
  try {
    var results = await conects.execute(ServerID, sql);
    res.json(results[0]);
  } catch (err) {
    next(err);
  }
});
router.post("/mssql/memory", async function (req, res, next) {
  var ServerID = req.body.params.ServerID;
  var sql = `declare @currmem int
  declare @smaxmem int
  declare @osmaxmm int
  declare @osavlmm int 

  -- SQL memory
  SELECT 
     @currmem = (committed_kb/1024),
     @smaxmem = (committed_target_kb/1024)           
  FROM sys.dm_os_sys_info;
  
  --OS memory
  SELECT 
     @osmaxmm = (total_physical_memory_kb/1024),
     @osavlmm = (available_physical_memory_kb/1024) 
  FROM sys.dm_os_sys_memory;
  
  SELECT  @currmem as SQL_current_Memory_usage_mb , @smaxmem as SQL_Max_Memory_target_mb, @osmaxmm as OS_Total_Memory_mb , @osavlmm as OS_Available_Memory_mb, (@osavlmm *100)/@osmaxmm as freeProcentage, 100-((@osavlmm *100)/@osmaxmm) as usedProcetage 
`;
  try {
    var results = await conects.execute(ServerID, sql);
    res.json(results[0]);
  } catch (err) {
    next(err);
  }
});

router.post("/mssql/storage", async function (req, res, next) {
  var ServerID = req.body.params.ServerID;
  console.log(ServerID);
  var sql = `SELECT distinct(volume_mount_point), 
    total_bytes/1048576 as Size_in_MB, 
    available_bytes/1048576 as Free_in_MB,
    (select ((available_bytes/1048576* 1.0)/(total_bytes/1048576* 1.0) *100)) as FreePercentage,
    100 - (select ((available_bytes/1048576* 1.0)/(total_bytes/1048576* 1.0) *100)) as SpaceUsed
  FROM sys.master_files AS f CROSS APPLY 
    sys.dm_os_volume_stats(f.database_id, f.file_id)
  group by volume_mount_point, total_bytes/1048576, 
    available_bytes/1048576 order by 1`;
  try {
    var results = await conects.execute(ServerID, sql);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

router.post("/mssql/sessions", async function (req, res, next) {
  var ServerID = req.body.params.ServerID;
  console.log(ServerID);
  var sql = `SELECT p.spid
    ,convert(char(12), d.name) db_name
    , program_name
    , convert(char(12), l.name) login_name
    , convert(char(12), hostname) hostname
    , cmd
    , p.status
    , p.blocked
    , login_time
    , last_batch
    , text as sql_script
    FROM      master..sysprocesses p
    CROSS APPLY sys.dm_exec_sql_text(sql_handle)  
    JOIN      master..sysdatabases d ON p.dbid =  d.dbid
    JOIN      master..syslogins l ON p.sid = l.sid`;
  try {
    var results = await conects.execute(ServerID, sql);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

router.post("/mssql/session/kill", async function (req, res, next) {
  var ServerID = req.body.params.ServerID;
  var spid = req.body.params.spid;
  console.log(spid);
  var sql = `KILL ` + spid;
  console.log(sql);
  try {
    var results = await conects.execute(ServerID, sql);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
