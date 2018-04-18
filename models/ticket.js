const mongoose = require('mongoose');

// Ticket Schema
const TicketSchema = mongoose.Schema({
  ticketNumber: {type: String, default: 'n/a'},
  status: {type: String, default: 'n/a'},
  customerName: {type: String, default: 'n/a'},
  phoneNumber: {type: String, default: 'n/a'},
  dateReceived: {type: String, default: 'n/a'},
  assignee: {type: String, default: 'n/a'},
  shortDescription: {type: String, default: 'n/a'},
  computerMakeNModel: {type: String, default: 'n/a'},
  estComplDate: {type: String, default: 'n/a'},
  formFactor: {type: String, default: 'n/a'},
  description: {type: String, default: 'n/a'},
  location: {type: String, default: 'n/a'},
  initDiagnosis: {type: String, default: 'n/a'},
  repairNotes: {type: String, default: 'n/a'},
  holdReason: {type: String, default: 'n/a'},
  partsNeeded: {type: String, default: 'n/a'},
  resolutionCode: {type: String, default: 'n/a'},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Ticket = module.exports = mongoose.model('Ticket', TicketSchema);
