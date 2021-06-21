const date = require('date-and-time');
const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
  })

const queryHandler = (req, res, next) => {
    pool.query(req.sqlQuery).then((r) => {
      return res.json(r.rows || [])
    }).catch(next)
  }

function TimeExecutionLimitHelper(currentTime, currentExecution, maxExecution, maxMin){   
    const now = new Date()
    
    if (date.subtract(now, currentTime).toMinutes() >= maxMin ){
        return 'renew';
    }

    else if (currentExecution >= maxExecution ){
        return 'block';
    }
    else{
        return 'continue';
    }


}

function TimeExecutionLimit(req,res,next, param, maxExecution, maxMin){
    if (req.session.executions[param].time == undefined){
        const date2 = new Date();
        req.session.executions[param].time = date2;
      }
    
      if (! (req.session.executions[param].time instanceof Date)){
        req.session.executions[param].time = new Date(req.session.executions[param].time);
      }
    
      switch(TimeExecutionLimitHelper(req.session.executions[param].time, req.session.executions[param].count, maxExecution, maxMin)){
    
        case 'renew':
          req.session.executions[param].count = 1;
          req.session.executions[param].time = undefined;
          queryHandler(req,res,next);
          break;
    
        case 'block':
          res.status(400).send({message:"Max Limit Reached"});
          break;
    
        case 'continue':
          req.session.executions[param].count += 1;
          queryHandler(req,res,next);
          break;
      }
}

module.exports = {TimeExecutionLimit};