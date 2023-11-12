import { Alert, Image, Linking, Pressable, StyleSheet, View } from "react-native"
import Page from "../components/Page";
import { useSelector } from "react-redux";
import { selectNewsByTitle } from "../store";
import { NewsItem, ScreenProps } from "../types";
import { Avatar, Button, Icon, Text } from "@rneui/themed";
import useCrashlytics from "../hooks/useCrashlytics";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { formatDistanceToNow, parseISO } from "date-fns";
import Ionicons from "react-native-vector-icons/Ionicons";


const NewsDetails: React.FC<ScreenProps> = ({ route, navigation }) => {

    
    const newsDetails: NewsItem = useSelector((state) => selectNewsByTitle(state, route.params.title))
    const crashlytics = useCrashlytics();
    const { auth: { currentUser } } = useAuth();

    const relativeDate = formatDistanceToNow(parseISO(newsDetails?.publishedAt), { addSuffix: true })
    const defaultAvatar = `https://api.dicebear.com/7.x/shapes/png?seed=${newsDetails.source.name}`
    const defaultImage = "https://api.dicebear.com/7.x/shapes/png?flip=false";

    const openNewsUrl = async () => {
        const canOpenUrl = await Linking.canOpenURL(newsDetails.url);
        if(!canOpenUrl) return Alert.alert(
            "Unable to Open URL",
            "Opening of URLs not supported"
        )

        return await Linking.openURL(newsDetails.url)
    }
    
    useEffect(() => {
        if(!newsDetails) {
            crashlytics.log(`User ${currentUser?.email} checked out story but it wasn't found`)
        } else {
            crashlytics.log(`User ${currentUser?.email} checked out story with title ${newsDetails.title}`)
        }
    }, []);

    
    if (!newsDetails) {
        return (
            <Page>
                <Text>This news does not exist</Text>
            </Page>
        )
    }

    return (
        <Page>
            <Pressable 
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            >
                <Icon
                    name="arrow-back-ios"
                    color="#fff"
                    type="material"
                    testID="backButton"
                    iconStyle={{ width: 15 }}
                />
            </Pressable>

            <Text style={styles.heading}>
                {newsDetails.title}
            </Text>

            <Text style={[styles.text, styles.subtitle]}>
                Published {relativeDate}
            </Text>

            <View style={styles.section}>
                <Avatar 
                    avatarStyle={{ borderRadius: 999, width: 40, height: 40 }}
                    containerStyle={{ width: 40, height: 40 }}
                    source={{ uri: defaultAvatar }}
                />

                <View style={{  marginLeft: 7 }}>
                    <Text>
                        Published by
                    </Text>

                    <Text style={[styles.subtitle]}>
                        {newsDetails.source.name}
                    </Text>
                </View>
            </View>

            <View style={styles.textBlock}>
                <Text style={styles.mediumText}>
                    {newsDetails.description}
                </Text>
                <Text style={styles.mediumText}>
                    {newsDetails.content}
                </Text>
            </View>

            <Image
                source={{ uri: newsDetails?.urlToImage || defaultImage }}
                style={styles.newsImage}
                height={200}
                testID="newsImage"
            />

            <Button 
                buttonStyle={styles.openUrlButton}
                onPress={openNewsUrl}
                testID="openUrlButton"
            >
                Click here for the full story
            </Button>

        </Page>
    )
}

const styles = StyleSheet.create({
    openUrlButton: {
        borderRadius: 12,
        marginVertical: 15,
        fontFamily: "EncodeSans-SemiBold"
    },
    backButton: {
        borderRadius: 999,
        width: 50,
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#121212",
        marginVertical: 12
    },
    newsImage: {
        borderRadius: 12,
        width: "100%"
    },
    section: {
        width: "100%",
        marginVertical: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    heading: {
        fontSize: 22,
        fontFamily: "EncodeSans-SemiBold",
        marginBottom: 10
    },
    text: {
        marginVertical: 5
    },
    textBlock: {
        marginVertical: 10,
        fontFamily: "EncodeSans-SemiBold"
    },
    subtitle: {
        fontSize: 14,
        fontFamily: "EncodeSans-Medium"
    },
    mediumText: {
        fontSize: 14,
        fontFamily: "EncodeSans-Medium"
    }
})

export default NewsDetails;