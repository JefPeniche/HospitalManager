const express = require('express');
const hospitalRoutes = require('./routes/hospital.routes');
const patientRoutes = require('./routes/patient.routes');
const guardiansRoutes = require('./routes/guardian.routes');

const app = express();
const port = 3000;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Digital Hospital Server");
});

app.use('/api/hospitals', hospitalRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/guardians', guardiansRoutes)

app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});
