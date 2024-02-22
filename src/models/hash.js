import mongoose from "mongoose"

const hashSchema = new mongoose.Schema({
  hash: { type: String, unique: true, required: true },
  url: { type: String, unique: false, required: true },
  hash_creation: {type: Date, default: new Date()}
});

const Hash = mongoose.models.hashes || mongoose.model('hashes', hashSchema);
export default Hash;

