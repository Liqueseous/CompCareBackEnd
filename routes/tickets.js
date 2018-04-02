const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Ticket = require('../models/ticket');

router.post('/', async (req, res) => {
  const { 
    ticketNumber,
    status,
    customerName,
    phoneNumber,
    dateRecieved,
    assignee,
    shortDescription,
    computerMakeNModel,
    estComplDate,
    formFactor,
    description,
    location,
    initDiagnosis,
    repairNotes,
    holdReason,
    partsNeeded,
    resolutionCode,
    userId
  } = req.body;

  const user = await User.findById(userId);
  if (user) {
    const newTicket = {
      ticketNumber,
      status,
      customerName,
      phoneNumber,
      dateRecieved,
      assignee,
      shortDescription,
      computerMakeNModel,
      estComplDate,
      formFactor,
      description,
      location,
      initDiagnosis,
      repairNotes,
      holdReason,
      partsNeeded,
      resolutionCode,
      userId
    }

    let ticket = await Ticket.create(newTicket);
    ticket = await ticket.save();
    user.tickets.push(ticket);
    await user.save();
    return res.json(ticket);
  }
  return res.status(403).json({ errors: 'Must be a registered user to create ticket'} );
});