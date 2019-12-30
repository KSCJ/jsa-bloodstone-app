import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, YellowBox } from 'react-native';

import ResourceItem from './ResourceItem';
import { fetchResources } from './actionCreator';
import ErrorPopup from '../ErrorPopup';

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: Colors.textColor,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 12,
    color: Colors.greenColor,
  },
  resourceIcon: {
    width: 14,
    height: 14,
    marginHorizontal: 4,
  },
  buildingIcon: {
    width: 32,
    height: 32,
    marginRight: 4,
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowFlexSpaceAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  resourceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function ResourceView({
  buildingIcon,
  resourceIcon, amount, changeRate,
}) {
  let changeRateStr;
  let textColor;
  if (changeRate < 0) {
    changeRateStr = `${changeRate}/minute`;
    textColor = Colors.orangeColor;
  } else {
    changeRateStr = `+${changeRate}/minute`;
    textColor = Colors.greenColor;
  }

  return (
    <View style={styles.resourceView}>
      <Image style={styles.buildingIcon} source={buildingIcon} />
      <View>
        <View style={styles.rowFlex}>
          <Image style={styles.resourceIcon} source={resourceIcon} />
          <Text style={styles.text}>{amount}</Text>
        </View>
        <View>
          <Text style={{ ...styles.subText, color: textColor }}>{changeRateStr}</Text>
        </View>
      </View>
    </View>
  );
}

ResourceView.propTypes = {
  resourceIcon: PropTypes.number.isRequired,
  buildingIcon: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  changeRate: PropTypes.number.isRequired,
};

function Resources() {
  const dispatch = useDispatch();
  const { foodAmount, foodGeneration } = useSelector((state) => state.resources);
  const { goldAmount, goldGeneration } = useSelector((state) => state.resources);
  const { token } = useSelector((state) => state.auth);
  const error = useSelector((state) => state.resources.error);

  useEffect(() => {
    dispatch(fetchResources(token));
    const updateResourcesInterval = setInterval(() => dispatch(fetchResources(token)), 30000);
    return () => clearInterval(updateResourcesInterval);
  }, [goldAmount, foodAmount]);

  if (error) {
    return <ErrorPopup message={`Oops, ${error.message}`} />;
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <ResourceItem type="cookie" amount={foodAmount} rate={foodGeneration} />
      <ResourceItem type="gold" amount={goldAmount} rate={goldGeneration} />
    </View>
  );
}

export default Resources;
