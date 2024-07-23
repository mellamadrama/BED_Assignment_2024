const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
    const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    jwt.verify(token, "your_secret_key", (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }
    
        const authorizedRoles = {
            // categories
            "/categories": ["user"],
            "/categories/:catId": ["user"], 

            //weeks
            "/weeks": ["user"],
            "/weeks/:catId/:userId": ["user"],
            "/weeks": ["user"],
            "/weeks/:weekName/:catId/:userId": ["user"],
            "/weeks/:weekName/:catId/:userId": ["user"],

            //datainput
            "/datainput": ["user"],
            "/datainput/:weekName/:catId/:userId/:dataId": ["user"],
            "/datainput/:weekName/:catId/:userId": ["user"],
            "/datainput": ["user"],
            "/datainput/:weekName/:catId/:userId/:dataId": ["user"],
            "/datainput/:weekName/:catId/:userId/:dataId": ["user"],

            //locations
            "/locations": ["user", "admin"],
            "/locations/:locationReqId": ["user", "admin"],
            "/createlocations": ["user"],
            "/updlocations/:locationReqId": ["admin"],
            "/dellocations/:locationReqId": ["admin"],

            //events
            "/events": ["user", "admin"],
            "/events/:eventId": ["user", "admin"],
            "/createevents": ["admin"],
            "/updateevents/:eventId": ["admin"],
            "/deleteevents/:eventId": ["admin"],

            //challenges
            "/challenges: ": ["user"],
            "/challenges/:id": ["user"],
            "/createchallenges": ["admin"],
            //"/challenges/:id": ["admin"],

            //user weekly challenges
            "/userchallenges/:userId": ["user"],
            "/updateuserchallenges/:challengeId/:userId": ["user"],
            "/deleteuserchallenges/:challengeId": ["user"],
            "/createuserchallenges": ["admin"],

            //points
            "/weeklypoints": ["user"],
            "/monthlypoints": ["user"],
            "/resetweekly": ["admin"],
            "/resetmonthly": ["admin"],
            "/addweekly/:userId": ["user"],
            "/addmonthly/:userId": ["user"],
            "/userweeklypoints/:userId": ["user"],
            "/usermonthlypoints/:userId": ["user"],

            //user account
            "/getuser": ["user"],
            "/getuser/:userId": ["user"],
            "/updateuser/:userId": ["user"],
            "/deleteuser/:userId": ["user"],

            //user history
            "/userlocations": ["user"],
            "/userlocations/:userId": ["user"],
            "/usertracker": ["user"],
            "/usertracker/:userId": ["user"],

            //admin account
            "/getadmin": ["admin"],
            "/getadmin/:adminId": ["admin"],
            "/updateadmin/:adminId": ["admin"],
            "/deleteadmin/:adminId": ["admin"],
            "/adminhistory/:adminId": ["admin"],
        };
    
        const requestedEndpoint = req.url;
        const userRole = decoded.role;
    
        const authorizedRole = Object.entries(authorizedRoles).find(
            ([endpoint, roles]) => {
            const regex = new RegExp(`^${endpoint}$`); 
            return regex.test(requestedEndpoint) && roles.includes(userRole);
            }
        );
    
        if (!authorizedRole) {
            return res.status(403).json({ message: "Forbidden" });
        }
    
        req.user = decoded; 
        next();
    });
}

module.exports = verifyJWT;
