import { useEffect, useState } from "react"
import { CustomerData } from "../interface/CustomerData"

interface InputData {
    url : string,
    method : string
}

export const useFetch = (props:InputData) => {
    const [data, setData] = useState<CustomerData[]>([])
    const getApiData = () => {
        fetch(props.url, {
            method: props.method
        })
        .then((response:any) => response.json())
        .then((datas:CustomerData[]) => setData(datas));
    }

    useEffect(() => {
        getApiData()
    },[])

    return data;
}