const { AP_SUBJECTS } = require('../../js/subjects');
const subject = AP_SUBJECTS.find((item) => item.id === 'ap-environmental-science');
if (!subject) throw new Error('AP Environmental Science is missing from the subject registry');
if (!['draft', 'released'].includes(subject.releaseStatus)) {
  throw new Error(`Unexpected AP Environmental Science release status: ${subject.releaseStatus}`);
}
module.exports = subject;
