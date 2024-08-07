import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarLabel: () => "Accueil",
          tabBarIcon: () => (
            <TabBarIcon
              name="home-outline"
              size={14}
            />
          ),
          href: null,
        }}
      />
    </Tabs>
  );
}
