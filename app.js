const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('site');
});
app.post('/', (req, res) => {
    const { name, company, phone, email, comment } = req.body;

    function main(){
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          domain: "supd.com",
          secure: false,
          auth: {
            user: 'dbnfkbq222@gmail.com',
            pass: 'KaSPiaN12'
          }
        });

        const body = `Здравствуйте ${name} из компании ${company}, спасибо что запросили демонстрацию нашего продукта`
        // setup email data with unicode symbols
        let mailOptions = {
          from: '"FLOWDOX СУПД" <dbnfkbq222@gmail.com>', // sender address
          to: `${email}`, // list of receivers
          subject: 'Благодарим за заказ демоверсии', // Subject line
          text: `${body}`, // plain text body
          html: `${body}` // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                res.render('site');
            }
            else {
                res.render('site');
            }
        });

        // console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


    }
      main();
});

app.listen(3001, () => console.log('Server started on port 3001...'));
