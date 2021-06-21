const express = require('express');
// const pg = require('pg');
require('dotenv').config();
const app = express();
const session = require('express-session');
const cors = require('cors');

const date = require('date-and-time');

const {TimeExecutionLimit} = require("./TimeLimit.js");
// const TimeExecutionLimit = TimeLimit.TimeExecutionLimit;
// configs come from standard PostgreSQL env vars
// https://www.postgresql.org/docs/9.6/static/libpq-envars.html
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
      httpOnly: true,
    },
  })
);

// const pool = new pg.Pool({
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   host: process.env.PGHOST,
//   port: process.env.PGPORT,
//   database: process.env.PGDATABASE
// })

// const cpool = new pg.Pool({
//   user: process.env.CUSER,
//   password: process.env.CPASSWORD,
//   host: process.env.CHOST,
//   port: process.env.CPORT,
//   database: process.env.CDATABASE,
//   ssl: {
//     ca: fs.readFileSync('./cc-ca.crt').toString(),
//   },

// })


// app.post('/register', (req, res) =>{
//   const [email, password] = req.body;
//   const sql = ""
// })

app.get('/start', (req, res, next) => {
  if (req.session.time == undefined && req.session.user_id == undefined){
    
    req.session.time = new Date();
    const token = Math.floor(Math.random() * 1000000000).toString() + req.session.time.toString();
    req.session.user_id =token.replace(/\s/g, "");
    req.session.executions = {eventshourly:{count:0, time: undefined}, 
    eventsdaily: {count:0, time: undefined}, statshourly: {count:0, time:undefined},
     statsdaily: {count:0, time: undefined}, poi: {count:0, time: undefined}, 
     table:{count:0, time: undefined}, geo:{count:0, time: undefined}},
     
    req.session.save();
  }
  console.log(req.session.time);
  res.json({welcome:'Welcome to EQ Works 😎', time: req.session.time, user: req.session.user_id});
  next();
})

// {
//   "date": "2017-01-01T05:00:00.000Z",
//   "hour": 1,
//   "events": 14
// },
// {
//   "date": "2017-01-01T05:00:00.000Z",
//   "hour": 4,
//   "events": 6
// date is the x axis
// events is the y axis
// }
app.get('/events/hourly', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168;
  `
  TimeExecutionLimit(req,res,next, 'eventshourly', 5, 1);
 
  return 
})

// {
//   "date": "2017-01-01T05:00:00.000Z",
//   "events": "43"
// },
// {
//   "date": "2017-01-02T05:00:00.000Z",
//   "events": "32"
// }
// date is the x axis
// events is the y axis
app.get('/events/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  TimeExecutionLimit(req,res,next, 'eventsdaily', 5, 1);
  return 
})

// {
//   "date": "2017-01-01T05:00:00.000Z",
//   "hour": 0,
//   "impressions": 10746,
//   "clicks": 23,
//   "revenue": "64.9215630000000"
// },
// {
//   "date": "2017-01-01T05:00:00.000Z",
//   "hour": 1,
//   "impressions": 141397,
//   "clicks": 201,
//   "revenue": "696.4485960000000"
// },
// {
//   "date": "2017-01-01T05:00:00.000Z",
//   "hour": 2,
//   "impressions": 137464,
//   "clicks": 217,
//   "revenue": "732.0955030000000"
// }
app.get('/stats/hourly', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `
  TimeExecutionLimit(req,res,next, 'statshourly', 5, 1);
  return 
})

// {
//   "date": "2017-01-01T05:00:00.000Z",
//   "impressions": "2764609",
//   "clicks": "3627",
//   "revenue": "13092.1234790000000"
// },
// {
//   "date": "2017-01-02T05:00:00.000Z",
//   "impressions": "943070",
//   "clicks": "1489",
//   "revenue": "4275.3479640000000"
// }
app.get('/stats/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  TimeExecutionLimit(req,res,next, 'statsdaily', 5, 1);
  return 
})

// {
//   "poi_id": 1,
//   "name": "EQ Works",
//   "lat": 43.6708,
//   "lon": -79.3899
// },
// {
//   "poi_id": 2,
//   "name": "CN Tower",
//   "lat": 43.6426,
//   "lon": -79.3871
// },
app.get('/poi', (req, res, next) => {
  req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `
  TimeExecutionLimit(req,res,next, 'poi', 5, 1);
  return 
})
// "date": "2017-01-01T05:00:00.000Z",
// "name": "Vancouver Harbour",
// "lat": 49.2965,
// "lon": -123.0884,
// "poi_id": 4,
// "events": "14",
// "impressions": "141397",
// "clicks": "201",
// "revenue": "696.4485960000000"
app.get('/api/table', (req, res, next) => {
  req.sqlQuery = `
  SELECT date, name, lat, lon, poi_id, SUM(events) AS events,
  SUM(impressions) AS impressions,
  SUM(clicks) AS clicks,
  SUM(revenue) AS revenue
  FROM public.hourly_stats NATURAL JOIN public.poi NATURAL JOIN public.hourly_events
  GROUP BY date, poi_id, name, lat,lon
  ORDER BY date
  limit 168;
  `
  TimeExecutionLimit(req,res,next, 'table', 5, 1);
  return 
})

// {
//   "name": "EQ Works",
//   "lat": 43.6708,
//   "lon": -79.3899,
//   "poi_id": 1,
//   "events": "402",
//   "impressions": "6091190",
//   "clicks": "4965",
//   "revenue": "18503.6109340000000"
// },
app.get('/api/geo', (req,res, next) =>{
  req.sqlQuery = `
  SELECT name, lat, lon, poi_id, SUM(events) AS events,
  SUM(impressions) AS impressions,
  SUM(clicks) AS clicks,
  SUM(revenue) AS revenue
  FROM public.hourly_stats NATURAL JOIN public.hourly_events NATURAL JOIN public.poi
  GROUP BY  poi_id, name, lat,lon
  ORDER BY poi_id
  `
  TimeExecutionLimit(req,res,next, 'geo', 5, 1);
  return 
})

app.use(express.static(__dirname + '/client/build'));
app.get('*', (req, res) => {
  
  
  const goodPagesRoutes = [
    '/',
    '/chart',
    '/table',
    '/geo',
   
  ];

  if (!goodPagesRoutes.includes(req.url)) {
    res.status(404);
  }
  res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`)
  }
})

// last resorts
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})
