const mongoose=require('mongoose');
DeviceMotionEvent.config();
const DB_NAME=process.env.DB_NAME;
const MONGO_DB_SRV=process.env.MONGO_DB_SRV;

mongoose.connect(`${MONGO_DB_SRV}/${DB_NAME}`).then(()=>{
    console.log("connection successfull")
}).catch((err)=>{
    console.error(err);
});



