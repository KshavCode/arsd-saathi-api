import { Colors } from '@/constants/themeStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AttendanceTab({ navigation }) {
    const modes = ['Subject 1', 'Subject 2', 'Subject 3'];
    const months = ['January', 'February'];
    const ROWS = months.length + 1; // including header row
    const COLS = 5; // including first column header

    const [selectedMode, setSelectedMode] = useState(modes[0]);
    const [appliedMode, setAppliedMode] = useState(modes[0]);
    const [showDropdown, setShowDropdown] = useState(false);

    // build grid based on appliedMode: first row = column headers, first column = row headers
    const grid = useMemo(() => {
        // choose column headers depending on mode
        let col1 = 'TE Att.';
        let col2 = 'TE Held';
        let col3 = 'TU Att.';
        let col4 = 'TU Held';
        if (appliedMode === 'Subject 1') {
            console.log("Subject 1 mode selected");
        } else if (appliedMode === 'Subject 2') {
            console.log("Subject 2 mode selected");
        } else if (appliedMode === 'Subject 3') {
            console.log("Subject 3 mode selected");
        }

        return Array.from({ length: ROWS }, (_, r) => {
            return Array.from({ length: COLS }, (_, c) => {
                if (r === 0 && c === 0) return 'Subjects';
                if (r === 0 && c === 1) return col1;
                if (r === 0 && c === 2) return col2;
                if (r === 0 && c === 3) return col3;
                if (r === 0 && c === 4) return col4;
                if (c === 0) return months[r - 1] || `Row ${r}`;
                return String(Math.floor(Math.random() * 100) + 1);
            });
        });
    }, [appliedMode]);

    function onConfirm() {
        setAppliedMode(selectedMode);
        setShowDropdown(false);
    }

    function onSleectMode(mode) {
        setSelectedMode(mode);
        setShowDropdown(false);
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            
            <SafeAreaView style={styles.container}>
                <View style={styles.headerRow}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => (navigation && navigation.goBack ? navigation.goBack() : console.log('Back'))}>
                        <Ionicons name="caret-back" size={27} color={Colors.light.primary} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Detailed Attendance</Text>

                    <View style={styles.headerPlaceholder} />
                </View>

                <View style={styles.controlsRow}>
                    <Text style={styles.selectLabel}>Select Subject:</Text>

                    <View style={styles.dropdownRow}>
                        <View style={styles.dropdownWrapper}>
                            <TouchableOpacity style={styles.dropdown} onPress={() => setShowDropdown((s) => !s)}>
                                <Text style={styles.dropdownText}>{selectedMode}</Text>
                                <Ionicons name={showDropdown ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.light.text} />
                            </TouchableOpacity>

                            {showDropdown && (
                                <View style={styles.dropdownList}>
                                    {modes.map((m) => (
                                        <TouchableOpacity key={m} style={styles.dropdownItem} onPress={() => onSleectMode(m)}>
                                            <Text style={[styles.dropdownItemText, selectedMode === m && styles.dropdownItemTextSelected]}>{m}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                            <Text style={styles.confirmText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.tableContainer}>
                    {grid.map((row, rIdx) => (
                        <View key={`row-${rIdx}`} style={[styles.tableRow, rIdx === 0 && styles.tableRowHeader]}>
                            {row.map((cell, cIdx) => {
                                const isHeading = rIdx === 0 || cIdx === 0;
                                return (
                                    <View key={`cell-${rIdx}-${cIdx}`} style={[styles.tableCell, isHeading && styles.tableCellHeader, cIdx === COLS - 1 && styles.tableCellLast]}>
                                        <Text style={[styles.cellText, isHeading && styles.cellTextHeader]}>{cell}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    ))}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: Colors.light.background,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    backButton: {
        width: 44,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backText: {
        fontSize: 20,
        color: Colors.light.primary,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.light.text,
    },
    headerPlaceholder: {
        width: 44,
    },
    controlsRow: {
        marginBottom: 12,
    },
    selectLabel: {
        fontSize: 12,
        color: Colors.light.text,
        marginBottom: 6,
        fontWeight: '600',
    },
    dropdownRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdownWrapper: {
        position: 'relative',
    },
    dropdown: {
        minWidth: 160,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: Colors.light.background,
        borderWidth: 1,
        borderColor: Colors.light.primary,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdownText: {
        color: Colors.light.text,
        fontSize: 14,
    },
    dropdownList: {
        position: 'absolute',
        top: 46,
        left: 0,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E6EAF0',
        borderRadius: 8,
        overflow: 'hidden',
        zIndex: 20,
        elevation: 8,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    dropdownItemText: {
        color: Colors.light.text,
    },
    dropdownItemTextSelected: {
        color: Colors.light.primary,
        fontWeight: '700',
    },
    confirmButton: {
        marginLeft: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: Colors.light.primary,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmText: {
        color: Colors.light.background,
        fontWeight: '700',
    },
    tableContainer: {
        overflow: 'hidden',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.light.secondary,
    },
    tableRow: {
        flexDirection: 'row',
        backgroundColor: Colors.light.background,
    },
    tableCell: {
        flex: 1,
        paddingVertical: 13,
        paddingHorizontal: 5,
        borderWidth: .5,
        borderColor: Colors.light.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableCellLast: {
        borderRightWidth: .5,
    },
    tableCellHeader: {
        backgroundColor: Colors.light.primary,
    },
    cellText: {
        fontSize: 14,
        color: Colors.light.text,
    },
    cellTextHeader: {
        color: Colors.light.background,
        fontSize: 12,
        fontWeight: '700',
    },
});
