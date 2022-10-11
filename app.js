require("dotenv").config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


let counter = 1;     
const sendMail = async (msg) => {
   
    try{           
        await sgMail.send(msg);
        console.log(`Mail no. ${counter}/${emailList.length} has been sent`);//change emaiList.lenght with emailListWithNames.lenght if you choose case 2
        counter +=1;
    }
    catch(error){
        console.error(error);

        if(error.response){
            console.error(error.response.body);
        }

    }
};

//case 1 - Only e-mails are different, but the e-mail content is the same - Just comment case 2 if you want this one

//start of case 1
const emailList = [
    'email1@example.com',
    'email2@example.com',
    'email3@example.com',
    'add_as_many_emails_as_you_want_as_long_as_you_respect_the_pattern@example.com'
]

    emailList.map( (item, index) => {
        setTimeout(() => {sendMail(
            {
                to:`${item}`,
                from:{
                    email: 'your_verified_sendGrid_sender_email@example.com',
                    name: 'Email display name'
                },
                subject:'Email subject',
                html:'replace with html ( you can use https://html5-editor.net/ to generate html with e-mail compatible styling',   
             },
            )
        }, 1000*index )// 1000ms between e-mails so sendGrid won't crash - I know it might take a while, but this way you can send more than ~700 emails in one run
      });
//end of case 1


//case 2 - e-mails are different and you can add a little bit of personalization to e-mail content - Just comment case 1 if you want this one

//start of case 2
const emailListWithNames = [
    {
        mailAddress: 'email1@example.com',
        userName: 'name1'
    },
    {
        mailAddress: 'email2@example.com',
        userName: 'name2'
    },
    {
        mailAddress: 'email3@example.com',
        userName: 'name3'
    },
    {
        mailAddress: 'add_as_many_emails_as_you_want_as_long_as_you_respect_the_pattern@example.com',
        userName: 'name4'
    }
]


emailListWithNames.map( (item, index) => {
    setTimeout(() => {sendMail(
        {
            to:`${item.mailAddress}`,
            from:{
                email: 'your_verified_sendGrid_sender_email@example.com',
                name: 'Email display name'
            },
            subject:'Email subject',
            html:`<h1>Hello ${item.userName},</h1> replace with html ( you can use https://html5-editor.net/ to generate html with e-mail compatible styling`,   
         },
        )
    }, 1000*index )// 1000ms between e-mails so sendGrid won't crash - I know it might take a while but this way you can send more than ~700 emails in one run
  });
  //end of case 2