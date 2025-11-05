import { useQuery } from "@tanstack/react-query";
import axios from "../client";

export const useSearchMovies = (params) => {
    const {s, type, y, page} = params;
    return useQuery({
        queryKey: ['movies', s, type, y, page], 
        queryFn: async () => {
            const {data} = await axios.get("/", {
                params: {
                    s,
                    type,
                    y,
                    page,
                    apiKey: process.env.NEXT_PUBLIC_OMDB_KEY
                }
            })
            return data
        },
        enabled: !!s 
    })
}