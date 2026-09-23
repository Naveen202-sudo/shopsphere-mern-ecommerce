const app = require("./app")
const connectDatabase = require("./config/connectDatabase")

connectDatabase()

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`ShopSphere server running on port ${PORT}`);
    
})