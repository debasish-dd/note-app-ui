import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export type FormDataType = {
    title: string;
    description: string;
};

type IndexProps = {
    selectedNote: FormDataType | null;
    setSelectedNote: React.Dispatch<
        React.SetStateAction<FormDataType | null>
    >;
    themeMode: Boolean;
};

const Note = ({ selectedNote, setSelectedNote , themeMode }: IndexProps) => {
   const baseColor = StyleSheet.create({
    theBorder: {
      borderColor: themeMode ? "#ffffff" : "#000000",
    },
    theText: {
      color: themeMode ? "#ffffff" : "#000000",
    },
    theBackground: {
      backgroundColor: themeMode ? "#2b2a2a" : "#dadada",
    },
    theButtonText: {
      color: themeMode ? "#000000" : "#ffffff",
    },
     backArrow: {
        fontSize: 20,
        color: themeMode ? "#ffffff" : "#000000",
    },
    backText: {
        fontSize: 16,
        color: themeMode ? "#ffffff" : "#000000",
    },
  });


    if (selectedNote) {

        return (
            <SafeAreaView style={[styles.detailContainer , baseColor.theBackground]}>
                <View style={styles.detailHeader}>
                    <TouchableOpacity onPress={() => setSelectedNote(null)} style={styles.backButton}>
                        <Text style={[baseColor.backArrow]}>←</Text>
                        <Text style={[baseColor.backText]}>Notes</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.detailContent}>
                    <Text style={[styles.detailTitle , baseColor.theText]}>{selectedNote.title}</Text>
                    <View style={styles.divider} />
                    <Text style={[styles.detailDescription, baseColor.theText]}>{selectedNote.description}</Text>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default Note

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
    },
    detailHeader: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
   
    detailContent: {
        padding: 20,
    },
    detailTitle: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginBottom: 16,
    },
    detailDescription: {
        fontSize: 16,
        lineHeight: 26,
    },
})