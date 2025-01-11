import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import { Icons } from "@/constants/icons";
import {formatName} from "@/components/text-formatter";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export default function Select({options, selectedValue, onValueChange, placeholder = "Select an option"}: SelectProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View className="border border-neutral-300 rounded-2xl px-4 py-3 bg-white">
      {/* Trigger for Dropdown */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View className="flex flex-row items-center justify-between gap-2">
          <Text
            className={`text-neutral-700 text-sm ${
              selectedValue ? "text-base" : "text-gray-400"
            }`}
          >
            {formatName(selectedValue) || placeholder}
          </Text>
          <Image source={Icons.angleSmallDown} className="size-5" />
        </View>
      </TouchableOpacity>

      {/* Modal for Options */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 bg-black/50 justify-center items-center">
            <View className="w-11/12 bg-brand-50 rounded-2xl p-4 max-h-96">
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="py-3 px-4 border-b border-gray-200"
                    onPress={() => handleSelect(item.value)}
                  >
                    <Text className="text-lg text-gray-800">
                      {formatName(item.label)}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
