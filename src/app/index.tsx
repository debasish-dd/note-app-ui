import { useMemo, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  useColorScheme,
  TextInput,
  Pressable,
  Alert,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  StatusBar,
  useWindowDimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Moon, Sun } from "lucide-react-native";
import Note from "@/components/Note";
import * as ScreenOrientation from "expo-screen-orientation";

type FormDataType = {
  title: string;
  description: string;
};
export default function Index() {
  const colorScheme = useColorScheme();
  const [isEnabled, setIsEnabled] = useState(colorScheme === "dark");

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
  });
  const [noteData, setNoteData] = useState<FormDataType[]>([
    {
      title: "this is an initial Title",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque excepturi velit amet eius sunt! Amet deserunt quae nam alias obcaecati accusamus iusto id. Tenetur, enim. Doloremque officia nemo libero nobis",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredNotes = searchQuery.trim()
    ? noteData.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : noteData;

  //styles
  const baseColor = StyleSheet.create({
    theBorder: {
      borderColor: isEnabled ? "#ffffff" : "#000000",
    },
    theText: {
      color: isEnabled ? "#ffffff" : "#000000",
    },
    theBackground: {
      backgroundColor: isEnabled ? "#ffffff" : "#000000",
    },
    theButtonText: {
      color: isEnabled ? "#000000" : "#ffffff",
    },
  });

  const onSubmitFn = () => {
    if (!formData.title || !formData.description) {
      Alert.alert("Both Fields Are Required");
      return;
    }

    setNoteData((prev) => [...prev, formData]);
    setFormData({
      title: "",
      description: "",
    });
  };

  const switchBorder = StyleSheet.flatten([
    styles.switchContainer,
    baseColor.theBorder,
  ]);

  const Card = ({ data }: { data: FormDataType }) => {
    return (
      <View style={[styles.card, baseColor.theBackground]}>
        <Text
          style={[
            baseColor.theButtonText,
            {
              fontWeight: "bold",
            },
          ]}
          numberOfLines={1}
        >
          Title: {data.title}
        </Text>
        <Text style={[baseColor.theButtonText]} numberOfLines={2}>
          Description: {data.description}
        </Text>
      </View>
    );
  };

  const [selectedNote, setSelectedNote] = useState<FormDataType | null>(null);

  const uri = !isEnabled
    ? {
        uri: "https://images.unsplash.com/photo-1619199003576-7cf4e1f7b25f?q=80&w=1866&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }
    : {
        uri: "https://images.unsplash.com/photo-1776549157434-035d6b8141c9?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      };

  if (selectedNote) {
    return (
      <Note
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        themeMode={isEnabled}
      />
    );
  }
  return (
    <SafeAreaView
      style={[styles.container, isEnabled && { backgroundColor: "#313131" }]}
    >
      <ImageBackground
        style={styles.background}
        imageStyle={{ borderRadius: 25 }}
        source={uri}
      >
        {/* theme changer  */}
        <View style={switchBorder}>
          <Pressable
            onPress={() => setIsEnabled(!isEnabled)}
            style={[
              styles.switch,
              {
                justifyContent: isEnabled ? "flex-end" : "flex-start",
                backgroundColor: isEnabled ? "#222" : "#ddd",
              },
            ]}
          >
            <View style={styles.thumb}>
              {isEnabled ? (
                <Moon size={18} color="white" />
              ) : (
                <Sun size={18} color="black" />
              )}
            </View>
          </Pressable>

          <Text style={baseColor.theText}>
            {isEnabled ? "Dark Mode" : "Light Mode"}
          </Text>
        </View>

        {/* form  */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.formContainer}
        >
          <TextInput
            placeholder="type your title heere"
            placeholderTextColor={isEnabled ? "white" : "black"}
            style={[
              styles.inputComponent,
              baseColor.theBorder,
              baseColor.theText,
            ]}
            value={formData?.title}
            onChangeText={(text) =>
              setFormData((prev) => ({
                ...prev,
                title: text,
              }))
            }
          />
          <TextInput
            placeholder="type your description heere"
            placeholderTextColor={isEnabled ? "white" : "black"}
            style={[
              styles.inputComponent,
              baseColor.theBorder,
              baseColor.theText,
            ]}
            value={formData?.description}
            onChangeText={(text) =>
              setFormData((prev) => ({
                ...prev,
                description: text,
              }))
            }
          />
          <Pressable
            onPress={onSubmitFn}
            style={[styles.buttons, baseColor.theBackground]}
          >
            <Text style={baseColor.theButtonText}>add</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ImageBackground>
      {/* devider  */}
      <View
        style={[
          {
            borderWidth: 2,
            marginTop: 5,
          },
          baseColor.theBorder,
        ]}
      />
      {/* search bar  */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="🔍  Search by title..."
          placeholderTextColor={isEnabled ? "#aaa" : "#777"}
          style={[styles.searchInput, baseColor.theText]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery("")}
            style={{ paddingHorizontal: 6, paddingVertical: 2 }}
          >
            <Text style={[baseColor.theText]}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      
       {/* card section  */}
      <FlatList
        data={filteredNotes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedNote(item)}>
            <Card data={item} />
          </TouchableOpacity>
        )}
      />

      <StatusBar backgroundColor={"#ffffff"} barStyle={"dark-content"} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  background: {
    overflow: "hidden",
  },

  switch: {
    width: 80,
    height: 40,
    borderRadius: 30,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
  },

  thumb: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  switchContainer: {
    elevation: 0,
    borderRadius: 50,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
  },
  inputComponent: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 270,
  },
  formContainer: {
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    margin: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 2,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.6,
    fontStyle: "italic",
  },

  buttons: {
    height: 52,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  card: {
    minHeight: 90,
    elevation: 5,
    borderRadius: 12,
    margin: 6,
    padding: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});
