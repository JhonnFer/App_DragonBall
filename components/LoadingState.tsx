import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { globalStyles } from "../src/presentation/styles/globalStyles";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Cargando...",
}) => {
  return (
    <View style={globalStyles.loadingContainer}>
      <ActivityIndicator size="large" color="#FF6B00" />
      <Text style={globalStyles.loadingText}>{message}</Text>
    </View>
  );
};
