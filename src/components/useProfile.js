import {useEffect, useState} from "react";

export function useProfile() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
  
    fetch('/api/profile')
      .then(response => {
        // Check if the response has valid JSON content
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        
        // Ensure the response is not empty before parsing
        return response.text().then(text => {
          if (text) {
            return JSON.parse(text); // Parse only if content is not empty
          } else {
            return {}; // Return an empty object or whatever default you'd prefer
          }
        });
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching profile data:", error);
        setLoading(false); // Stop loading in case of an error as well
      });
  }, []);
  

  return {loading, data};
}