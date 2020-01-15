import React, { useState } from 'react';
import {
  View, ScrollView,
} from 'react-native';
import ReportItem from './ReportItem';

const mockedReport = {
  isWin: false,
  battleReport: [
    {
      name: 'Fleet Battle loss',
      myLoss: 71,
      enemyLoss: 30,
    },
    {
      name: 'Fleet Battle loss',
      myLoss: 71,
      enemyLoss: 30,
    },
    {
      name: 'The Orbital Striking',
      myLoss: 27,
      enemyLoss: 65,
    },
  ],
};

function BattleReport() {
  const [reports] = useState(mockedReport.battleReport);

  return (
    <ScrollView>
      <View>
        {
          reports.map(({ name, myLoss, enemyLoss }) => (
            <ReportItem name={name} myLoss={myLoss} enemyLoss={enemyLoss} />
          ))
        }
      </View>
    </ScrollView>
  );
}

export default BattleReport;
