const Bds = require("../models/bds");
class RenderData {
  async index(req, res){
    try {
        const { Location_value, Price_value, Type_value, page } = req.body; // Đọc dữ liệu từ req.body
        const currentPage = parseInt(page) || 1; // Đọc giá trị trang từ req.body hoặc mặc định là 1
        const pageSize = 6; // Số bản ghi mỗi trang
        const skip = (currentPage - 1) * pageSize; // Tính số bản ghi cần bỏ qua
        
        // Tạo query để tìm kiếm
        let query = {};
  
        if (Location_value) {
            query.location = new RegExp(Location_value, 'i');
        }
  
        if (Price_value) {
            if (Price_value === '1') {
                query.price = { $lte: 1000000000 };
            } else if (Price_value === '2') {
                query.price = { $gt: 1000000000, $lte: 5000000000 };
            } else if (Price_value === '3') {
                query.price = { $gt: 5000000000 };
            }
        }
  
        if (Type_value) {
            query.type = Type_value;
        }
  
        // Lấy dữ liệu và tổng số bản ghi
        const [data, totalBds] = await Promise.all([
            Bds.find(query).skip(skip).limit(pageSize),
            Bds.countDocuments(query)
        ]);
  
        const totalPages = Math.ceil(totalBds / pageSize);
  
        // Render trang home với dữ liệu, trang hiện tại và tổng số trang
        res.render('home', { 
            data, 
            currentPage, 
            totalPages, 
            Location_value, 
            Price_value, 
            Type_value 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Có lỗi xảy ra');
    }
}
  async Get(req, res){
    try {
      const page = parseInt(req.query.page) || 1; // Đọc giá trị trang từ query hoặc mặc định là 1
      const pageSize = 6; // Số bản ghi mỗi trang
      const skip = (page - 1) * pageSize; // Tính số bản ghi cần bỏ qua

      // Tạo query để tìm kiếm
      let query = {};

      // Lấy dữ liệu và tổng số bản ghi
      const [data, totalBds] = await Promise.all([
        Bds.find(query).skip(skip).limit(pageSize).lean(), // Sử dụng lean() để trả về đối tượng JavaScript thuần túy
        Bds.countDocuments(query)
      ]);

      const totalPages = Math.ceil(totalBds / pageSize); // Tính tổng số trang

      // Render trang home với dữ liệu, trang hiện tại và tổng số trang
      res.render('home', { 
        data, 
        currentPage: page, 
        totalPages
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}};

module.exports = new RenderData();

