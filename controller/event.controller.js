const _ = require('lodash');
let Event = require('../models/event.model');
module.exports = {
addEvent : (req, res) => {
  let body = _.pick(req.body, ['email', 'environment', 'component', 'message', 'data']);
  const newEvent = new Event(body);
console.log(body);

  newEvent.save()
    .then((eventData) => {
      let eventObj = new Event();
      eventObj.writeBusinessLogic();
      res.status(200).json({status:true, message:"Event added successfully",eventData})
    })
    .catch(error => res.status(400).json({status:false, error}));
},

eventList : (req, res) => {
  let body = _.pick(req.body, ['email', 'environment', 'component', 'message', 'date']);
  let matchObj = {}

  if(Object.keys(body).length>0){
    if(body.email)
    matchObj.email=body.email
    if(body.environment)
      matchObj.environment=body.environment
    if(body.component)
      matchObj.component=body.component
    if(body.message)
      matchObj.message= {$regex: body.message, '$options' : 'i' }
    if(body.date)
      matchObj.createdAt={$gte:new Date(body.date).setHours(00,00,00), $lte:new Date(body.date).setHours(23,59,59)}
  }
  
  Event.find(matchObj, '-updatedAt -__v')
  .then((events) => {
    let eventObj = new Event();
    eventObj.writeBusinessLogic();
    res.status(200).json({status:true, message:"Event listing", events})
  })
  .catch(error => res.status(400).json({status:false, error}));
},

}