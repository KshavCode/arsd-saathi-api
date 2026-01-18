import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FacultyTab() {
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <Text style={styles.textTitle}>Faculty Details</Text>  
                <Text style={styles.textContent}>Faculty details will be displayed here.</Text>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    textTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    textContent: {
        fontSize: 16,
        color: '#555',
        lineHeight: 22,
    },
});
