const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const { sendEmail, sendSms } = require('./utils/notificationChannel');

const userModel = require('./models/user')
const notitificationModel = require('./models/notification');



const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.set('view-engine','ejs');

app.get('/',(req,res)=>{
    res.render('index.ejs');
})

app.post('/create',(req,res)=>{
    let{email,password,phone,notifications}=req.body;
    bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async function(err, hash){
        if(!hash){
            res.send("Error");
        }
        else{
        let user = await userModel.create({
        email,
        password:hash,
        notifications,
    }) 
    res.redirect('/login');
}  
})
    
});
});

app.get('/login',(req,res)=>{
    res.render('login.ejs');
})

app.post('/login',async(req,res)=>{
    let{email,password}=req.body;
    let user = await userModel.findOne({email:email});
    if(!user){
        res.send("no user found")
    }
    else{
        bcrypt.compare(password,user.password,(err,result)=>{
            if(!result){
                res.send('invalid credentials');
            }
            else{
                res.redirect('/notification');
            }
            
        })
    }
})

app.get('/notification',(req,res)=>{
    res.render('notification.ejs');
})

app.post('/notification',async (req,res)=>{
try{
   let{email,category,type,title,message,delivery}=req.body;
   let notification = await notitificationModel.create({
    email,
    category,
    type,
    title,
    message,
    delivery
   });

    if (notification.delivery.includes('email')) {
      await sendEmail(notification); 
      console.log('Email sent');
    }
    if (notification.delivery.includes('sms')) {
      await sendSms(notification); 
      console.log('SMS sent');
    }

    res.status(200).send({
      message: 'Notification saved and sent',
      notification:notification,
    });
}
  catch (error) {
    console.error('Error handling notification:', error);
    res.status(500).send({ error: 'Internal server error', message: error.message }); 
  }
})












const PORT = 3000;
app.listen(PORT,()=>{
    console.log("server is running");
})