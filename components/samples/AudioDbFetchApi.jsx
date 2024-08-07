import { useState, useCallback, useEffect} from "react";
import { FlatList, Image, Text, View } from "react-native";


export default function AudioDbFetchApi(){
  const [artists, setArtists] = useState<any>(undefined);

  const fetchAudioDb = async () => {
    await fetch(
      "https://www.theaudiodb.com/api/v1/json/2/search.php?s=coldplay",
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          return;
        }

        const json = response.json();
        return json;
      })
      .then((datas) => setArtists(datas.artists));
  };

  const fetchAudioDbCallback = useCallback(() => {
    fetchAudioDb();
  }, [artists]);

  useEffect(() => {
    if (!artists) {
      fetchAudioDbCallback();
    }
  }, [artists]);
  
  return(
    <View>
      <Pressable
        onPress={async () => await fetchAudioDb()}
        style={{
          width: 250,
          height: 80,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 12,
          paddingHorizontal: 24,
          marginVertical: 12,
          marginHorizontal: "auto",
          backgroundColor: "#e26e26",
          borderRadius: 24,
        }}
      >
        <Text style={{ color: "#ffffff" }}>
          Lancer la requête API
        </Text>
      </Pressable>

      {artists && (
        <FlatList
          data={artists}
          renderItem={(datas) => (
            <View>
              <Image
                source={{
                  uri: datas.item.strArtistLogo,
                }}
                style={{
                  width: 250,
                  aspectRatio: 1 / 1,
                }}
                resizeMode="contain"
              />
              <Text
                style={{ fontSize: 24, fontWeight: 700 }}
              >
                {datas.item.strArtist}
              </Text>
              <Text>{datas.item.strBiographyFR}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}