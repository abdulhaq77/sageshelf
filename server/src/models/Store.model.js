import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  logo: {
    type: String,
    required: false,
  },
});

const Store = mongoose.model("Store", storeSchema);
export default Store;
