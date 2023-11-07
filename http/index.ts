import axios, { AxiosResponse } from "axios";
import perf, { FirebasePerformanceTypes } from "@react-native-firebase/perf"

interface Config {
    url: string,
    method: FirebasePerformanceTypes.HttpMethod
}

const http = axios.create({
    baseURL: "",
})

http.interceptors.request.use(async (config: any) => {
    try {
      const httpMetric = perf().newHttpMetric(config.url, config.method);
      config.metadata = { httpMetric };
  
      await httpMetric.start();
    } finally {
      return config;
    }
})

http.interceptors.response.use(async (response: AxiosResponse) => {
    try {
  
        const { httpMetric } = (response.config as any).metadata;

        httpMetric.setHttpResponseCode(response.status);
        httpMetric.setResponseContentType(response.headers['content-type']);
        await httpMetric.stop();
    } finally {
        return response;
    }
}, async (error) => {
    try {
        const { httpMetric } = error.config.metadata;

        httpMetric.setHttpResponseCode(error.response.status);
        httpMetric.setResponseContentType(error.response.headers['content-type']);
        await httpMetric.stop();
    } finally {
        return Promise.reject(error);
    }
})

export default http;