import React, { useState, useEffect } from 'react';
import {
  ScrollView, StyleSheet, View, Text, ActivityIndicator,
} from 'react-native';
import { Toast } from 'native-base';
import { SERVER_URL } from 'react-native-dotenv';
import RankRow from './RankRow';
import Searchbar from './Searchbar';
import Colors from '../common/colors';

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',
    fontSize: 24,
    borderRadius: 10,
    backgroundColor: Colors.lightenGrey,
  },
});

function Leaderboard() {
  const [ranking, setRanking] = useState(null);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetch(`http://${SERVER_URL}/users/ranking`)
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          return setRanking(response.users);
        }
        throw new Error('Unexpected status code');
      })
      .catch((error) => Toast.show({ text: error.message }));
  }, []);

  return (
    <ScrollView>
      <View style={{ padding: 10 }}>
        <Searchbar
          value={keyword}
          onValueChange={setKeyword}
          style={styles.searchBar}
        />
        {!ranking
          ? (
            <View style={{ alignItems: 'center' }}>
              <ActivityIndicator size={32} />
              <Text style={{ marginTop: 12 }}>Loading...</Text>
            </View>
          )
          : (
            ranking.filter(({ username }) => username.includes(keyword))
              .map((user, idx) => (
                <RankRow
                  key={user.username}
                  rank={idx + 1}
                  username={user.username}
                  gold={1}
                  kingdoms={1}
                />
              ))
          )}
      </View>
    </ScrollView>
  );
}

export default Leaderboard;
