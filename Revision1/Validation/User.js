function validateUser(name, email, password){
    if(validateEmail(email) && validateName(name) && validatePassword(password)){
        return true;
    }
    return false;
}

function validateName(name){
    if (!name || typeof name !== 'string'){
        return false;
    }
    const regex = /^[a-zA-Z]{2,20}$/
    
    if(!regex.test(name.trim())) return false;

    return true;
}

function validateEmail(email){
    if (!email || typeof email !== 'string') return false;

  // Trim whitespace and convert to lowercase
  email = email.trim().toLowerCase();

  // RFC 5321 limits email length to 254 characters
  if (email.length > 254) return false;

  // Robust regex allowing standard special characters (!, #, $, %, etc.)
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!regex.test(email)) return false;

  // Optional: Check local part length (max 64 chars)
  const parts = email.split('@');
  if (parts[0].length > 64) return false;

  return true;
}

function validatePassword(password){
     if (!password || typeof password !== 'string') return false;

  // Regex using positive lookaheads for each requirement
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  return regex.test(password);
}

module.exports = {validateEmail, validateName, validatePassword, validateUser}