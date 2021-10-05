const Hospital = require('../models/hospital.model');

exports.create = (request, response) => {    
    const data = { 
        name: request.body.name, 
        city: request.body.city 
    }

    if( (Object.keys(data)).some((key)=> typeof data[key] === 'undefined') ||
    (Object.keys(data)).some((key)=> data[key].length === 0))
        response.status(400).send({ message: 'Incomplete data.' });
    else{
        Hospital.create(data, 
            (error, hospital_id) => {  
                if (error)  response.status(500).send(
                    { message: 'DB internal error.' });
                else
                response.status(200).json(
                    { id: hospital_id }
                );
            }
        );
    }   
}

exports.findAll = (request, response) => {    
    Hospital.findAll( 
        (error, hospitals)=> {  
            if (error)  response.status(500).send(
                { error: true, message: 'DB internal error.' });
            else
            response.status(200).json(
                { hospitals: hospitals }
            );
        }
    );
}

