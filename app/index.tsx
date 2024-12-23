import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";

type GeographicalZone =
  | "AIX"
  | "BATZ"
  | "BELLE_ILE_EN_MER"
  | "BREHAT"
  | "HOUAT"
  | "ILE_DE_GROIX"
  | "MOLENE"
  | "OUESSANT"
  | "SEIN"
  | "YEU";

interface SearchResult {
  id: string;
  departureTime: string;
  boatId: string;
  routeId: string;
  createdAt: string;
  updatedAt: string;
  boat: {
    id: string;
    name: string;
    length: number;
    width: number;
    speed: number;
    imageUrl: string;
    equipment: string[];
    createdAt: string;
    updatedAt: string;
  };
  route: {
    id: string;
    distance: number;
    departurePort: string;
    arrivalPort: string;
    geographicalZone: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function HomePage() {
  const [zone, setZone] = useState<GeographicalZone>("AIX");
  const [date, setDate] = useState(new Date());
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const formattedDate = date.toISOString();
      console.log(formattedDate)
      console.log(zone)
      const response = await fetch(
        `https://marieteam.vercel.app/api/crossing?geographicalZone=${zone}&date=${formattedDate}`,
        {
          headers: { Authorization: `Bearer splabs_oXvAlnM2fNfnZip1EadUxOBeitGpahzvZQfHaeotMrz9sakYOsqJ01WPn` },
        }
      );
      const data = await response.json();
      setResults(data)
    } catch (error) {
      alert("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex flex-col h-full w-full bg-white p-5">

      <View className="flex flex-row items-center justify-center mb-6 w-full">
        <Text className="text-xl/7 font-semibold tracking-tight text-center">
          MarieTeam Captain.
        </Text>
      </View>



      <View className="grid gap-4 bg-brand-50 p-6 rounded-2xl">
        <Text className="text-lg font-medium text-slate-700">
          Search for Crossings
        </Text>
        {/* Zone Picker */}
        <View className="border border-slate-300 rounded-lg">
          <Picker
            selectedValue={zone}
            onValueChange={(value) => setZone(value as GeographicalZone)}
          >
            {[
              "AIX",
              "BATZ",
              "BELLE_ILE_EN_MER",
              "BREHAT",
              "HOUAT",
              "ILE_DE_GROIX",
              "MOLENE",
              "OUESSANT",
              "SEIN",
              "YEU",
            ].map((z) => (
              <Picker.Item key={z} label={z} value={z} />
            ))}
          </Picker>
        </View>

        {/* Date Picker */}
        <TouchableOpacity
          className="border border-slate-300 rounded-lg px-4 py-3 text-lg"
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{date.toISOString().split("T")[0]}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Search Button */}
        <TouchableOpacity
          className="bg-brand-600 rounded-full p-4"
          onPress={handleSearch}
        >
          <Text className="text-white font-medium text-center">Search Crossing</Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      <View className="mt-8">
        <Text className="text-xl/7 font-medium">Crossings</Text>
      </View>


      <View className="flex-1 mt-4 px-5">
        {loading ? (
          <Text className="text-center text-slate-500">Loading...</Text>
        ) : results?.length ? (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex flex-row items-center gap-4 border-b border-slate-200 py-3"
                onPress={() =>
                  router.push({
                    pathname: "/captainlog/[crossing]",
                    params: { crossing: item.id },
                  })
                }
              >
                <Image
                  source={{ uri: item.boat.imageUrl }}
                  className="w-16 h-16 rounded-lg"
                />
                <View>
                  <Text className="text-lg font-semibold">{item.boat.name}</Text>
                  <Text className="text-slate-500">
                    {item.route.departurePort} → {item.route.arrivalPort}
                  </Text>
                  <Text className="text-slate-400">
                    Departure: {new Date(item.departureTime).toLocaleString()}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text className="text-center text-slate-500">
            No results found. Try a different date or zone.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
