import {ActivityIndicator, Image, Text, View} from "react-native";

export default function CrossingLoadingState() {
  return (
    <View
      className="border border-neutral-300/50 rounded-3xl px-5 py-20 bg-white flex flex-col items-center justify-center">
      <View className="flex flex-col items-center justify-center">
        <ActivityIndicator size="large" color="#3659B1" />
        <Text className="text-xl font-medium mt-4 text-neutral-900/50">
          Searching trips...
        </Text>
      </View>
    </View>
  )
}