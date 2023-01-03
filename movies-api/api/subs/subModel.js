import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SubSchema = new Schema({
  email: { type: String, required: true},
  password: {type: String, unique: true, required: true },
});

SubSchema.statics.findByName = function (name) {
  return this.findOne({ name: name });
};

export default mongoose.model('Sub', SubSchema);