const User = require("../model/User");
const VerifyToken = async (req, res, next) => {
    try {
      const token = req.params.token;
      // console.log(token)  
      if (!token) {
        return res.status(401).json({ message: "Unauthorized", status:401});
      }
      const user = await User.findByToken(token);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" , status: 401});
      }
  
      req.user = user;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  module.exports = VerifyToken;