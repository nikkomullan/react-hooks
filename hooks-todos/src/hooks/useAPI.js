import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useAPI(endpoint) {
  const [data, setData] = useState([])

  const getData = async () => {
    const response = await axios.get(endpoint)
    setData(response.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return data
}
