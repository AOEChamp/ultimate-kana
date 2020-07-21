import { Audio } from 'expo-av';

const playAudio = async (kanaData) => {
    const soundObject = new Audio.Sound();

    try {
        await soundObject.loadAsync(kanaData.audio);
        await soundObject.playAsync();
    } catch (error) {
        console.log(error);
    }
}

export default playAudio;
