const mongoose = require("mongoose");

const memoSchema = mongoose.Schema({
  text: {
    type: String,
  },
});

const Memo = mongoose.model("Memo", memoSchema);

module.exports = { Memo };
