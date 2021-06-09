const { format } = require('date-fns');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    firstName: { type: String, required: true, maxLength: 100 },
    familyName: { type: String, required: true, maxLength: 100 },
    dateOfBirth: { type: Date },
    dateOfDeath: { type: Date }
  }
);

AuthorSchema
  .virtual('name')
  .get(function() {
    return `${this.familyName}, ${this.firstName}`;
  });

AuthorSchema
  .virtual('lifespan')
  .get(function() {
    if (this.dateOfBirth) {
      return `${format(this.dateOfBirth, 'yyyy')}-${this.dateOfDeath ? format(this.dateOfDeath, 'yyyy') : ''}`;
    } else {
      return undefined;
    }
  })

AuthorSchema
  .virtual('url')
  .get(function() {
    return `/catalog/author/${this._id}`;
  });

module.exports = mongoose.model('Author', AuthorSchema);