const bcrypt = require('bcrypt'),
    config = require('config');
    
class BcryptService{
    constructor(){
        this.config = config.get('configuration');
    }

    async generateHash(plainText){
        return new Promise((resolve, reject) => {
            bcrypt.hash(plainText, this.config.bcrypt.saltRound, (err, hash) => {
                if(err){
                    reject({status: 500, message: 'Error! while hash string', data: null});
                }
                resolve({status: 200, message: 'Success', data: hash});
            });
        });
    } 

    async compareHash(plainPassword, hashPassword){
        return new Promise(async (resolve, reject) =>{
            // const match = await bcrypt.compare(plainPassword, hashPassword);
            bcrypt.compare(plainPassword, hashPassword).then(async (result) => {
                if(result) {
                    return resolve(true);
                } else{
                    return resolve(false); 
                }
            });   
        });
    } 
}

module.exports = BcryptService;
