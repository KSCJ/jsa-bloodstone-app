import React, { useState } from 'react';
import {
  View, ScrollView, Button,
} from 'react-native';
import PropTypes from 'prop-types';
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

const BATTLE_PREPARE = 'battlePrepare';

function BattleReport({ onBattleStatusChange }) {
  const [reports] = useState(mockedReport.battleReport);

  return (
    <ScrollView>
      <View>
        {
          reports.map(({ name, myLoss, enemyLoss }) => (
            <ReportItem name={name} myLoss={myLoss} enemyLoss={enemyLoss} />
          ))
        }
        <Button onPress={() => onBattleStatusChange(BATTLE_PREPARE)} title="BACK" />
      </View>
    </ScrollView>
  );
}

BattleReport.propTypes = {
  onBattleStatusChange: PropTypes.func,
};

BattleReport.defaultProps = {
  onBattleStatusChange: null,
}

export default BattleReport;
