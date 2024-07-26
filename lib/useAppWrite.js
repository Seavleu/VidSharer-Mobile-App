import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useAppWrite = (fn, initialState = []) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;  // Flag to check mount status
    const fetchData = async () => {
      if (!isMounted) return;
      setLoading(true);
      try {
        const res = await fn();
        if (isMounted) setData(res);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
  
    fetchData();
    return () => { isMounted = false };  
  }, [fn]);  

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useAppWrite;