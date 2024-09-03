const Bds = require("../models/bds");
class bdsDetail {
    async detail(req, res) {
      try {
        const data = await Bds.findById(req.params.id).lean();
        if (!data) {
          return res.status(404).send("Bất động sản không tồn tại");
        }
        res.render("detail", { data});
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
  }
  
module.exports = new bdsDetail();