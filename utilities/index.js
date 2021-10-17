const allKeysHaveValue = (object) => {

  for (const key in object) {
    if (object[key] == undefined || object[key].length === 0) return false
  }
  return true
}

const isValidId = (id) => id == undefined || id <= 0

const isSexValid = sex => sex && (sex=='M' || sex=='F')

const sensitiveData = ['phone', 'email', 'password']
const hiddenSensitiveData = object => {
  let newObject = JSON.parse(JSON.stringify(object))

  for (const key of sensitiveData) {
    if(newObject.hasOwnProperty(key)) newObject[key] = undefined
  }

  return object
}

module.exports = {
  allKeysHaveValue,
  isValidId,
  isSexValid,
  hiddenSensitiveData  
}