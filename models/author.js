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
  .get(() => `${this.familyName}, ${this.firstName}`);

AuthorSchema
  .virtual('lifespan')
  .get(() => (this.dateOfDeath.getYear() - this.dateOfBirth.getYear()).toString());

AuthorSchema
  .virtual('url')
  .get(() => `/catalog/author/${this._id}`);

module.exports = mongoose.model('Author', AuthorSchema);