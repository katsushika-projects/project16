import { StyleSheet, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function ProfileScreen() {
  const { profile } = useLocalSearchParams<{ profile: string }>();
  const isMyProfile = profile === "me";

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="person.circle.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          {isMyProfile ? "マイプロフィール" : `ユーザー: ${profile}`}
        </ThemedText>
      </ThemedView>

      {isMyProfile ? (
        // 自分のプロフィールコンテンツ
        <ThemedView>
          <ThemedText style={styles.sectionText}>
            ようこそ！あなたのプロフィールページです。
          </ThemedText>
          <ThemedText style={styles.infoText}>ユーザー名: ユーザー</ThemedText>
          <ThemedText style={styles.infoText}>
            メール: user@example.com
          </ThemedText>
          <ThemedText style={styles.infoText}>登録日: 2023年4月1日</ThemedText>
        </ThemedView>
      ) : (
        // 他のユーザープロフィールコンテンツ
        <ThemedView>
          <ThemedText style={styles.sectionText}>
            ユーザーID: {profile} のプロフィールページです
          </ThemedText>
          <ThemedText style={styles.infoText}>
            このユーザーの情報を表示します
          </ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 18,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
});
