import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {router, useLocalSearchParams} from "expo-router";
import { useState } from "react";
import SeaConditionSelector from "@/components/sea-condition-selector";
import {Icons} from "@/constants/icons";

type SeaCondition = "CALM" | "SLIGHTLY_ROUGH" | "ROUGH" | "VERY_ROUGH";

export default function CaptainLog() {
  const authorization = process.env.EXPO_PUBLIC_API_KEY!
  const {crossing} = useLocalSearchParams<{ crossing: string }>();

  const [seaCondition, setSeaCondition] = useState<SeaCondition>("CALM");
  const [delayDuration, setDelayDuration] = useState<string>("");
  const [delayReason, setDelayReason] = useState<string>("");

  const handleSubmit = async () => {
    const logData = {
      seaCondition,
      delayDuration: parseInt(delayDuration, 10),
      delayReason,
    };

    try {
      const response = await fetch("https://marieteam.vercel.app/api/crossing/captainlogs", {
        method: "POST",
        headers: { "Authorization": authorization},
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
        <View className="grid gap-6">

          {/* Sea Condition Selector */}
          <View className="grid gap-2.5">
            <Text className="text-slate-600 font-medium text-base/7">Sea Condition</Text>
            <SeaConditionSelector
              value={seaCondition}
              onChange={setSeaCondition}
            />
          </View>

          {/* Delay Duration */}
          <View className="grid gap-2.5">
            <Text className="text-slate-600 font-medium text-base/7">Duration of the delay</Text>
            <View className="relative">
              <TextInput
                className="border border-slate-300 rounded-2xl px-4 py-3 text-lg relative"
                keyboardType="numeric"
                maxLength={3}
                value={delayDuration}
                onChangeText={setDelayDuration}
              />
              <Text className="text-slate-400 absolute right-5 top-4">minutes late</Text>
            </View>
            <Text className="text-slate-500">
              The departure time will be at <Text className="text-black font-semibold">10:00 AM</Text>
            </Text>
          </View>

          {/* Delay Reason */}
          <View className="grid gap-2.5">
            <Text className="text-slate-600 font-medium text-base/7">Delay Reason</Text>
            <TextInput
              placeholder="e.g. Technical issue"
              placeholderTextColor="#9CA3AF"
              multiline
              className="border border-slate-300 rounded-2xl px-4 py-3 text-lg"
              value={delayReason}
              onChangeText={setDelayReason}
            />
          </View>
        </View>
      </ScrollView>
      <View className="w-full py-6">
        <TouchableOpacity
          className="bg-brand-600 rounded-full p-4 w-full"
          onPress={handleSubmit}
        >
          <Text className="text-white font-medium text-center text-lg">Publish Log</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
