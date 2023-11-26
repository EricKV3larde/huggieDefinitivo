const Mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefrescarToken } = require('../auth/generateT.js');
const { getUserInfo } = require('../lib/getUserInfo.js');
const Token = require('./token.js');


const UserSchema = new Mongoose.Schema({
    id: {type: Object},
    nombre: { type: String, required: true},
    apellido: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
});

//encriptacion

UserSchema.pre('save', function(next){
    if(this.isModified('password') || this.isNew){
        const document = this;

        bcrypt.hash(document.password,10,(err,hash) =>{
            if(err){
              next(err);
            }else{
                document.password = hash;
                next();
            }
        })
    }else{
        next();
    }
})
// validacion de correo si ya existe
UserSchema.methods.emailnameExist = async function (email){
    const result = await Mongoose.model('User').find({email});
    //si encuentra uno por lo menos qu se repita es suficiente para que salga 
    return result.length > 0;
};

// comparar contraseña para el login
UserSchema.methods.comparePassword = async function (password, hash){
    const same = await bcrypt.compare(password,hash);
    return same;
};


UserSchema.methods.createAccessToken = function(){
    return generateAccessToken(getUserInfo(this));
};


UserSchema.methods.createrefrescarToken = async function(){
    const refrescarToken = generateRefrescarToken(getUserInfo(this));
    try {
        await new Token({token: refrescarToken}).save();

        return refrescarToken;
    } catch (error) {
        console.log(error);
    }
};




module.exports = Mongoose.model("User", UserSchema);

