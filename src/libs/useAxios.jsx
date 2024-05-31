import { useState, useEffect } from 'react';
import axios from 'axios'
import api from './api';

const useAxios = (url) => {
    const [data, setData] = useState(null);  // เริ่มต้นเป็นอาร์เรย์ว่าง
    const [isLoading, setIsLoading] = useState(true); // เริ่มต้นเป็น true เพื่อแสดงการโหลด

    useEffect(() => {
        api.get(url)
            .then((res) => res.data)
            .then(data => {
                setData(data);
                setIsLoading(false);  // การโหลดเสร็จสิ้น
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);  // การโหลดเสร็จสิ้นแม้เกิดข้อผิดพลาด
            });
    }, [url]);
    return { data, isLoading };
}
 
export default useAxios;