const Guardian = require('../models/guardian.model');

exports.create = (request, response) => {    
    const data = { 
        name: request.body.name, 
        phone: request.body.phone 
    }

    if( (Object.keys(data)).some((key)=> typeof data[key] === 'undefined') ||
    (Object.keys(data)).some((key)=> data[key].length === 0))
        response.status(400).send({ message: 'Incomplete data.' });
    else{
        Guardian.create(data, 
            (error, guardian_id) => {  
                if (error)  response.status(500).send(
                    { message: 'DB internal error.' });
                else
                response.status(200).json(
                    { id: guardian_id }
                );
            }
        );
    }   
}

exports.findAll = (request, response) => {    
    Guardian.findAll( 
        (error, guardians)=> {  
            if (error)  response.status(500).send(
                { error: true, message: 'DB internal error.' });
            else
            response.status(200).json(
                { guardians: guardians }
            );
        }
    );
}

exports.find = (request, response) => {
    const id = request.params.id;
    if(typeof id === "undefined" || id<=0)
        response.status(400).send({ message: 'Invalid id.' });
    
    else Guardian.find(id,
        (error, guardian) => {
            if (error)  response.status(500).send(
                { message: 'DB internal error.' + error});
            else{
                if(guardian.length > 0)  response.status(200).json(
                    guardian[0]
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
        bodyGuardian = getDataGuardian(request.body);

        if(!bodyGuardian.isCorrect)
            response.status(400).send({ message: 'Incorrect data.' });
        
        else guardian.update(id, bodyGuardian.data, 
            (error) => {  
                if (error)  response.status(500).send(
                    { message: 'DB internal error.' });
                else  Guardian.update(id, bodyGuardian.data,
                    (error, result)=>{
                        if (error)  response.status(500).send(
                            { message: 'DB internal error.' });
                        else  response.status(200).json(
                            { message: 'Updated Successfully'}
                        );
                    }
                )
            }
        );
    }
}


exports.delete = (request, response) => {
    const id = request.params.id;
    if(typeof id === "undefined" || id<=0)
        response.status(400).send({ message: 'Invalid id.' });
    
    else Guardian.delete(id, 
        (error) => {
            if (error)  response.status(500).send(
                { message: 'DB internal error. ' });
            
            else  guardian.delete(id,
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

const getDataGuardian = (body) => {
    const data = {
        name : body.guardian_name,
        phone : body.guardian_phone
    }

    return {isCorrect: validateData(data), data: data}
}

const validateData = (data) =>{
    let isCorrect = true;
    if((Object.keys(data)).some((key)=> typeof data[key] === 'undefined') ||
        (Object.keys(data)).some((key)=> data[key].length === 0))
            isCorrect = false;
    
    else if(data.sex && data.sex!=='M' && data.sex!=='F')
        isCorrect = false
    
    return isCorrect;
}
