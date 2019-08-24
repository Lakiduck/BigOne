const crypto = require('crypto');

const genSalt = function(){
  return crypto.randomBytes(16).toString('hex');
}

const hashFunc = function(password, salt){
  const hmac = crypto.createHmac('sha256', salt);
  hmac.update(password);
  const hashedValue = hmac.digest('hex');
  return {
    salt: salt,
    hashedPassword: hashedValue
  };
};

const saltHashPassword = function(password){
  const saltVal = genSalt();
  return hashFunc(password, saltVal);
};

module.exports = {
  hashFunc: hashFunc,
  saltHashPassword: saltHashPassword
};
