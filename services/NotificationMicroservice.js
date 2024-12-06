const callNotificationMicroservice = async (userId) => {
  const url = 'http://127.0.0.1:5000/notify'
  const payload = JSON.stringify({ user_id: '12345'})

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: payload
    })

    if (!response.ok) {
      throw new Error(`Microservice responded with error:${response.error}`)
    }
    const data = await response.json()
    console.log(data)
    return await data
  } catch (error) {
    console.error('Error: ', error.message)
    throw new Error('Microservice failed')
  }
}

module.exports = { callNotificationMicroservice }

callNotificationMicroservice()