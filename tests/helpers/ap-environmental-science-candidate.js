const { AP_SUBJECTS } = require('../../js/subjects');
const subject = AP_SUBJECTS.find((item) => item.id === 'ap-environmental-science');
if (!subject) throw new Error('AP Environmental Science is missing from the subject registry');
if (subject.releaseStatus !== 'draft') throw new Error(`AP Environmental Science must remain draft during candidate auditing, found ${subject.releaseStatus}`);
module.exports = subject;
