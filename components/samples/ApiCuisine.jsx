import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";


export default function ApiCuisine() {

  const [recette, setRecette] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useVideoPlayer(recette?.strYoutube, player => {
    player.loop = false;
    player.play();
  });

  useEffect(() => {
    if (!recette) {
      fetchApiCuisine();
    }
    const subscription = player.addListener("playingChange", isPlaying => {
      setIsPlaying(isPlaying)
    });

    return () => {
      subscription.remove();
    }
  }, [recette]);

  const fetchApiCuisine = async () => {
    await fetch("https://www.themealdb.com/api/json/v1/1/random.php", {
      method: "GET",
    }).then(response =>
      response?.status === 200 && response.json()
    ).then(datas => setRecette(datas?.meals));
  };

  return (
    <View>
      {recette && (
        <>
          <Text>
            {recette.strMeal}
          </Text>
          <VideoView
            style={{
              width: 350,
              aspectRatio: 21 / 6,
            }}
            player={player}
            allowsFullscreen
          />
          <View style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 24,
          }}>
            <Pressable
              style={{
                width: "auto",
                backgroundColor: "#333",
                paddingVertical: 6,
                paddingHorizontal: 12,
                marginHorizontal: "auto",
              }}
              onPressOut={() => fetchApiCuisine()}
            >
              <Text style={{
                color: "#fff",
              }}>
                Nouvelle recette
              </Text>
            </Pressable>

            <Pressable
              style={{
                width: "auto",
                backgroundColor: "#333",
                paddingVertical: 6,
                paddingHorizontal: 12,
                marginHorizontal: "auto",
              }}
              onPressOut={() => {
                isPlaying ? player.pause() : player.play();
                setIsPlaying(!isPlaying);
              }}
            >
              <Text style={{
                color: "#fff",
              }}>
                Lire la vidéo
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}