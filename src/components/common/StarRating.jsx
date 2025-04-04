import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starStyle: {
    marginHorizontal: 1,
  },
});

function StarRating({
  rating = 0, size = 24, interactive = false, onRatingChange = () => {},
}) {
  const handleStarPress = (selectedRating) => {
    if (interactive) {
      onRatingChange(selectedRating);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      const filled = i <= Math.round(rating);
      stars.push(
        <TouchableOpacity
          key={`star-${i}`}
          onPress={() => handleStarPress(i)}
          disabled={!interactive}
        >
          <Icon
            name={filled ? 'star' : 'star-border'}
            size={size}
            color="#FFD700"
            style={styles.starStyle}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  return <View style={styles.ratingContainer}>{renderStars()}</View>;
}

export default StarRating;
