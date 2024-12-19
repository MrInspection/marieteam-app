import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from "react-native";

const Home = () => {
  return (
    <SafeAreaView className="flex flex-col h-full items-center  bg-white pt-10">
      <Text className="text-brand-600 text-md font-JakartaBold">Spectron Labs</Text>
      <Text className="text-2xl/7 mt-2 font-bold tracking-tight">MarieTeam App</Text>
      <View>
        <Text className="text-gray-400 px-10 mt-10 text-balance text-center">Welcome to the next generation of application build by Spectron Labs using Expo and React Native.</Text>
        <View className="flex items-center justify-center">
          <Text>Spectron</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;