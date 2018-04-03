const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Ticket = require('../models/ticket');

router.post('/', async (req, res, next) => {
  const { 
    ticketNumber,
    status,
    customerName,
    phoneNumber,
    dateReceived,
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

  const ticket = await Ticket.findOne({ ticketNumber });

  if (ticket) {
    const error = new Error('Ticket number already used.');
    error.status = 403;
    return next(error);
  }

  const user = await User.findById(userId);
  if (user) {
    const newTicket = {
      ticketNumber,
      status,
      customerName,
      phoneNumber,
      dateReceived,
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
      user
    }

    let ticket = await Ticket.create(newTicket);
    ticket = await ticket.save();

    user.tickets.push(ticket);
    await user.save();

    return res.json(ticket);
  }
  const error = new Error('Must be a registered user to create ticket.');
  error.status = 403;
  return next(error);
});

module.exports = router;