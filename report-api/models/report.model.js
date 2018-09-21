const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
	summary: {type: Array, required: true, max: 1000}
});

// Export the model
module.exports = mongoose.model('Report', ReportSchema);
