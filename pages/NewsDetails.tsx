import { Image, Pressable, StyleSheet, View } from "react-native"
import Page from "../components/Page";
import { useSelector } from "react-redux";
import { selectNewsByTitle } from "../store";
import { NewsItem, ScreenProps } from "../types";
import { Icon, Text } from "@rneui/themed";
import useCrashlytics from "../hooks/useCrashlytics";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const NewsDetails: React.FC<ScreenProps> = ({ route, navigation }) => {

    
    const newsDetails: NewsItem = useSelector((state) => selectNewsByTitle(state, route.params.title))
    const crashlytics = useCrashlytics();
    const { auth: { currentUser } } = useAuth();


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
            style={styles.backButton}>
                <Icon
                    name="arrow-back"
                    size={20}
                    color="#fff"
                />
            </Pressable>
            <Image
                source={{ uri: newsDetails?.urlToImage }}
                style={styles.newsImage}
                height={200}
            />

            <View style={styles.section}>
                <Text style={styles.heading}>
                    {newsDetails.title}
                </Text>
                <Text>
                    {newsDetails.source.name}
                </Text>
            </View>

            <View style={styles.section}>
                <Text>
                    {newsDetails.description}
                </Text>
                <Text>
                    {newsDetails.content}
                </Text>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    backButton: {
        borderRadius: 999,
        width: 50,
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        color: "white",
        marginVertical: 10
    },
    newsImage: {
        borderRadius: 12,
        width: "100%"
    },
    section: {
        width: "100%",
        marginVertical: 10
    },
    heading: {
        fontSize: 20,
        fontWeight: "700"
    }
})

export default NewsDetails;