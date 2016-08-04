var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

var FLORIAN_STAT = 10;

var userSchema = mongoose.Schema({
	username: { type: String, required: true, index: { unique: true }, maxlength: 32 },
	email: { type: String, required: true, index: { unique: true }, maxlength: 500 },
	password: { type: String, required: true, index: { unique: true }, minlength: 6 },
	createdat: { type: Date, required: true, default: Date.now() },
	changedat: { type: Date },
	starred: [{ type: String }],
	preferences: String
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(FLORIAN_STAT), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
