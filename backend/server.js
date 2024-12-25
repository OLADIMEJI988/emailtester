const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static('frontend'));
app.use(express.json())

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/frontend/index.html')
})

app.post('/', (req, res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sholanke49@gmail.com',
            pass: 'oubj drqf mqjk zkut'
        }
    }) 

    const mailOptions = {
        from: 'client',
        to: 'sholanke49@gmail.com',
        subject: `Message from client: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
})
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
// app.use('/.netlify/functions/index', router)
