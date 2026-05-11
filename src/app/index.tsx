import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Switch,
  useColorScheme,
  TextInput,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colorScheme = useColorScheme();
  const [isEnabled, setIsEnabled] = useState(colorScheme === "dark");
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
  return (
    <SafeAreaView
      style={[styles.container, isEnabled && { backgroundColor: "#313131" }]}
    >
      {/* theme changer  */}
      <View style={switchBorder}>
        <Switch
          trackColor={{ false: "#000000", true: "#ffffff" }}
          thumbColor={isEnabled ? "#000000" : "#ffffff"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
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
        renderItem={({ item }) => <Card data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  switchContainer: {
    elevation: 0,
    borderRadius: 50,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
});
