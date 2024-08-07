import {
  SafeAreaView,
} from "react-native";
import ApiCuisine from "@/components/samples/ApiCuisine";

export default function HomeScreen() {
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ApiCuisine />
    </SafeAreaView>
  );
}
