import axios from "axios";
import { useQuery } from "react-query";


const useChat = (id: string) => {
    return useQuery(["chat", id], async () => {
        return axios.get("/api/chat").then(({ data: { data } }) => data);
    });
};

export default useChat;
