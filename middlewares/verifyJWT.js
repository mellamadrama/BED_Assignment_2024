const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    console.log("1", token);
    jwt.verify(token, "your_secret_key", (err, decoded) => {
        console.log("2", decoded);
        console.log("3", err);
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }
    
        const authorizedRoles = {
            // categories
            "/categories": ["User"],
            "/categories/:catId": ["User"], 

            //weeks
            "/weeks": ["User"],
            "/weeks/:catId/:userId": ["User"],
            "/weeks": ["User"],
            "/weeks/:weekName/:catId/:userId": ["User"],
            "/weeks/:weekName/:catId/:userId": ["User"],

            //datainput
            "/datainput": ["User"],
            "/datainput/:weekName/:catId/:userId/:dataId": ["User"],
            "/datainput/:weekName/:catId/:userId": ["User"],
            "/datainput": ["User"],
            "/datainput/:weekName/:catId/:userId/:dataId": ["User"],
            "/datainput/:weekName/:catId/:userId/:dataId": ["User"],

            //locations
            "/locations": ["User", "Admin"],
            "/locations/:locationReqId": ["User", "Admin"],
            "/createlocations": ["User"],
            "/updlocations/:locationReqId": ["Admin"],
            "/dellocations/:locationReqId": ["Admin"],

            //events
            "/events": ["User", "Admin"],
            "/events/:eventId": ["User", "Admin"],
            "/createevents": ["Admin"],
            "/updateevents/:eventId": ["Admin"],
            "/deleteevents/:eventId": ["Admin"],

            //challenges
            "/challenges": ["User", "Admin"],
            "/challenges/:id": ["User", "Admin"],
            "/createchallenges": ["Admin"],
            //"/challenges/:id": ["Admin"],

            //user weekly challenges
            "/userchallenges/:userId": ["User"],
            "/updateuserchallenges/:challengeId/:userId": ["User"],
            "/deleteuserchallenges/:challengeId": ["User"],
            "/createuserchallenges": ["Admin"],

            //points
            "/weeklypoints": ["User"],
            "/monthlypoints": ["User"],
            "/resetweekly": ["Admin"],
            "/resetmonthly": ["Admin"],
            "/addweekly/:userId": ["User"],
            "/addmonthly/:userId": ["User"],
            "/userweeklypoints/:userId": ["User"],
            "/usermonthlypoints/:userId": ["User"],

            //user account
            "/getuser": ["User"],
            "/getuser/:userId": ["User"],
            "/updateuser/:userId": ["User"],
            "/deleteuser/:userId": ["User"],

            //user history
            "/userlocations": ["User"],
            "/userlocations/:userId": ["User"],
            "/usertracker": ["User"],
            "/usertracker/:userId": ["User"],

            //admin account
            "/getadmin": ["Admin"],
            "/getadmin/:adminId": ["Admin"],
            "/updateadmin/:adminId": ["Admin"],
            "/deleteadmin/:adminId": ["Admin"],
            "/adminhistory/:adminId": ["Admin"],
        };
    
        const requestedEndpoint = req.url;
        const userRole = decoded.role;
    
        const authorizedRole = Object.entries(authorizedRoles).find(
            ([endpoint, roles]) => {
                const regexPattern = endpoint.replace(/:\w+/g, '[^/]+');
                const regex = new RegExp(`^${regexPattern}$`); 
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
