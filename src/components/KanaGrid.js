import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import { KanaBlock } from '../components/KanaBlock';

export const KanaGrid = ({ gridState, kanaFont, fontSize, onKanaPress }) => (
    gridState.map((rowState, i) =>
        <View key={i} style={styles.kanaRow}>
            {
                rowState.map((item, j) =>
                    <KanaBlock style={styles.kanaBlock} kanaFont={kanaFont} fontSize={fontSize || 50} onPress={onKanaPress.bind(this, item)} key={j} selected={item.selected}>{item.kana}</KanaBlock>
                )
            }
        </View>
    )
);

const styles = StyleSheet.create({
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
