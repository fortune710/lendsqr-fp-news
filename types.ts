import { NavigationProp, ParamListBase } from "@react-navigation/native";

export interface ScreenProps {
    navigation: NavigationProp<ParamListBase>;
    route: any
};

export interface NewsItem {
    title: string,
    url: string,
    urlToImage: string,
    source: {
        name: string,
    },
    author: string
    description: string,
    content: string,
    thumbnail: string,
    publishedAt: string
}
