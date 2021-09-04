import './App.css';
import React, { useEffect } from 'react'
import { init, changeGraphic } from './Graphics';

const options = [
  'housingExpenditure', 'dwellingsWithoutBasicFacilities', 'roomsPerPerson', 'householdNetAdjustedDisposableIncome',
  'householdNetFinancialWealth', 'rmploymentRate', 'jobSecurity', 'longTermUnemploymentRate', 'personalEarnings',
  'qualityOfSupportNetwork', 'educationalAttainment', 'studentSkills', 'yearsInEducation', 'airPollution', 'waterQuality',
  'consultationOnRuleMaking', 'voterTurnout', 'lifeExpectancy', 'selfReportedHealth', 'lifeSatisfaction', 'assaultRate',
  'homicideRate', 'employeesWorkingVeryLongHours', 'timeDevotedToLeisureAndPersonalCare'
]

const Type = options.map(Type => Type)

const handleTypeChange = (e) => {
  document.getElementById('subtitle').innerText = e.target.value
  changeGraphic(e.target.value)
}

function App() {
  useEffect(() => {
    init()
  })
  return (
    <div className="App">
      <header className="App-header">
        <h3>EXAMPLE GRAPHICS</h3>
        <select onChange={e => handleTypeChange(e)}>
          {
            Type.map((type, key) => <option key={key}value={type}>{type}</option>)
          }
        </select>
        <h5 id="subtitle">housingExpenditure</h5>
        <svg width="960" height="500"></svg>
        <p>
          Edited by Enric Moriche.
        </p>
      </header>
    </div>
  );
}

export default App;
