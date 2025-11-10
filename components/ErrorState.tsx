import React from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../src/presentation/styles/globalStyles";

interface ErrorStateProps {
  message: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <View style={globalStyles.errorContainer}>
      <Text style={globalStyles.errorText}>{message}</Text>
    </View>
  );
};
