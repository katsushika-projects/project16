import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { PhotoItem } from "@/types/home";

// サンプル写真データ
const photoData: PhotoItem[] = Array(20)
  .fill(0)
  .map((_, i) => ({
    id: i.toString(),
    uri: `https://picsum.photos/id/${i + 10}/200/200`,
    title: `写真 ${i + 1}`,
  }));

export default function HomeScreen() {
  const [photos, setPhotos] = useState(photoData);
  // 画面サイズを動的に取得
  const { width: screenWidth } = useWindowDimensions();

  // 写真をタップした時の処理
  const handlePhotoPress = (id: string) => {
    console.log(`写真 ${id} がタップされました`);
  };

  // プラスボタンをタップした時の処理
  const handleAddPress = () => {
    console.log("写真を追加します");
    // ここに写真追加ロジックを実装
  };

  // 写真アイテムのレンダリング
  const renderPhotoItem = ({ item }: { item: PhotoItem }) => (
    <TouchableHighlight
      style={[
        styles.photoItem,
        { width: screenWidth / 3, height: screenWidth / 3 },
      ]}
      onPress={() => handlePhotoPress(item.id)}
      underlayColor="rgba(255, 255, 255, 0.8)"
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.uri }} style={styles.photo} />
    </TouchableHighlight>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderPhotoItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoItem: {
    padding: 1,
    // widthとheightはコンポーネント内で動的に設定
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#2196F3",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
    }),
  },
});
