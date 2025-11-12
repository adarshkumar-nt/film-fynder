import { keepPreviousData, useQuery } from "@tanstack/react-query";
import myAxios from "../client";
import { useSelector } from "react-redux";

export const useSearchMovies = () => {
    const {s, type, y, page} = useSelector((state) => state.search)
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
    })
}

export const useMovieDetail = ({i}) => {
    return useQuery({
        queryKey: ['movieDetail', i],
        queryFn: async () => {
            const {data} = await myAxios.get("/", {
                params: {
                    i,
                    apiKey: process.env.NEXT_PUBLIC_OMDB_KEY
                }
            })
            return data
        },
        enabled: !!i
    })
}