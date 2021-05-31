const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: 'true' },
    imprint: { type: String, required: true },
    status: { type: String, enum: ['available', 'maintenance', 'loaned', 'reserved'], default: 'maintenance', required: true },
    due: { type: Date, default: Date.now }
  }
);

BookInstanceSchema
  .virtual('url')
  .get(() => `/catalog/bookInstance/${this._id}`);

module.exports = mongoose.model('BookInstance', BookInstanceSchema);