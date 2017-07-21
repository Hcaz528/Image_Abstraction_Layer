const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const urlSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  originalLink: {
    type: String,
    required: 'You must supply a valid link!'
  },
  shortLink: {
    type: String,
    required: 'You must supply a valid link!'
  }
});

// function autopopulate(next) {
//   this.populate('link');
//   next();
// }

// urlSchema.pre('find', autopopulate);
// urlSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('URL', urlSchema);
