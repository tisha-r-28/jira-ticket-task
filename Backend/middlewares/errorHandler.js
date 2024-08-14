function errorHandler (err, req, res, next){
    if(err){
        return res.status(500).json({
            code : 500,
            message : `error handler : ${err.message}`
        })
    }
    
    next();
}

module.exports = errorHandler;