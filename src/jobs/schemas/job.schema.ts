import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const JobSchema = new Schema({
  title: String,
  salary: Number,
});
export { JobSchema };
