import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Icons} from "@/constants/icons";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import {useState} from "react";
import {RadioButton} from "react-native-paper";

export default function CaptainLog() {
  const [value, setValue] = useState('first');


  return (
    <SafeAreaView className="flex flex-col h-full items-center justify-between bg-white pt-10 px-5">
      <View className="flex flex-row items-center justify-center mb-6 w-full">
        <TouchableOpacity
          className="flex flex-row items-center gap-2 absolute left-0 size-9"
          onPress={() => router.back()}
        >
          <Image source={Icons.angleLeft} className="size-5"/>
        </TouchableOpacity>
        <Text className="text-xl/7 font-semibold tracking-tight text-center">Add Captain Log</Text>
        <View/>
      </View>
      <ScrollView className="w-full px-1 pb-6" showsVerticalScrollIndicator={false}>
        <View className="grid gap-6">

          <View>
            <Text>Imane</Text>
          </View>



          <View className="bg-brand-100 rounded-2xl p-4 flex flex-row items-center justify-between">
            <View>
              <Text className="text-xs text-muted-foreground">Departure</Text>
              <Text className="font-medium">Le Palais</Text>
            </View>
            <View>
              <Text className="text-xs text-muted-foreground">Arrival</Text>
              <Text className="font-medium">Vannes</Text>
            </View>
          </View>


          <View className="grid gap-2.5">
            <Text className="text-slate-600 font-medium text-base/7">Sea Condition (debug)</Text>


            <Text>CALM</Text>
            <Text>SLIGHTLY_ROUGH</Text>
            <Text>ROUGH</Text>
            <Text>VERY_ROUGH</Text>
          </View>
          <View className="grid gap-2.5">
            <Text className="text-slate-600 font-medium text-base/7">Duration of the delay</Text>
            <View className="relative">
              <TextInput
                className="border border-slate-300 rounded-2xl px-4 py-3 text-lg relative"
                keyboardType="numeric"
                maxLength={3}
              />
              <Text className="text-slate-400 absolute right-5 top-4">minutes late</Text>
            </View>
            <Text className="text-slate-500">The departure time will be at <Text className="text-black font-semibold">10:00
              AM</Text></Text>
          </View>
          <View className="grid gap-2.5">
            <Text className="text-slate-600 font-medium text-base/7">Delay Reason</Text>
            <TextInput
              placeholder="e.g. Technical issue"
              placeholderTextColor="#9CA3AF"
              multiline={true}
              className="border border-slate-300 rounded-2xl px-4 py-3 text-lg"
            />
          </View>
        </View>
      </ScrollView>
      <View className="w-full py-6">
        <TouchableOpacity className="bg-brand-600 rounded-full p-4 w-full">
          <Text className="text-white font-medium text-center text-lg">Publish Log</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}