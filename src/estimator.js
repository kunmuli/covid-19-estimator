const covid19ImpactEstimator = (data) => {
  const input = data;
  // Normalize the periods to days
  const { periodType, reportedCases, population } = data;
  let { timeToElapse } = data;
  switch (periodType.trim().toLowerCase()) {
    case 'months':
      timeToElapse = Math.trunc(timeToElapse * 30);
      break;
    case 'weeks':
      timeToElapse = Math.trunc(timeToElapse * 7);
      break;
    case 'days':
      timeToElapse = Math.trunc(timeToElapse * 1);
      break;
    default:
  }
  const factor = Math.trunc(timeToElapse / 3);

  const impactCurrentInfected = Math.trunc(reportedCases * 10);
  const severeImpactCurrentInfected = Math.trunc(reportedCases * 50);
  // Calculation functions
  // eslint-disable-next-line max-len
  const calculateInfectionsByRequestedTime = (currentInfections) => Math.trunc(currentInfections * 2 ** factor);

  const calculateSevereCasesByRequestedTime = (infections) => Math.trunc(infections * 0.15);

  const calculateAvailableBeds = (severeCases) => {
    const { totalHospitalBeds } = data;
    return Math.trunc(totalHospitalBeds * 0.35) - severeCases;
  };

  const calculateCasesforICU = (infections) => Math.trunc(infections * 0.05);

  const calculateCasesForVentilator = (infections) => Math.trunc(infections * 0.02);

  const calculateDollarInFlight = (infections) => {
    const {
      region: { avgDailyIncomeInUSD, avgDailyIncomePopulation }
    } = data;
    return Math.trunc(
      (infections * (avgDailyIncomePopulation * population)) * avgDailyIncomeInUSD * timeToElapse
    );
  };
  return {
    data: input,
    impact: {
      currentlyInfected: impactCurrentInfected,
      infectionsByRequestedTime: calculateInfectionsByRequestedTime(
        impactCurrentInfected
      ),
      severeCasesByRequestedTime: calculateSevereCasesByRequestedTime(
        calculateInfectionsByRequestedTime(impactCurrentInfected)
      ),
      hospitalBedsByRequestedTime: calculateAvailableBeds(
        calculateSevereCasesByRequestedTime(
          calculateInfectionsByRequestedTime(impactCurrentInfected)
        )
      ),
      casesForICUByRequestedTime: calculateCasesforICU(
        calculateInfectionsByRequestedTime(impactCurrentInfected)
      ),
      casesForVentilatorsByRequestedTime: calculateCasesForVentilator(
        calculateInfectionsByRequestedTime(impactCurrentInfected)
      ),
      dollarsInFlight: calculateDollarInFlight(
        calculateInfectionsByRequestedTime(impactCurrentInfected)
      )
    },
    severeImpact: {
      currentlyInfected: severeImpactCurrentInfected,
      infectionsByRequestedTime: calculateInfectionsByRequestedTime(
        severeImpactCurrentInfected
      ),
      severeCasesByRequestedTime: calculateSevereCasesByRequestedTime(
        calculateInfectionsByRequestedTime(severeImpactCurrentInfected)
      ),
      hospitalBedsByRequestedTime: calculateAvailableBeds(
        calculateSevereCasesByRequestedTime(
          calculateInfectionsByRequestedTime(severeImpactCurrentInfected)
        )
      ),
      casesForICUByRequestedTime: calculateCasesforICU(
        calculateInfectionsByRequestedTime(severeImpactCurrentInfected)
      ),
      casesForVentilatorsByRequestedTime: calculateCasesForVentilator(
        calculateInfectionsByRequestedTime(severeImpactCurrentInfected)
      ),
      dollarsInFlight: calculateDollarInFlight(
        calculateInfectionsByRequestedTime(severeImpactCurrentInfected)
      )
    }
  };
};

export default covid19ImpactEstimator;
