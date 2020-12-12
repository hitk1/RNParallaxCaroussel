import React from 'react';
import { Dimensions, View, Animated, StyleSheet } from 'react-native';
import { IProps } from './interfaces'

import { data } from '../../content/data'

const { width } = Dimensions.get('screen')
const spacing = 6
const size = 12

const SliderIndicator: React.FC<IProps> = ({ scrollX }) => {
    const inputRange = [0, width, width * 2]
    return (
        <View style={styles.indicatorContainer}>
            {data.map((_, index) => {
                const opacity = scrollX.interpolate({
                    inputRange: [(index - 1) * width, index * width, (index + 1) * width],
                    outputRange: [0.1, 1, 0.1],
                    extrapolate: 'clamp'
                })

                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.currentIndicator,
                            { opacity }
                        ]}
                    />
                )
            })}
            <Animated.View
                style={[
                    styles.slizingIndicator,
                    {
                        transform: [
                            {
                                translateX: scrollX.interpolate({
                                    inputRange,
                                    outputRange: [0, size + spacing * 2, (size + spacing * 2) * 2]
                                })
                            },
                            {
                                scaleX: Animated.modulo(
                                    Animated.modulo(
                                        Animated.divide(scrollX, width),
                                        width
                                    ),
                                    1
                                ).interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [1, 1 + size / spacing, 1]
                                })
                            }
                        ]
                    }
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    indicatorContainer: {
        flexDirection: 'row'
    },
    currentIndicator: {
        width: size,
        height: size,
        borderRadius: size,
        marginBottom: spacing,
        backgroundColor: '#333',
        marginHorizontal: spacing
    },
    slizingIndicator: {
        position: 'absolute',
        width: size,
        height: size,
        top: 0,
        left: 0,
        borderRadius: size,
        marginHorizontal: spacing,
        borderColor: '#333',
        borderWidth: 2,
        backgroundColor: '#333'
    }
})

export default SliderIndicator;