import {View, Text, Image} from "react-native";
import {Images} from "@/constants/images";

export default function CrossingEmptyState() {
  return (
    <View
      className="border border-neutral-300/50 rounded-3xl px-5 py-20 bg-white flex flex-col items-center justify-center">
      <View className="flex flex-col items-center justify-center">
        <Image source={Images.noResults} className="size-40"/>
        <Text className="text-xl font-medium mb-2">
          No Trips Found
        </Text>
        <View className="text-center max-w-4xl">
          <Text className="text-center text-sm text-neutral-900/60">
            We couldn't find any trips for your search criteria.
          </Text>
          <Text className="text-center text-sm text-neutral-900/60">
            Please try a different date or zone.
          </Text>
        </View>
      </View>
    </View>
  )
}