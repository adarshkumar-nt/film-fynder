import { keepPreviousData, useQuery } from "@tanstack/react-query";
import myAxios from "../client";

const defaultParams = {
    s: "Joker",
    type: "movie",
    y: "2019",
    page: "1"
}

export const useSearchMovies = (params = defaultParams) => {
    const {s, type, y, page} = params;
    return useQuery({
        queryKey: ['movies', s, type, y, page], 
        queryFn: async () => {
            const {data} = await myAxios.get("/", {
                params: {
                    s,
                    ...(type && {type: type}),
                    ...(y && {y: y}),
                    ...(page && {page: page}),
                    apiKey: process.env.NEXT_PUBLIC_OMDB_KEY
                }
            })
            return data
        },
        enabled: !!s,
        placeholderData: keepPreviousData 
    })
}