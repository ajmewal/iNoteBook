var jwt = require('jsonwebtoken');
const JWT_SECRET = "nsf4CQunzDPD4kJfjIJT6iTN"


const fetchuser = async (req, res, next) => {
    let token
    try {
        token = req.header('cookie').split("=")[1]
    } catch (error) {
        token=null
    }
    
    
    if (!token) {
        return res.status(401).send({ error: "Access Denied" })
    }
    try {
        var decoded = await jwt.verify(token, JWT_SECRET);
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).send({ error: "Access Denied " + error })
    }


}

module.exports = fetchuser;