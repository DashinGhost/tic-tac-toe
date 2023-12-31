module.exports = (fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch((err) => {
      console.log("Err:", err);
      next(err);
    });
  };
};
