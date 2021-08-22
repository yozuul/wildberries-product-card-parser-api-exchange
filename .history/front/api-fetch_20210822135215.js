export const apiFetch = async (apiURL, jsonData) => {
   try {
      const response = await fetch(apiURL, {
         method: 'POST',
         body: JSON.stringify(jsonData),
         headers: { 'Content-Type': 'application/json' }
      })
      return await response.json()
   } catch (error) {
      console.error('Error fetching:', error);
   }
}