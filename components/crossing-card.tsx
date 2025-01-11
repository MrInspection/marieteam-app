import { View, Text, Image, TouchableOpacity } from "react-native";
import { Icons } from "@/constants/icons";
import { SearchResult } from "@/app";
import { router } from "expo-router";

export default function CrossingCard(props: SearchResult) {
  const { id, departureTime, boat, route } = props;
  const departureDate = new Date(departureTime);

  // Format the date as "Wed, Jan 1st"
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(departureDate);

  // Format the day with ordinal suffix (e.g., "1st", "2nd", "3rd")
  const day = departureDate.getDate();
  const ordinalSuffix = (n: number) => {
    if ([11, 12, 13].includes(n % 100)) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const formattedDay = `${day}${ordinalSuffix(day)}`;
  const formattedFullDate = formattedDate.replace(day.toString(), formattedDay);

  // Format the time as "12:00 AM/PM"
  const formattedTime = departureDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/captainlog/[crossing]",
          params: { 
            crossing: id,
            crossingData: JSON.stringify(props)
          },
        })
      }
    >
      <View className="border border-neutral-300/50 rounded-3xl px-5 py-5 bg-white">
        <View className="flex flex-row items-center justify-between relative">
          <View>
            <Text className="text-xl font-medium">{route.departurePort}</Text>
            <Text className="text-xs text-neutral-500">Departure</Text>
          </View>
          <View className="flex-1 h-px bg-neutral-300/70 mx-4 relative">
            <View className="absolute inset-0 flex flex-row items-center justify-center">
              <View className="bg-white rounded-full p-1.5">
                <Image source={Icons.shipWheel} className="size-8" />
              </View>
            </View>
          </View>
          <View>
            <Text className="text-xl font-medium text-right">
              {route.arrivalPort}
            </Text>
            <Text className="text-xs text-neutral-500 text-right">Arrival</Text>
          </View>
        </View>
        <View className="bg-brand-50 p-4 rounded-b-2xl mt-4 flex flex-row items-center justify-between gap-4">
          <View>
            <Text className="text-sm text-neutral-500">Transport Ship</Text>
            <Text className="font-medium line-clamp-1">{boat.name}</Text>
          </View>
          <View>
            <Text className="text-sm text-neutral-500">Departure Date</Text>
            <Text className="font-medium">{formattedFullDate}</Text>
          </View>
          <View>
            <Text className="text-sm text-neutral-500">Departure Time</Text>
            <Text className="font-medium">{formattedTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
