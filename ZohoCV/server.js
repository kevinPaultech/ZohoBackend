const express = require('express');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const port = 3002;

// Serve index.html as the main page

app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle CV upload and attachment
app.post('/upload', async (req, res) => {
    try {
        const cvFile = req.files.cvFile; // Assuming form input name is 'cvFile'
        
        // Upload CV and attach to a lead in Zoho CRM
        const attachResponse = await attachCVToLead(cvFile);
        
        res.json({
            message: 'CV uploaded and attached successfully',
            attachResponse
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to attach CV to a lead in Zoho CRM
async function attachCVToLead(cvFile) {
    try {
        const url = 'https://www.zohoapis.ca/crm/v6/Leads/14177000000141001/Attachments';
        const oauthToken = '1000.70df1590084ca85ffc6deb0318a84dfb.9213735e9fe81b87da0b2eff7fc60fc0';
        const headers = {
            'Authorization': `Zoho-oauthtoken ${oauthToken}`,
            'Content-Type': 'multipart/form-data'
        };

        const formData = new FormData();
        formData.append('file', cvFile.data, {
            filename: cvFile.name,
            contentType: cvFile.mimetype
        });
        
        const response = await axios.post(url, formData, { headers });
        return response.data;
    } catch (error) {
        console.error('Error attaching CV to lead:', error.message);
        throw error;
    }
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});