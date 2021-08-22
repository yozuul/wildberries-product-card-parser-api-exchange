export const fetData = (type, data) => {
  const headers = {
    Authorization: `Bearer ${process.env.WD_TOKEN}`,
    'Content-Type': 'application/json',
  }
  try {
    let response = {}
    if (type == 'get') {
      if(data) {
        response = await axios.get(url, ...data, {
          headers: headers
        })
      } else {
        response = await axios.get(url, {
          headers: headers
        })
      }
      console.log(response.data)
      return response.data
    }
    if (type == 'post') {
      if(data) {
        response = await axios.get(url, ...data, {
          headers: headers
        })
      } else {
        response = await axios.get(url, {
          headers: headers
        })
      }
      console.log(response.data)
      return response.data
    }
  } catch (error) {
    console.error(error);
  }

}