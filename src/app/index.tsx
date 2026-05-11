import { useState } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Moon,
  Sun,
} from "lucide-react-native";
import Note from "@/components/Note";



export default function Index() {
  const colorScheme = useColorScheme();
  const [isEnabled, setIsEnabled] = useState(colorScheme === "dark");
  
  type FormDataType = {
    title: string;
    description: string;
  };
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
      description: ""
    })
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
        <Text
          style={[
            baseColor.theButtonText,
            {
              fontWeight: "bold",
            },
          ]}
          numberOfLines={2}
        >
          Description: {data.description}
        </Text>
      </View>
    );
  };

  const [selectedNote, setSelectedNote] = useState<FormDataType | null>(null);

  if (selectedNote) {
    return (
      <Note selectedNote={selectedNote} setSelectedNote={setSelectedNote} themeMode={isEnabled}/>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, isEnabled && { backgroundColor: "#313131" }]}
    >
      {/* theme changer  */}
      <View style={switchBorder}>
        <Pressable
          onPress={() =>
            setIsEnabled(!isEnabled)
          }
          style={[
            styles.switch,
            {
              justifyContent:
                isEnabled
                  ? "flex-end"
                  : "flex-start",
              backgroundColor:
                isEnabled
                  ? "#222"
                  : "#ddd",
            },
          ]}
        >
          <View style={styles.thumb}>
            {isEnabled ? (
              <Moon
                size={18}
                color="white"
              />
            ) : (
              <Sun
                size={18}
                color="black"
              />
            )}
          </View>
        </Pressable>

        <Text style={baseColor.theText}>
          {isEnabled ? "Dark Mode" : "Light Mode"}
        </Text>
      </View>

      {/* form  */}
      <View style={styles.formContainer}>
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
      </View>

      {/* devider  */}
      <View
        style={[
          {
            borderWidth: 2,
          },
          baseColor.theBorder,
        ]}
      />

      {/* card section  */}
      <FlatList
        data={noteData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedNote(item)}>
            <Card data={item} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    height: 120,
    backgroundColor: "#ffffff",
    elevation: 5,
    borderRadius: 10,
    margin: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  // Detail Screen
  detailContainer: {
    flex: 1,
    backgroundColor: "#fff",
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
  backArrow: {
    fontSize: 20,
    color: "#007AFF",
  },
  backText: {
    fontSize: 16,
    color: "#007AFF",
  },
  detailContent: {
    padding: 20,
  },
  detailTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
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
    color: "#444",
  },
});