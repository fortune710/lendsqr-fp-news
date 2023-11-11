import { Text } from "@rneui/themed";
import { View, Image, StyleSheet } from "react-native";
import { NewsItem } from "../types";
import { format, formatDistanceToNow, parseISO } from "date-fns";

interface NewsCardProps {
    news: NewsItem
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
    
    const relativeDate = formatDistanceToNow(parseISO(news.publishedAt), { addSuffix: true })
    
    return (
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
                <Text style={styles.subtitle}>
                    {news.source.name}
                </Text>
                <Text style={styles.subtitle}>
                    {relativeDate}
                </Text>
            </View>                        
        </View>
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
    title: {
        fontSize: 14,
        color: "#000",
        fontFamily: "EncodeSans-SemiBold"
    },
    subtitle: {
        fontSize: 12,
        fontFamily: "EncodeSans-Regular"
    },
})


export default NewsCard;