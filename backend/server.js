const express = require('express');
const cors = require('cors'); // Import CORS
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('frontend'));
app.use(express.json());

// Enable CORS for the frontend domain
app.use(cors({
    origin: 'https://emailtester-frontend.onrender.com', // Replace with your actual frontend domain
}));

// Serve the frontend index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

// Handle POST requests for sending emails
app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sholanke49@gmail.com',
            pass: 'oubj drqf mqjk zkut',
        },
    });

    const mailOptions = {
        from: 'client',
        to: 'sholanke49@gmail.com',
        subject: `Message from client: ${req.body.subject}`,
        text: req.body.message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('success');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
