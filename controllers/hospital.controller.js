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


exports.find = (request, response) => {
    const id = request.params.id;
    if(typeof id === "undefined" || id<=0)
        response.status(400).send({ message: 'Invalid id.' });
    
    else Hospital.find(id,
        (error, hospital) => {
            if (error)  response.status(500).send(
                { message: 'DB internal error.' + error});
            else{
                if(hospital.length > 0)  response.status(200).json(
                    hospital[0]
                );
                else response.status(200).json({});
            }
        }
    )
}

exports.update = (request, response) => {
    const id = request.params.id;
    if(typeof id === "undefined" || id<=0)
        response.status(400).send({ message: 'Invalid id.' });
    else{
        bodyhospital = getDatahospital(request.body);

        if(!bodyhospital.isCorrect)
            response.status(400).send({ message: 'Incorrect data.' });
        
        else Hospital.update(id, bodyhospital.data, 
            (error) => {  
                if (error)  response.status(500).send(
                    { message: 'DB internal error.' });
                else  response.status(200).json(
                    { message: 'Updated Successfully'}
                    );
            }
        )
    }
}



exports.delete = (request, response) => {
    const id = request.params.id;
    if(typeof id === "undefined" || id<=0)
        response.status(400).send({ message: 'Invalid id.' });

    else Hospital.delete(id, 
        (error) => {
            if (error)  response.status(500).send(
                { message: 'DB internal error. ' });
            
            else  hospital.delete(id,
                (error) => {
                    if (error)  response.status(500).send(
                        { message: 'DB internal error. '});
                    
                    else  response.status(200).json(
                        {  message: 'Deleted successfully.' }
                    );
                }
            )
        }
    )
}

const getDatahospital = (body) => {
    const data = {
        name : body.name,
        city : body.city,
    }
    
    return {isCorrect: validateData(data), data: data}
}

const validateData = (data) =>{
    let isCorrect = true;
    if((Object.keys(data)).some((key)=> typeof data[key] === 'undefined') ||
        (Object.keys(data)).some((key)=> data[key].length === 0))
            isCorrect = false;
    
    return isCorrect;
}
