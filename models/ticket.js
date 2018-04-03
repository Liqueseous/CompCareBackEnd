const mongoose = require('mongoose');

// Ticket Schema
const TicketSchema = mongoose.Schema({
  ticketNumber: {type: String, required: true},
  status: {type: String, required: true},
  customerName: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  dateReceived: {type: String, required: true},
  assignee: {type: String, required: true},
  shortDescription: {type: String, required: true},
  computerMakeNModel: {type: String, required: true},
  estComplDate: {type: String, required: true},
  formFactor: {type: String, required: true},
  description: {type: String, required: true},
  location: {type: String, required: true},
  initDiagnosis: {type: String, required: true},
  repairNotes: {type: String, required: true},
  holdReason: {type: String},
  partsNeeded: {type: String},
  resolutionCode: {type: String},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Ticket = module.exports = mongoose.model('Ticket', TicketSchema);
