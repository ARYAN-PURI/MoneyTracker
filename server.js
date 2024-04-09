const express=require('express');
let cors=require('cors');
let mongoose=require('mongoose');
let connect=mongoose.connect("mongodb://localhost:27017/moneyTracker");
connect.then((pro)=>{
    console.log('Mongo DB Connected');
})
let recordSchema=new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
},
{timestamps:true}
);
let recordModel=new mongoose.model('records',recordSchema);
let app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.post('/storeexpense',async(req,res)=>{
    let data=new recordModel({
        type:'expense',
        title:req.body.etitle,
        date:req.body.edate,
        amount:req.body.eamount
    });
    let result=await data.save();
    res.redirect('http://localhost:5500/index.html');
});
app.post('/storeincome',async(req,res)=>{
    let data=new recordModel({
        type:'income',
        title:req.body.ititle,
        date:req.body.idate,
        amount:req.body.iamount
    });
    let result=await data.save();
    res.redirect('http://localhost:5500/index.html');
});
app.get('/',async(req,res)=>{
    let result=await recordModel.find({});
    res.send(JSON.stringify(result));
});
app.delete('/:id',async(req,res)=>{
    let result=await recordModel.deleteOne({_id:req.params.id});
    res.send(result);
});
app.listen(5000,()=>{
    console.log('App Listening at Port',5000);
})