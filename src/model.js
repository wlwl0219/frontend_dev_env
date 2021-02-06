import axios from "axios"

const model = {
  async get() {
    const { data } = await axios.get("/api/keywords")
    // const { data } = await axios.get("http://localhost:8081/api/keywords")
    return data
  },
}

export default model