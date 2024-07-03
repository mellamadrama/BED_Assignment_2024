const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, "your_secret_key", { expiresIn: "3600s" }); // Expires in 1 hour

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

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
            "/books": ["member", "librarian"], //anyone can view books
            "/books/[0-9]+/availability": ["librarian"], //only librarians can update availability
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

module.exports = login, verifyJWT;  