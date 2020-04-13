const covid19ImpactEstimator = (data) => {
  const input = data;
  const { periodType, reportedCases } = data;

  let { timeToElapse } = data;
  if (periodType === 'months') {
    timeToElapse = Math.trunc(timeToElapse * 30);
  } else if (periodType === ' weeks') {
    timeToElapse = Math.trunc(timeToElapse * 7);
  } else {
    timeToElapse = Math.trunc(timeToElapse * 1);
  }
  const impactCurrentInfected = reportedCases * 10;
  const severeImpactCurrentInfected = reportedCases * 50;
  const squarefactor = 1024;

  return {
    data: input,
    impact: {
      currentlyInfected: impactCurrentInfected,
      infectionsByRequestedTime: impactCurrentInfected * squarefactor
    },
    severeImpact: {
      currentlyInfected: severeImpactCurrentInfected,
      infectionsByRequestedTime: severeImpactCurrentInfected * squarefactor
    }
  };
};

export default covid19ImpactEstimator;
