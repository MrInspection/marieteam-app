import {useState} from "react";
import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import CrossingCard from "@/components/crossing-card";
import CrossingEmptyState from "@/components/crossing-empty-state";
import Select from "@/components/select";
import CrossingLoadingState from "@/components/crossing-loading-state";

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

export interface SearchResult {
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

const geographicalZones: { label: string; value: string }[] = [
  {label: "AIX", value: "AIX"},
  {label: "BATZ", value: "BATZ"},
  {label: "BELLE_ILE_EN_MER", value: "BELLE_ILE_EN_MER"},
  {label: "BREHAT", value: "BREHAT"},
  {label: "HOUAT", value: "HOUAT"},
  {label: "ILE_DE_GROIX", value: "ILE_DE_GROIX"},
  {label: "MOLENE", value: "MOLENE"},
  {label: "OUESSANT", value: "OUESSANT"},
  {label: "SEIN", value: "SEIN"},
  {label: "YEU", value: "YEU"},
];

export default function HomePage() {
  const authorization = process.env.EXPO_PUBLIC_API_KEY!

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
      const response = await fetch(
        `https://marieteam.vercel.app/api/crossing?geographicalZone=${zone}&date=${formattedDate}`,
        {
          headers: {Authorization: authorization},
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
      <View className="mt-6 mb-6">
        <Text className="text-3xl font-bold mb-1">MarieTeam Captaīn</Text>
      </View>
      <View className="border border-dashed rounded-3xl px-5 py-4 border-neutral-300 bg-brand-25"
            style={{borderStyle: "dashed"}}>
        <Text className="text-lg font-medium text-neutral-700 mb-2">
          Search Filters
        </Text>
        <View className="flex flex-row items-center gap-2">
          <View>
            <Select
              options={geographicalZones}
              selectedValue={zone}
              onValueChange={(value) => setZone(value as GeographicalZone)}
              placeholder="Select a Zone"
            />
          </View>
          <TouchableOpacity
            className="border border-neutral-300 rounded-2xl px-4 py-3 bg-white"
            onPress={() => setShowDatePicker(true)}
          >
            <Text className="text-sm">Departure: {date.toISOString().split("T")[0]}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        className="bg-black rounded-full p-4 mt-4"
        onPress={handleSearch}
      >
        <Text className="text-white font-medium text-center">Search Crossing</Text>
      </TouchableOpacity>
      <View className="mt-8">
        <Text className="text-xl/7 font-semibold">Available Trips</Text>
      </View>
      <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
        <View className="flex-1 mt-4 flex-col gap-4">
          {loading ? <CrossingLoadingState /> : results && results.length > 0 ? (
            results.map((item) => <CrossingCard key={item.id} {...item} />)
          ) : (
            <CrossingEmptyState/>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
