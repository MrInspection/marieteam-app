import {Text, TouchableOpacity} from "react-native";
import {ButtonProps} from "@/types/type";

const getBackgroundVariantStyle = (variant: ButtonProps['bgVariant']) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500"
    case "danger":
      return "bg-red-500"
    case "success":
      return "bg-green-500"
    case "outline":
      return "bg-transparent border-neutral-300 border"
    default:
      return "bg-[#0286FF]"
  }
}

const getTextVariantStyle = (variant: ButtonProps['textVariant']) => {
  switch (variant) {
    case "primary":
      return "text-black"
    case "secondary":
      return "text-gray-100"
    case "danger":
      return `text-red-500`
    case "success":
      return `text-green-500`
    default:
      return "text-white"
  }
}

const CustomButton = ({
                        onPress,
                        title,
                        bgVariant = "primary",
                        textVariant = "default",
                        IconLeft,
                        IconRight,
                        className,
                        ...props}: ButtonProps ) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full rounded-full p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBackgroundVariantStyle(bgVariant)} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>{title}</Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  )
}

export default CustomButton