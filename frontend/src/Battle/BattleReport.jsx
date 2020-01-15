import React, { useState, useEffect } from 'react';
import {
  View, ScrollView, Button, Text, ActivityIndicator,
} from 'react-native';
import { Toast } from 'native-base';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { SERVER_URL } from 'react-native-dotenv';
import ReportItem from './ReportItem';
import { CardView } from '../common/components';

// const mockedReport = {
//   isWinner: false,
//   battleReport: [
//     {
//       name: 'Fleet Battle loss',
//       myLoss: 31,
//       enemyLoss: 17,
//     },
//   ],
//   myTroopsLeft: 22,
//   enemyTroopsLeft: 108,
// };

const BATTLE_PREPARE = 'battlePrepare';

function BattleReport({ battleWith, onBattleStatusChange }) {
  const [reports, setReports] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!battleWith) {
      return;
    }
    fetch(`http://${SERVER_URL}/battle/${battleWith}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
        throw new Error('unexpected status code');
      })
      .then((response) => setReports(response))
      .catch((error) => Toast.show({ type: 'warning', text: `Oops, ${error.message}` }));
  }, [battleWith]);

  if (!reports) {
    return (
      <CardView style={{ alignItems: 'center' }}>
        <ActivityIndicator size={32} />
        <Text style={{ marginTop: 12 }}>Loading...</Text>
      </CardView>
    );
  }
  const { battleReport } = reports;
  return (
    <ScrollView>
      <View>
        {
          battleReport.map(({ name, myLoss, enemyLoss }) => (
            <ReportItem key={name} name={name} myLoss={myLoss} enemyLoss={enemyLoss} />
          ))
        }
        <Button onPress={() => onBattleStatusChange(BATTLE_PREPARE)} title="BACK" />
      </View>
    </ScrollView>
  );
}

BattleReport.propTypes = {
  onBattleStatusChange: PropTypes.func,
  battleWith: PropTypes.string,
};

BattleReport.defaultProps = {
  onBattleStatusChange: null,
  battleWith: '',
};

export default BattleReport;
