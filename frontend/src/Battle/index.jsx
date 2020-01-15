import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, ScrollView, Text, Alert, Button,
} from 'react-native';
import { useSelector } from 'react-redux';
import { SERVER_URL } from 'react-native-dotenv';
import { Toast } from 'native-base';
import PlanetItem from './PlanetItem';
import PlayerItem from './PlayerItem';
import { CardView } from '../common/components';
import BattleReport from './BattleReport';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: -10,
  },
  planetsContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageStyle: {
    height: 64,
  },
  scrollView: {
    flex: 1,
  },
});

const PLANETS = ['blue', 'green', 'yellow', 'red', 'purple'];

const BATTLE_PREPARE = 'battlePrepare';
const BATTLE_REPORT = 'battleReport';

function Battle() {
  const [battleStatus, setBattleStatus] = useState(BATTLE_PREPARE);
  const [active, setActive] = useState(null);
  const [players, setPlayers] = useState([]);
  const { token } = useSelector((state) => state.auth);

  function handleBattleStart(id, name) {
    Alert.alert(
      'Battle Starting...',
      `You are going to battle with ${name.toUpperCase()}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => setBattleStatus(BATTLE_REPORT),
        },
      ],
      { cancelable: false },
    );
  }

  useEffect(() => {
    if (active) {
      fetch(`http://${SERVER_URL}/battle/planet/${active}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error('unexpected status code');
        })
        .then((response) => setPlayers(response.usersOnPlanet))
        .catch((error) => {
          Toast.show({
            type: 'warning',
            text: `Oops, ${error.message}`,
            buttonText: 'Okay',
          });
        });
    }
  }, [active]);

  function renderPlayers() {
    if (!players.length) {
      return (
        <CardView>
          <Text>No players on this planet.</Text>
        </CardView>
      );
    }
    return (
      <View>
        {
          players.map(({
            _id: key, username: name, hp, attack, defence, planetList, allLevels,
          }) => (
            <PlayerItem
              key={key}
              id={key}
              name={name}
              hp={hp}
              attack={attack}
              defence={defence}
              planets={planetList.length}
              allLevels={allLevels}
              onBattleStartWith={handleBattleStart}
            />
          ))
        }
      </View>
    );
  }

  if (battleStatus === BATTLE_REPORT) {
    return <BattleReport onBattleStatusChange={setBattleStatus} />;
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.planetsContainer}>
            {PLANETS.map(
              (type) => (
                <PlanetItem
                  key={type}
                  type={type}
                  active={active === type}
                  onSelectChange={setActive}
                />
              ),
            )}
          </View>
          {
            active
              ? renderPlayers()
              : (
                <CardView>
                  <Text>Please select a planet.</Text>
                </CardView>
              )
          }
        </ScrollView>
      </View>
    </View>
  );
}

export default Battle;
