const Report = require('../models/report.model');

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};
exports.report_create = function (req, res) {
    const { body } = req;
    if (!body.summary) {
        return res.status(400).send({
            message: 'summary is missing'
        });
    }
    const report_entry = new Report(
        {
            summary: body.summary
        }
    );

    report_entry.save(err => {
        if (err) {
            return next(err);
        }
        res.send({ message: 'Report entry Created successfully' });
    });
};

exports.report_details = function (req, res) {
    Report.find((err, report) => {
        if (err) {
            return next(err);
        }
        res.send(report);
    });
};
exports.report_details_by_id = function (req, res) {
    Report.findById(req.params.id, (err, report) => {
        if (err) {
            return next(err);
        }
        res.send(report);
    });
};
