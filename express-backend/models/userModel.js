const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {

  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  resetToken: {
    type: String
  },
  resetTokenExp: {
    type: Date
  },
  maxHp: {
    type: Number,
    default: 100
  },
  currentHp: {
    type: Number,
    default: 100
  },
  maxMp: {
    type: Number,
    default: 20
  },
  currentMp: {
    type: Number,
    default: 20,
  },
  attackPower: {
    type: Number,
    default: 5
  },
  defensePower: {
    type: Number,
    default: 3
  },
  agility: {
    type: Number,
    default: 2
  },
  luck: {
    type: Number,
    default: 1
  }
});

UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
