import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {router, useLocalSearchParams} from "expo-router";
import {useState} from "react";
import {Icons} from "@/constants/icons";
import Select from "@/components/select";
import type {SearchResult} from "@/app";

type SeaCondition = "CALM" | "SLIGHTLY_ROUGH" | "ROUGH" | "VERY_ROUGH";

const seaConditions: { label: string; value: SeaCondition }[] = [
  {label: "Calm", value: "CALM"},
  {label: "Slightly Rough", value: "SLIGHTLY_ROUGH"},
  {label: "Rough", value: "ROUGH"},
  {label: "Very Rough", value: "VERY_ROUGH"},
];

export default function CaptainLog() {
  const authorization = process.env.EXPO_PUBLIC_API_KEY!
  const {crossing, crossingData} = useLocalSearchParams<{
    crossing: string;
    crossingData: string;
  }>();

  const [seaCondition, setSeaCondition] = useState<SeaCondition>("CALM");
  const [delayDuration, setDelayDuration] = useState<string>("");
  const [delayReason, setDelayReason] = useState<string>("");
  const crossingDetails: SearchResult = JSON.parse(crossingData);

  const handleSubmit = async () => {
    const logData = {
      seaCondition,
      delayDuration: parseInt(delayDuration, 10),
      delayReason,
    };

    try {
      const response = await fetch("https://marieteam.vercel.app/api/crossing/captainlogs", {
        method: "POST",
        headers: {"Authorization": authorization},
        body: JSON.stringify({
          crossingId: crossing,
          seaCondition: logData.seaCondition,
          delayMinutes: logData.delayDuration,
          delayReason: logData.delayReason,
        }),
      });

      if (response.ok) {
        alert("Log submitted successfully");
        router.back();
      } else {
        alert("Failed to submit log");
      }
    } catch (error) {
      alert("An error occurred");
    }
  };

  return (
    <SafeAreaView className="flex flex-col h-full items-center justify-between bg-white pt-10 px-5">
      <View className="flex flex-row items-center justify-center mb-6 w-full">
        <TouchableOpacity
          className="flex flex-row items-center gap-2 absolute left-0 size-9"
          onPress={() => router.back()}
        >
          <Image source={Icons.angleLeft} className="size-5"/>
        </TouchableOpacity>
        <Text className="text-xl/7 font-semibold tracking-tight text-center">
          Add Captain Log
        </Text>
      </View>
      <ScrollView className="w-full px-1 pb-6" showsVerticalScrollIndicator={false}>
        <View className="border border-neutral-300/50 rounded-t-3xl p-2 bg-brand-25 border-b-0">
          <Image src={crossingDetails.boat.imageUrl} className="w-full h-60 rounded-t-2xl"/>
        </View>
        <View
          className="bg-brand-25 p-4 flex flex-row items-center justify-between gap-4 border border-neutral-300/50 border-b-0">
          <View>
            <Text className="text-sm text-neutral-500">Transport Ship</Text>
            <Text className="font-medium line-clamp-1">{crossingDetails.boat.name}</Text>
          </View>
          <View>
            <Text className="text-sm text-neutral-500">Dimensions</Text>
            <Text className="font-medium line-clamp-1">{crossingDetails.boat.length} m
              x {crossingDetails.boat.width} m</Text>
          </View>
          <View>
            <Text className="text-sm text-neutral-500">Speed</Text>
            <Text className="font-medium line-clamp-1">{crossingDetails.boat.speed} knots</Text>
          </View>
        </View>
        <View className="border border-neutral-300/50 rounded-b-3xl px-5 py-4 bg-brand-25">
          <View className="flex flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-medium">{crossingDetails.route.departurePort}</Text>
              <Text className="text-xs text-neutral-500">Departure</Text>
            </View>
            <View className="flex-1 h-px bg-neutral-300/70 mx-4 relative">
              <View className="absolute inset-0 flex flex-row items-center justify-center">
                <View className="bg-brand-25 rounded-full p-1.5">
                  <Image source={Icons.shipWheel} className="size-8"/>
                </View>
              </View>
            </View>
            <View>
              <Text className="text-lg font-medium text-right">{crossingDetails.route.arrivalPort}</Text>
              <Text className="text-xs text-neutral-500 text-right">Arrival</Text>
            </View>
          </View>
        </View>
        <View className="mt-6 grid gap-4">
          <Text className="text-xl/7 font-medium">Log Information</Text>
          <View
            className="border border-neutral-300 rounded-3xl p-5 grid gap-4"
            style={{borderStyle: "dashed", marginBottom: 4}}>
            <View className="grid gap-2.5">
              <Text className="text-slate-600 font-medium text-base/7">Sea Condition</Text>
              <Select
                options={seaConditions}
                selectedValue={seaCondition}
                onValueChange={(value) => setSeaCondition(value as SeaCondition)}
                placeholder="Select a Sea Condition"
              />
            </View>
            <View className="grid gap-2.5">
              <Text className="text-slate-600 font-medium text-base/7">Duration of the delay</Text>
              <View className="relative">
                <TextInput
                  className="border border-neutral-300 rounded-2xl px-4 py-3 pr-20 text-sm bg-white"
                  keyboardType="numeric"
                  maxLength={3}
                  value={delayDuration}
                  onChangeText={setDelayDuration}
                />
                <Text className="text-neutral-400 absolute right-4 top-1/2 transform -translate-y-1/2">
                  minutes late
                </Text>
              </View>
            </View>
            <View className="grid gap-2.5">
              <Text className="text-slate-600 font-medium text-base/7">Delay Reason</Text>
              <TextInput
                placeholder="e.g. Technical issue"
                placeholderTextColor="#9CA3AF"
                multiline
                className="border border-neutral-300 rounded-2xl px-4 py-3 text-sm"
                value={delayReason}
                onChangeText={setDelayReason}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="w-full py-6">
        <TouchableOpacity
          className="bg-black rounded-full p-4 w-full"
          onPress={handleSubmit}
        >
          <Text className="text-white font-medium text-center text-lg">Publish Log</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
