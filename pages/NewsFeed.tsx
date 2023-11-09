import { ActivityIndicator, Alert, Dimensions, FlatList, Pressable, View } from "react-native";
import Page from "../components/Page";
import React, { useEffect, useState } from "react";
import http from "../http";
import { useQuery } from "@tanstack/react-query";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import useAuth from "../hooks/useAuth";
import { Avatar, Button, Dialog, Text } from "@rneui/themed";
import { NewsItem, ScreenProps } from "../types";
import { useDispatch } from "react-redux"
import { storeNews } from "../store";
import useRedirect from "../hooks/useRedirect";

type Category = "sports"|"technology"|"all"
const NewsFeed: React.FC<ScreenProps> = ({ navigation }) => {
    const [category, setCategory] = useState<Category>("all");
    const dispatch = useDispatch();
    const { auth } = useAuth();

    useEffect(() => {
        useRedirect(navigation);
    }, [])

    const { isLoading, data: news } = useQuery({
        queryKey: ["news-listing"],
        queryFn: async () => {
            const response =  await http.get('/top-headlines');
            const news = response.data.articles as NewsItem[]
            dispatch(storeNews(news))
            return news
        },
    });

    const [dialogOpen, setDialogOpen] = useState(false);

    const toggleDialog = () => setDialogOpen((preVal) => !preVal);

    const openSignOutAlert = () => {
        toggleDialog()
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out of your account?",
            [
                { text: "No", },
                {
                    text: "Yes",
                    onPress: async () => {
                        await auth.signOut()
                        return navigation.navigate("Login")
                    }
                }
            ]
        )
    }


    if (isLoading) {
        return (
            <Page>
                <ActivityIndicator/>
            </Page>
        )
    }
    
    return (
        <FlatList
            style={styles.list}
            ListHeaderComponent={
                <View style={styles.header}>
                    <Text style={styles.title}>Hello {auth.currentUser?.displayName}</Text>
                    
                    <Avatar 
                        avatarStyle={{ borderRadius: 999, width: 50, height: 50 }}
                        containerStyle={{ width: 50, height: 50 }}
                        source={{ uri: auth.currentUser?.photoURL! }}
                        onPress={toggleDialog}
                    />

                    <Dialog 
                        isVisible={dialogOpen} 
                        onBackdropPress={toggleDialog}
                    >
                        <Dialog.Title 
                            titleStyle={{ color: "#000" }} 
                            title="Your Profile"
                        />
                        <View style={styles.profile}>
                            <Avatar 
                                avatarStyle={{ borderRadius: 999, width: 40, height: 40 }}
                                containerStyle={{ width: 40, height: 40 }}
                                source={{ uri: auth.currentUser?.photoURL! }}
                            />
                            <View style={{ marginLeft: 7 }}>
                                <Text>
                                    {auth.currentUser?.displayName}
                                </Text>
                                <Text>
                                    {auth.currentUser?.email}
                                </Text>
                            </View>
                        </View>

                        <Button 
                            color="error"
                            buttonStyle={{ borderRadius: 20, marginTop: 12 }}
                            onPress={openSignOutAlert}
                        >
                            Sign Out
                        </Button>

                    </Dialog>
                
                </View>
            }
            data={news!}
            renderItem={({ item: news }) => (
                <Pressable
                    onPress={() => navigation.navigate("News-Details", { title: news.title })} 
                    style={{ width: "100%", marginVertical: 7 }}
                >
                    <View style={styles.newsListing}>
                        <Image 
                            style={styles.newsImage} 
                            height={100} 
                            width={100} 
                            source={{ uri: news.urlToImage }} 
                        />
                        <View style={{ width: "100%", marginLeft: 7 }}>
                            <Text style={styles.title}>
                                {news.title}
                            </Text>
                            <Text style={styles.subtitle}>{news.source.name}</Text>
                        </View>                        
                    </View>
                </Pressable>
            )}
        />
    )
}

const styles = StyleSheet.create({
    newsImage: {
        borderRadius: 12,
    },
    newsListing: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        width: "70%",
    },
    list: {
        width: Dimensions.get("screen").width,
    },
    title: {
        fontSize: 16,
        color: "#000"
    },
    subtitle: {
        fontSize: 12,
        color: "#000"
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    profile: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    }
})

export default NewsFeed;