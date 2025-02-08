import mongoose from "mongoose"

const LogsSchema = new mongoose.Schema({
  user_id: String,
  log: String,
  date: { type: Date, default: Date.now },
})

export default mongoose.models.Logs || mongoose.model('Logs', LogsSchema)