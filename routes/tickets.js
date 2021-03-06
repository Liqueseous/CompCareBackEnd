const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Ticket = require('../models/ticket');

router.post('/:ticketNumber', async (req, res, next) => {
  const { userData } = req;
  const { ticketNumber } = req.params;
  const userId = userData._id;
  const {
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
  } = req.body;

  const user = await User.findById(userId);

  if (user) {
    const ticket = await Ticket.findOne({ ticketNumber, user });
    if (ticket) {
      const error = new Error('Ticket number already used.');
      error.status = 403;
      return next(error);
    }
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
    let new_ticket = await Ticket.create(newTicket);

    if (new_ticket) {
      new_ticket = await new_ticket.save();
    } else {
      const error = new Error('Could not save ticket, must be missing values.');
      error.status = 400;
      next(error);
    }

    user.tickets.push(new_ticket);
    user.numTickets++;
    await user.save();

    return res.json(new_ticket);
  }
  const error = new Error('Must be a registered user to create ticket.');
  error.status = 400;
  return next(error);
});

router.put('/:ticketNumber', async (req, res, next) => {
  const { userData } = req;
  const { ticketNumber } = req.params;
  const userId = userData._id;
  const ticketData = { 
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
    resolutionCode
  } = req.body;
  const user = await User.findById(userId);
  if (user) {
    query = { user, ticketNumber };
    const updatedTicket = await Ticket.findOneAndUpdate(query, ticketData, {new: true});
    if (updatedTicket) {
      return res.json(updatedTicket);
    }
    const error = new Error('Could not find ticket');
    error.status = 404;
    return next(error);
  }
  const error = new Error('Must be a registered user to update ticket.');
  error.status = 400;
  return next(error);
})

router.get('/', async (req, res, next) => {
  const { userData } = req;
  const userId = userData._id;
  const user = await User.findById(userId);
  if (user) {
    const tickets = await Ticket.find({ user });
    if (tickets) {
      return res.send(tickets);
    } else {
      const error = new Error('User has no tickets');
      error.status = 404;
      return next(error);
    }
  }
  const error = new Error('Must be a registered user to create ticket.');
  error.status = 400;
  return next(error);
});

router.get('/:ticketNumber', async (req, res, next) => {
  const { userData } = req;
  const { ticketNumber } = req.params;
  const userId = userData._id;
  const user = await User.findById(userId);
  if (user) {
    const tickets = await Ticket.find({ user });
    if (tickets) {
      for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].ticketNumber === ticketNumber) {
          return res.json(tickets[i]);
        }
      }
      const error = new Error(`User doesn't have a ticket with number ${ticketNumber}`);
      error.status = 404;
      return next(error);
    } else {
      const error = new Error('User has no tickets');
      error.status = 404;
      return next(error);
    }
  }
  const error = new Error('no user by this id');
  error.status = 404;
  return next(error);
})

module.exports = router;
