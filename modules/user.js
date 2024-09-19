// const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true, 
        validate: {
            validator: function (v) {
                // Regular expression for email validation
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    username: {
        type: String,
        required: true,
    },
    
    is_varified:{
        type : Number,
        default : 0
    }

    
})


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);