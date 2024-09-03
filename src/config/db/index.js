const mongoose = require('mongoose');

const db_url='mongodb://localhost:27017/batdongsan'
async function connect(){
try{
    await mongoose.connect(db_url, {});
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
}
module.exports = {connect};