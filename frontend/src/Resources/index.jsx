import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, YellowBox } from 'react-native';
import { fetchResources } from './actionCreator';
import ResourceItem from './ResourceItem';
import ErrorPopup from '../ErrorPopup';

YellowBox.ignoreWarnings(['Warning']);

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
