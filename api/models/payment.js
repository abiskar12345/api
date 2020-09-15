const mongoose = require("mongoose");  
const paymentdetailSchema =mongoose.Schema({
   card_name: {
    type: String,
    required: true
  },
  card_nmber : {
    type: String,
    required: true
  },
  card_type:{
      type:String
  },
  user_card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});
module.exports = mongoose.model("Payment", paymentdetailSchema);

