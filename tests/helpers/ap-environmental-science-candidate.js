const { AP_SUBJECTS } = require('../../js/subjects');
const base = AP_SUBJECTS.find((item) => item.id === 'ap-environmental-science');
module.exports = {
  ...base,
  formatVerified: true,
  releaseStatus: 'draft',
  calculatorAllowed: true,
  tierNote: 'Includes quantitative data, qualitative models/maps, and text-source sets; calculators are permitted throughout this practice section.',
  units: [
    { id:'U1', name:'The Living World: Ecosystems', examWeight:6/80, examWeightRange:[0.06,0.08] },
    { id:'U2', name:'The Living World: Biodiversity', examWeight:6/80, examWeightRange:[0.06,0.08] },
    { id:'U3', name:'Populations', examWeight:10/80, examWeightRange:[0.10,0.15] },
    { id:'U4', name:'Earth Systems and Resources', examWeight:10/80, examWeightRange:[0.10,0.15] },
    { id:'U5', name:'Land and Water Use', examWeight:10/80, examWeightRange:[0.10,0.15] },
    { id:'U6', name:'Energy Resources and Consumption', examWeight:10/80, examWeightRange:[0.10,0.15] },
    { id:'U7', name:'Atmospheric Pollution', examWeight:7/80, examWeightRange:[0.07,0.10] },
    { id:'U8', name:'Aquatic and Terrestrial Pollution', examWeight:7/80, examWeightRange:[0.07,0.10] },
    { id:'U9', name:'Global Change', examWeight:14/80, examWeightRange:[0.15,0.20] },
  ],
  skillCountRanges: { '1':[24,30], '2':[10,15], '3':[5,6], '4':[2,3], '5':[10,15], '6':[5,7], '7':[14,18] },
  examBlueprint: { sets: { quantitative:5, foundational:0, text:2, visual:5 } },
  constraintDrawAttempts: 30000,
  freeResponse: { timeMinutes:70, readingPeriodMinutes:0, questions:['Design an investigation','Analyze and interpret quantitative data','Analyze an environmental problem doing calculations'] },
};
