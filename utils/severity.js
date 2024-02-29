exports.calculateSeverity = (type) => {
  let severity = 0;
 
  const num = Math.floor(Math.random() * 10);
  // severity += (vehicles) * 2; // Each vehicle adds 2 to severity
  // severity += casualties * 3; // Each casualty adds 3 to severity
  severity+=num;
 

  // Normalize the severity score to a scale of 1 to 10
  const normalizedSeverity = Math.min(10, Math.ceil(severity / 2));
  return normalizedSeverity;
};

// const accident = {
//   type: "Head on collision",
//   vehicles: 2,
//   casualties: 1,
//   propertyDamage: "Yes",
// };

// const severity = calculateSeverity(
//   accident.type,
//   accident.vehicles,
//   accident.casualties,
//   accident.propertyDamage
// );
// console.log("Severity:", severity);
