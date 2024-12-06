const jwt = require("jsonwebtoken")
const profileService = require("../services/profileService")

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // Attach user info from the token to req

    // Fetch the user's profile from the profileService
    const profileResponse = await profileService.getProfile()
    if (profileResponse.status === 200) {
      req.user.profile = profileResponse.data // Attach the full profile to req.user
    } else {
      return res.status(403).json({ message: "Invalid user profile" })
    }
    next()
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid token or profile service error" })
  }
}

module.exports = authenticate
