import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import { KanaGridBlock } from '../components/KanaGridBlock';

export const KanaGrid = ({ gridState, kanaFont, fontSize, onKanaPress }) => (
    gridState.map((rowState, i) =>
        <View key={i} style={styles.kanaRow}>
            {
                rowState.map((item, j) =>
                    item.kana === '' ? <View key={j} style={styles.dummyBlock} />
                        : <KanaGridBlock style={styles.kanaBlock} kanaFont={kanaFont} fontSize={fontSize || 50}
                            onPress={onKanaPress.bind(this, item)} key={j} selected={item.selected} kanaItem={item} />
                )
            }
        </View>
    )
);

const styles = StyleSheet.create({
    dummyBlock: {
        flex: 1,
        margin: 5,
        padding: 5,
    },
    kanaRow: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5
    },
    kanaBlock: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
    },
});
