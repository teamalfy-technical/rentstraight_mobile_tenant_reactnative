import { TextInput, View, TextInputProps } from "react-native";
import { ReactNode } from "react";

type compProps = {
  label?: string;
  textColor?: string;
  className?: string;
  ph?: string;
  bg?: string;
  type?: "text" | "numeric" | "decimal" | "email" | "tel" | "url";
  iconLeft?: ReactNode; 
  iconRight?: ReactNode; 
  secureEntry?: boolean;
  change?: (text: string) => void; // Updated to accept text
  blur?: (text: string) => void;
  value?: string;
  bs?: number; // Added for border size
  bc?: string; // Added for border color
  phc?: string; // Added for border color
};

export const CustomInput = ({ textColor, className, ph, bg, phc, type, iconLeft, iconRight, secureEntry, change, blur, value, bs, bc }: compProps) => {
  return (
    <View className="my-4 flex flex-row items-center overflow-hidden" 
      style = {{
        borderWidth: bs ? bs : 2, // Add border size if provided
          borderColor: bc ? bc : '#3F3F3F24', // Add border color if provided
          borderRadius: 15
      }}
    >
      {iconLeft && (
        <View className="mr-2">
          {iconLeft}
        </View>
      )}
      <TextInput
        placeholder={ph}
        inputMode={type}
        style={{
          backgroundColor: bg,
          color: textColor
        }}
        className={`flex-1 px-5 py-3 text-lg ${className}`}
        selectionColor={textColor}
        secureTextEntry={secureEntry}
        placeholderTextColor={phc? phc : "#00000034"}
        onChangeText={change} // Correctly passes the text value
        onBlur={blur}
        value={value}
      />
      {iconRight && (
        <View className="mr-2">
          {iconRight}
        </View>
      )}
    </View>
  );
};