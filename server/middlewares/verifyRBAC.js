

function verifyRBAC(roles = []) {
  return async (req, res, next) => {
    if (!req.user || !req.user.role_id) {
      console.log(req.user);
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const role = await getUserRole(req.user.role_id);
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }

      const hasRole = roles.includes(role);
      if (!hasRole) {
        return res
          .status(403)
          .json({ message: "U r Forbidden to access this resource" });
      }

      next();
    } catch (error) {
      console.error("Error fetching role:", error);
      next(error);
    }
  };
}

module.exports = verifyRBAC;
