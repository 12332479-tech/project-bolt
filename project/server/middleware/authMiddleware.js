const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  // Bearer <token>
  const tokenString = token.split(' ')[1];

  if (!tokenString) {
    return res.status(403).send({ message: 'Invalid token format!' });
  }

  jwt.verify(tokenString, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.userRole === 'admin') {
    next();
    return;
  }
  res.status(403).send({ message: 'Require Admin Role!' });
};

module.exports = {
  verifyToken,
  isAdmin
};
