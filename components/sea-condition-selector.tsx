import React from "react";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

type SeaCondition = "CALM" | "SLIGHTLY_ROUGH" | "ROUGH" | "VERY_ROUGH";

interface SeaConditionSelectorProps {
  value: SeaCondition;
  onChange: (value: SeaCondition) => void;
}

const SeaConditionSelector = ({value, onChange}: SeaConditionSelectorProps) => {
  return (
    <View className="border border-slate-300 rounded-2xl overflow-hidden">
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onChange(itemValue as SeaCondition)}
        className=" text-slate-700 bg-white px-4 py-3"
      >
        <Picker.Item label="Calm" value="CALM" />
        <Picker.Item label="Slightly Rough" value="SLIGHTLY_ROUGH" />
        <Picker.Item label="Rough" value="ROUGH" />
        <Picker.Item label="Very Rough" value="VERY_ROUGH" />
      </Picker>
    </View>
  );
};

export default SeaConditionSelector;
