import React from 'react';
import { Animated, Dimensions, StatusBar, StyleSheet, View } from 'react-native';

import SliderIndicator from '../../components/SliderIndicator'

import { data } from '../../content/data'

const { height, width } = Dimensions.get('screen')
const ITEM_WIDTH = width * 0.76
const ITEM_HEIGHT = ITEM_WIDTH * 1.47

const App: React.FC = () => {
    const scrollX = React.useRef(new Animated.Value(0)).current

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Animated.FlatList
                data={data}
                keyExtractor={item => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width
                    ]

                    const translateX = scrollX.interpolate({
                        inputRange,
                        outputRange: [-width * 0.7, 0, width * 0.7]
                    })

                    return (
                        <View style={[styles.itemContainer]}>
                            <View style={[styles.photoShadows]}>
                                <View style={[styles.photoContainer]}>
                                    <Animated.Image
                                        style={[
                                            styles.photo,
                                            { transform: [{ translateX }] }
                                        ]}
                                        source={{ uri: item.photo }}
                                    />
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
            <View style={{ flex: 1 }}>
                <SliderIndicator scrollX={scrollX} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    photo: {
        width: ITEM_WIDTH * 1.3,
        height: ITEM_HEIGHT,
        resizeMode: 'cover'
    },
    itemContainer: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginTop: height * 0.05
    },
    photoContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        overflow: 'hidden',
        alignItems: 'center',
        borderRadius: 18
    },
    photoShadows: {
        borderRadius: 18,
        elevation: 15,
        padding: 10,
        backgroundColor: '#FFF'
    }
})

export default App;