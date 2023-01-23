import {useEffect, useState} from "react";
import { makeRequrest } from "../makeRequest";

const useFetch = (url) => {

const [data, setData] = useState(null)
const [loading, setLoading] = useState(null)
const [error, setError] = useState(null)

useEffect(() => {
    const fetchData = async () => {
        setLoading(true)
        try{
          const res = await makeRequrest.put(url);
          setData(res.data.data) 
        }catch(err){
          setError(true)
        }
        setLoading(false)
      };
      fetchData();
    }, [url]);

    return{data,loading,error};
}

export default useFetch;