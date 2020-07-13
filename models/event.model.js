const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  email:{
    type: String,
    required: true
  },
  environment:{
    type: String,
    trim: true,
    default:''
  },
  component:{
    type: String,
    trim: true,
    default:''
  },
  message:{
    type: String,
    trim: true,
    default:''
  },
  data:{
    type: Object
  }
},{
  timestamps: true,
});

EventSchema.methods.writeBusinessLogic = () => {
  console.log("Write business logic");
  
}

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;