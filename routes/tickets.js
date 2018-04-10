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
    user.numTickets++;
    await user.save();

    return res.json(ticket);
  }
  const error = new Error('Must be a registered user to create ticket.');
  error.status = 403;
  return next(error);
});

router.put('/:userId/:ticketNumber', async (req, res, next) => {
  const { userId, ticketNumber } = req.params;
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
    error.status = 403;
    return next(error);
  }
  const error = new Error('Must be a registered user to update ticket.');
  error.status = 403;
  return next(error);
})

router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (user) {
    const tickets = await Ticket.find({ user });
    if (tickets) {
      return res.send(tickets);
    } else {
      const error = new Error('User has no tickets');
      error.status = 403;
      return next(error);
    }
  }
  const error = new Error('Must be a registered user to create ticket.');
  error.status = 403;
  return next(error);
});

router.get('/:userId/:ticketNumber', async (req, res, next) => {
  const { userId, ticketNumber } = req.params;
  const user = await User.findById(userId);
  if (user) {
    const tickets = await Ticket.find({ user });
    if (tickets) {
      for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].ticketNumber === ticketNumber) {
          return res.json(tickets[i]);
        } else {
          const error = new Error(`User doesn't have a ticket with number ${ticketNumber}`);
          error.status = 403;
          return next(error);
        }
      }
    } else {
      const error = new Error('User has no tickets');
      error.status = 403;
      return next(error);
    }
  }
  const error = new Error('no user by thi id');
  error.status = 403;
  return next(error);
})

module.exports = router;
