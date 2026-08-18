const { AP_SUBJECTS } = require('../../js/subjects');
const subject = AP_SUBJECTS.find((item) => item.id === 'ap-computer-science-a');
if (!subject) throw new Error('AP Computer Science A is missing from the subject registry');
if (!['draft','released'].includes(subject.releaseStatus)) throw new Error(`Unexpected AP CSA release status: ${subject.releaseStatus}`);
module.exports = subject;
