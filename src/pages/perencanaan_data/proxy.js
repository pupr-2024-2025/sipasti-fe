import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      "https://api-ecatalogue-staging.online/api/perencanaan-data/table-list-prencanaan-data/",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Proxy Error:", error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: "Proxy request failed" });
  }
}
