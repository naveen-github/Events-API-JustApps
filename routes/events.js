const router = require('express').Router();
const eventCont = require('../controller/event.controller')

router.post('/', eventCont.eventList);

router.post('/add', eventCont.addEvent);

module.exports = router;
