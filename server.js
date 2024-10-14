// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Mock data for different charging systems
const mockData = {
    edrv: {
        connectivity: "Connected",
        deviceIdentifier: "EDRV_Device12345",
        energyCapacity: "50 kWh",
        manufacturer: "EDRV Manufacturer"
    },
    ampUp: {
        connectivity: "Connected",
        deviceIdentifier: "AMPUP_Device54321",
        energyCapacity: "75 kWh",
        manufacturer: "AmpUp Manufacturer"
    }
};

// Mock OCPP endpoint
app.post('/ocpp', (req, res) => {
    const { systemType } = req.body;

    if (mockData[systemType]) {
        res.json(mockData[systemType]);
    } else {
        res.status(400).json({ error: "Unsupported system type" });
    }
});

// Other mock endpoints for specific charging systems
app.get('/edrv/:id/attach_simulator', (req, res) => {
    const { id } = req.params;
    res.json({
        message: `Attached simulator to EDRV device ${id}`,
        data: mockData.edrv
    });
});

app.get('/ampup/:id/attach_simulator', (req, res) => {
    const { id } = req.params;
    res.json({
        message: `Attached simulator to AmpUp device ${id}`,
        data: mockData.ampUp
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
