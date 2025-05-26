import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { getRecommendations } from "../../configs/api";
import { auth, db } from "../../configs/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Animated, { FadeInUp, FadeOut } from "react-native-reanimated";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.log("User not authenticated!");
        setLoading(false);
        return;
      }

      const userRef = doc(db, "preferences", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        console.log("No user preferences found!");
        setLoading(false);
        return;
      }

      const userData = userSnap.data();
      const requestData = {
        activities: userData.preferences || [],
        travelers_type: "Solo",
        travel_date: "Best time to visit",
        budget_category: userData.budget || "Moderate",
      };

      try {
        const result = await getRecommendations(requestData);
        if (result && Array.isArray(result)) {
          const accommodationImageMap = {
            "Le Grand Galle":
              "https://cdn.travmedia.com/gallery/951267/951267_num1305449_585x585.jpg",
            "Jetwing Lighthouse":
              "https://www.jetwinghotels.com/wp-content/uploads/2019/06/lighthouse-new-category-744x653.jpg",
            "Tamarind Hill":
              "https://media-cdn.tripadvisor.com/media/photo-s/0c/5d/85/3e/the-front-face-of-the.jpg",
            "Cinnamon Wild Yala":
              "https://your-image-host.com/cinnamon-wild-yala.jpg",
            "Rainforest Eco Lodge":
              "https://your-image-host.com/rainforest-eco-lodge.jpg",
            "Mirissa Beach Hotel":
              "https://cf.bstatic.com/xdata/images/hotel/max1024x768/507051500.jpg?k=c833b62b7a6d4166eef9be3f61cb794fd49be6f162cf23fb4d95d80c676b57b2&o=&hp=1",
            "Salt Asia Boutique Hotel":
              "https://cf.bstatic.com/xdata/images/hotel/max1024x768/239027828.jpg?k=2ccb6d72213520b6f905a100ae62cf7867efaa1c7b3bb8f58a94b12608d721e9&o=&hp=1",
            "Casa Colombo":
              "https://www.kayak.co.in/rimg/himg/c2/e2/c2/expedia_group-2260549-7a9c09-178344.jpg?width=1366&height=768&crop=true",
            "The Seascape":
              "https://cf.bstatic.com/xdata/images/hotel/max1024x768/334881363.jpg?k=8270e0318e9e6831bfdc15b86fc9dca6110c87db6b5c2fb2c1c6c464118e3374&o=&hp=1",
            "Culture Resort":
              "https://cf.bstatic.com/xdata/images/hotel/max1024x768/131024078.jpg?k=981d58cf9ef7789f5c1fcc60077bbc0b3f840f06d6cfe920a4bc3fff7dc5306f&o=&hp=1",
            "Amaloh Boutique Resort ":
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0i4nT1h5HBSjX4K7CxbOSJSE52v83_D_UXA&s",
          };

          const enhancedResult = result
            .map((item) => {
              let destinationImage;
              let additionalImages;

              // Define main destination image and additional images based on destination
              switch (item.Destination) {
                case "Galle Beach":
                  destinationImage =
                    "https://www.talesofceylon.com/wp-content/uploads/2019/10/Beach-bum_800x520.jpg";
                  additionalImages = [
                    "https://jetwinghotels.com/islandinsider/wp-content/uploads/2022/05/Must-Visit-Beaches-in-Galle-1440x960-1.jpg", // Sunset over beach
                    "https://i0.wp.com/mytravelation.com/wp-content/uploads/2023/11/Galle.jpeg?fit=1254%2C836&ssl=1", // Beach with rocks
                    "https://res.cloudinary.com/enchanting/image/upload/v1/artemis-mdm/places/54bab3b9-22dc-483b-9d8e-03bb916d55e1.jpg", // Footprints in sand
                    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/176690948.jpg?k=2934bbb365e52464669b0ab35b27dd577f13714a6abf8e765ef448021136004e&o=&hp=1", // Waves crashing
                    "https://www.attractionsinsrilanka.com/wp-content/uploads/2019/07/Galle-Fort-Beach.jpg", // Another sunset view
                    "https://www.trawell.in/admin/images/upload/815278905Galle_Unawatuna_Beach.jpg", // Coastal scenery
                  ];
                  break;
                case "Matara Beach":
                  destinationImage =
                    "https://www.steuartholidays.com/wp-content/uploads/2019/02/Beach-View-17-3.jpg";
                  additionalImages = [
                    "https://thumbs.dreamstime.com/b/matara-sri-lanka-december-beach-road-southern-coast-popular-place-evening-leisure-walks-meetplace-couples-99267511.jpg",
                    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/6b/94/2b/caption.jpg?w=800&h=400&s=1",
                    "https://www.attractionsinsrilanka.com/wp-content/uploads/2020/03/Matara-Beach.jpg",
                    "https://ceylonempiretravels.com/wp-content/uploads/2024/09/Places-to-Visit-in-Matara.jpg",
                    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/505943204.jpg?k=b8f3070f8af85b091f144e721afcbcbbd9a82b094294327de75cadea036e018e&o=&hp=1",
                    "https://amazingsrilanka.lk/wp-content/uploads/2024/01/2024-01-31-11-45-55-Polhena-Beach-Google-Maps.png",
                  ];
                  break;
                case "Mirissa Beach":
                  destinationImage =
                    "https://sahashrithtravel.files.wordpress.com/2021/12/coco.jpg?w=1024";
                  additionalImages = [
                    "https://travel-eat-love.de/wp-content/uploads/2024/01/famous-coconut-tree-hill-in-mirissa-sri-lanka-beach-next-to-the-indian-ocean.jpg",
                    "https://www.worldbeachguide.com/photos/mirissa-beach.jpg",
                    "https://www.theglobetrottergp.com/wp-content/uploads/2019/05/oDZ1LpuSxCdJQd5UhbjSA_thumb_60bb.jpg",
                    "https://assets.telegraphindia.com/telegraph/2023/Aug/1691497505_cms001.jpg",
                    "https://hungrybackpack.com/wp-content/uploads/2019/03/coconut-hill_berit-and-martin2-Kopie.jpg",
                    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiIhyE8XeRfdc4mwzvguPouUgw2SMKInGtBurermS31rEdTyoewQ08jDrrO77cJPx6Su5ocHn6A2K1bGrsrWnhCA2qLNEj2mDdPcR1k92zHy9zIrCGoo_GMZyTTXDjEqKldq7Bw-WOqDwU/s1600/Upolu+Cay+Wedding+Postcard.png",
                  ];
                  break;
                case "Sinharaja Rainforest":
                  destinationImage =
                    "https://example.com/images/sinharaja-rainforest.jpg";
                  additionalImages = [
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1505142467895-6ff21b91454f?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                  ];
                  break;
                case "Knuckles Mountain Range":
                  destinationImage =
                    "https://example.com/images/knuckles-mountain.jpg";
                  additionalImages = [
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1505142467895-6ff21b91454f?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                  ];
                  break;
                case "Ella Rock":
                  destinationImage = "https://example.com/images/ella-rock.jpg";
                  additionalImages = [
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1505142467895-6ff21b91454f?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                  ];
                  break;
                case "Yala National Park":
                  destinationImage =
                    "https://example.com/images/yala-national-park.jpg";
                  additionalImages = [
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1505142467895-6ff21b91454f?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                  ];
                  break;
                case "Wilpattu National Park":
                  destinationImage =
                    "https://example.com/images/wilpattu-national-park.jpg";
                  additionalImages = [
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1505142467895-6ff21b91454f?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
                    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                  ];
                  break;
                default:
                  destinationImage = "https://picsum.photos/300/200";
                  additionalImages = [
                    "https://picsum.photos/300/200?random=1",
                    "https://picsum.photos/300/200?random=2",
                    "https://picsum.photos/300/200?random=3",
                    "https://picsum.photos/300/200?random=4",
                    "https://picsum.photos/300/200?random=5",
                    "https://picsum.photos/300/200?random=6",
                  ];
              }

              const accommodationImages = item.Accommodations
                ? item.Accommodations.split(", ").map((acc) => ({
                    name: acc,
                    image:
                      accommodationImageMap[acc] ||
                      `https://picsum.photos/150/100?random=${acc}`,
                    packages: [
                      { name: "Standard", price: "$50/night", rating: 4.2 },
                      { name: "Deluxe", price: "$80/night", rating: 4.7 },
                    ],
                  }))
                : [];

              return {
                ...item,
                image: destinationImage,
                description: `Explore the beautiful ${
                  item.Destination
                } known for its stunning ${item.Category.toLowerCase()} scenery.`,
                reviews: [
                  { rating: 4.5, comment: "Amazing experience!" },
                  { rating: 4.0, comment: "Great place to visit." },
                ],
                accommodations: accommodationImages,
                additionalImages,
              };
            })
            .slice(0, 3);
          setRecommendations(enhancedResult);
        } else {
          console.log("No valid recommendations data received.");
          setRecommendations([]);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        Alert.alert("Error", "Failed to fetch recommendations.");
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const saveRecommendations = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "User not authenticated!");
      return;
    }

    setSaving(true);

    try {
      const userRef = doc(db, "preferences", user.uid);
      await setDoc(userRef, { recommendations }, { merge: true });
      Alert.alert("Success", "Recommendations saved successfully!");
    } catch (error) {
      console.error("Error saving recommendations:", error);
      Alert.alert("Error", "Failed to save recommendations.");
    } finally {
      setSaving(false);
    }
  };

  const renderDestination = ({ item }) => (
    <Animated.View
      entering={FadeInUp.duration(600)}
      exiting={FadeOut}
      style={styles.card}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.destinationImage}
        onError={(e) =>
          console.log(`Failed to load image for ${item.Destination}`, e)
        }
        accessibilityLabel={`${item.Destination} main image`}
      />
      <Text style={styles.title}>{item.Destination}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.sectionTitle}>More Images</Text>
      <FlatList
        data={item.additionalImages}
        renderItem={({ item: image }) => (
          <Image
            source={{ uri: image }}
            style={styles.additionalImage}
            onError={(e) =>
              console.log(
                `Failed to load additional image for ${item.Destination}`,
                e
              )
            }
            accessibilityLabel={`${item.Destination} additional image`}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageList}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Category: </Text>
          {item.Category}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Budget: </Text>${item.Budget}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Duration: </Text>
          {item.Duration}
        </Text>
      </View>
      <Text style={styles.sectionTitle}>What Travelers Say</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.reviewContainer}
        accessibilityLabel="Traveler reviews"
      >
        {item.reviews.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <Text style={styles.reviewRating}>⭐ {review.rating}</Text>
            <Text style={styles.reviewComment}>"{review.comment}"</Text>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.sectionTitle}>Stay Options</Text>
      <FlatList
        data={item.accommodations}
        renderItem={({ item: acc }) => (
          <View style={styles.accommodationCard}>
            <Image
              source={{ uri: acc.image }}
              style={styles.accommodationImage}
              onError={(e) =>
                console.log(`Failed to load image for ${acc.name}`, e)
              }
              accessibilityLabel={`${acc.name} accommodation image`}
            />
            <View style={styles.accommodationDetails}>
              <Text style={styles.accommodationName}>{acc.name}</Text>
              {acc.packages.map((pkg, pkgIndex) => (
                <Text key={pkgIndex} style={styles.package}>
                  {pkg.name}: <Text style={styles.price}>{pkg.price}</Text>{" "}
                  <Text style={styles.rating}>(⭐ {pkg.rating})</Text>
                </Text>
              ))}
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() =>
                  Linking.openURL(
                    `https://www.booking.com/searchresults.html?ss=${item.Destination}&checkin=2025-05-27&checkout=2025-05-28&q-check-in=2025-05-27&q-check-out=2025-05-28&q-room-0-adults=2&q-room-0-children=0`
                  )
                }
                accessibilityLabel={`Book ${acc.name}`}
              >
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.accommodationList}
      />
      <TouchableOpacity
        style={[styles.saveButton, saving && styles.disabledButton]}
        onPress={saveRecommendations}
        disabled={saving}
        accessibilityLabel="Save favorites button"
      >
        <Text style={styles.buttonText}>
          {saving ? "Saving... 💾" : "Save Favorites 💾"}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>✨ Explore Your Next Adventure ✈️</Text>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#ff6f61"
          accessibilityLabel="Loading indicator"
        />
      ) : recommendations.length > 0 ? (
        <FlatList
          data={recommendations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderDestination}
          contentContainerStyle={styles.list}
          accessibilityLabel="Recommendation list"
        />
      ) : (
        <Text style={styles.noData}>
          No destinations found. Try adjusting your preferences! 🌍
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f7fa",
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: "#e63946",
    marginBottom: 20,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  destinationImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a252f",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#4a5b6e",
    lineHeight: 22,
    marginBottom: 12,
  },
  detailsContainer: {
    backgroundColor: "#e8ecef",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  detail: {
    fontSize: 15,
    color: "#1a252f",
    marginVertical: 4,
  },
  detailLabel: {
    fontWeight: "600",
    color: "#e63946",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a252f",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  imageList: {
    marginBottom: 12,
  },
  additionalImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 8,
  },
  reviewContainer: {
    marginBottom: 12,
  },
  reviewCard: {
    backgroundColor: "#e8ecef",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    width: 140,
    minHeight: 80,
  },
  reviewRating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a252f",
    marginBottom: 4,
  },
  reviewComment: {
    fontSize: 13,
    color: "#4a5b6e",
    fontStyle: "italic",
  },
  accommodationList: {
    marginBottom: 12,
  },
  accommodationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  accommodationImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  accommodationDetails: {
    flex: 1,
  },
  accommodationName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a252f",
    marginBottom: 6,
  },
  package: {
    fontSize: 14,
    color: "#4a5b6e",
    marginBottom: 4,
  },
  price: {
    fontWeight: "600",
    color: "#e63946",
  },
  rating: {
    color: "#e63946",
    fontWeight: "500",
  },
  bookButton: {
    backgroundColor: "#1a73e8",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 6,
    shadowColor: "#1a73e8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bookButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#1a73e8",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
    shadowColor: "#1a73e8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#a3bffa",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  noData: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    marginTop: 20,
  },
});
