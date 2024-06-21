const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/form', async (req, res) => {
 
  const {

    Last_Name,
    Email,
    Phone,
    Postal_Code,
    French,
    English,
    Educational_Institution,
    Study_Program,
    Time_Remaining,
    Skills,
    Company_Institution,
    Position,
    Linkedin,
    Experience_description,
    Reference_Name,
    Reference_Phone_Number
  } = req.body;

  try {
    const zohoEndpoint = 'https://www.zohoapis.ca/crm/v6/Leads';
    const accessToken = '1000.3bb1835d039c2c7e83dd18abce40c55e.85d45667f660a6039c0fd74ddd211f63';
    

    const response = await axios.post(
      zohoEndpoint,
      {
        data: [
          {
            Last_Name: Last_Name,
            Email: Email,
            Phone:Phone,
            Postal_Code:Postal_Code,
            French:French,
            English: English,
            Educational_Institution:Educational_Institution,
            Study_Program:Study_Program,
            Time_Remaining:Time_Remaining,
            Skills:Skills,
            Company_Institution:Company_Institution,
            Position:Position,
            Linkedin:Linkedin,
            Experience_description: Experience_description,
            Reference_Name:Reference_Name,
            Reference_Phone_Number:Reference_Phone_Number,

          },
        ],
      },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );
    console.log('Zoho CRM API Response:', response.data);
    res.status(200).json({ success: true, data: response.data });

    if(res.status(200)){
      console.log(response.data.data[0].details.id)
      // uploadFile(response.data.data[0].details.id)
    }
    
  } catch (error) {
    console.error('Error connecting to Zoho CRM', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// app.post('/api/cv', async (req, res) => {
//   let id = sessionStorage.getItem('id');
//   const {

//     test
//     // Experience_description,
//     // Reference_Name,
//     // Reference_Phone_Number
//   } = req.body;

//   try {
//     const zohoEndpoint = `https://www.zohoapis.com/crm/v6/Leads/${id}/Attachments`;
//     const accessToken = '1000.623e23420e770806b4776c02c68ab33b.d049b4dd75a79fe2193944a16ba62e52';
    

//     const response = await axios.post(
//       zohoEndpoint,
//       {
//         data: test,
//       },
//       {
//         headers: {
//           Authorization: `Zoho-oauthtoken ${accessToken}`,
//         },
//       }
//     );
//     console.log('Zoho CRM API Response:', response.data);
//     res.status(200).json({ success: true, data: response.data });

//     if(res.status(200)){
//       console.log(response.data.data[0].details.id)
//       // uploadFile(response.data.data[0].details.id)
//     }
    
//   } catch (error) {
//     console.error('Error connecting to Zoho CRM', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


