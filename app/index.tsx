import {SafeAreaView} from "react-native-safe-area-context";
import {Text, TextInput, TouchableOpacity, View, Image, ScrollView} from "react-native";
import {Link} from "expo-router";
import {Divider} from "react-native-paper";

const Home = () => {
  return (
    <SafeAreaView className="flex flex-col h-full w-full justify-between  bg-white pb-5">
      <View className="bg-brand-100 pt-10 px-5 rounded-b-3xl pb-6">
        <Text>Welcome, Captain</Text>
        <Text className="text-2xl">Alexendre DELACROIX</Text>
      </View>


      <View>
        <Text>Lemon</Text>
        <Divider />
        <Text>Mango</Text>
        <Divider />
      </View>

      <Link href="/captainlog" >
        <Text>Captain Log</Text>
      </Link>
    </SafeAreaView>
  );
}

export default Home;