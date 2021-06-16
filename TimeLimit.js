const date = require('date-and-time');


function TimeExecutionLimit(currentTime, currentExecution, maxExecution, maxMin){   
    const now = new Date()
    
    if (date.subtract(now, currentTime).toMinutes() > maxMin ){
        return 'renew';
    }

    else if (currentExecution > maxExecution ){
        return 'block';
    }
    else{
        return 'continue';
    }


}

module.exports = {TimeExecutionLimit};