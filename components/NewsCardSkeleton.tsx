import { Skeleton } from "@rneui/themed";
import { View, Dimensions, StyleSheet } from "react-native";

const NewsCardSkeleton: React.FC = () => (
    <View style={styles.skeletonCard}>
        <Skeleton style={styles.skeletonImage}/>
        
        <View style={{ marginLeft: 7 }}>
            <Skeleton style={styles.skeletonText} />
            <Skeleton style={styles.skeletonText} />
            <Skeleton style={styles.skeletonText} />
            <Skeleton style={[styles.skeletonText, { width: Dimensions.get("screen").width - 250 }]} />
        </View>
    </View>
)

const styles = StyleSheet.create({
    skeletonImage: {
        width: 100, 
        height: 100, 
        borderRadius: 12 
    },
    skeletonText: { 
        height: 10, 
        marginVertical: 3.5, 
        width: Dimensions.get("screen").width - 130 
    },
    skeletonCard: {
        display: "flex", 
        alignItems: "center", 
        flexDirection: "row",
        paddingHorizontal: 12,
        width: "70%",
        marginVertical: 7 
    }
})

export default NewsCardSkeleton;