import { ActivityIndicator, Alert, Dimensions, FlatList, Pressable, ScrollView, View } from "react-native";
import Page from "../components/Page";
import React, { useEffect, useState } from "react";
import http from "../http";
import { useQuery } from "@tanstack/react-query";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import useAuth from "../hooks/useAuth";
import { Avatar, Button, Chip, Dialog, Skeleton, Text } from "@rneui/themed";
import { NewsItem, ScreenProps } from "../types";
import { useDispatch } from "react-redux"
import { storeNews } from "../store";
import useRedirect from "../hooks/useRedirect";
import NewsCard from "../components/NewsCard";
import NewsCardSkeleton from "../components/NewsCardSkeleton";
import ListHeader from "../components/ListHeader";

type Category = "sports"|"technology"|"all"|"business"|"general"|"health"|"entertainment";

interface CategoryItem {
    name: string,
    value: Category
}

const categories: CategoryItem[] = [
    {
        name: "All",
        value: "all",
    },
    {
        name: "Business",
        value: "business"
    },
    {
        name: "Entertainment",
        value: "entertainment"
    },
    {
        name: "General",
        value: "general"
    },
    {
        name: "Health",
        value: "health"
    },
    {
        name: "Sports",
        value: "sports"
    },
    {
        name: "Technology",
        value: "technology"
    }
]
const NewsFeed: React.FC<ScreenProps> = ({ navigation }) => {
    const [activeCategory, setCategory] = useState<Category>("all");
    const dispatch = useDispatch();

    useEffect(() => {
        useRedirect(navigation);
    }, [])

    const { isLoading, data: news } = useQuery({
        queryKey: ["news-listing", activeCategory],
        queryFn: async () => {
            const response =  await http.get('/top-headlines', {
                params: {
                    ...(activeCategory !== "all" && {
                        category: activeCategory
                    })
                }
            });
            const news = response.data.articles as NewsItem[]
            dispatch(storeNews(news))
            return news
        },
    });



    const loadingArray = new Array(4);
        
    return (
        <FlatList
            style={styles.list}
            ListHeaderComponent={
                <View>
                    <ListHeader/>
                    <ScrollView 
                        contentContainerStyle={{ paddingLeft: 12 }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            categories.map((category) => (
                                <Chip 
                                    style={{ minWidth: 60 }}
                                    buttonStyle={{ marginRight: 7, minWidth: 60, }}
                                    titleStyle={{ fontFamily: "EncodeSans-Medium" }}
                                    type={activeCategory === category.value ? "solid" : "outline"}
                                    onPress={() => setCategory(category.value)}
                                >
                                    {category.name}
                                </Chip>
                            ))
                        }
                    </ScrollView>
                </View>
            }
            data={isLoading ? loadingArray : news!}
            renderItem={({ item: news }) => {
                if(isLoading) {
                    return (
                        <NewsCardSkeleton/>
                    )
                }

                return (
                    <Pressable
                        onPress={() => navigation.navigate("News-Details", { title: news.title })} 
                        style={styles.newsCardContainer}
                    >
                        <NewsCard news={news}/>
                    </Pressable>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
    newsImage: {
        borderRadius: 12,
    },
    newsCardContainer: { 
        width: "100%", 
        marginVertical: 7 
    },
    list: {
        width: Dimensions.get("screen").width,
    },
    title: {
        fontSize: 16,
        color: "#000",
        fontFamily: "EncodeSans-SemiBold"
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