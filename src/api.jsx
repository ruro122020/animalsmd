

const getData = async (url) => {
  try {
    const res = await fetch(url)
    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error)
    }
    return data
  } catch (err) {
    console.log(err)
    return false
  }
}

const postData = async (url, body) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error)
    }

    return data
  } catch (error) {
    console.log(error)
    return false
  }

}

const updateData = async (url, body) => {

  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error)
    }
    return data
  } catch (error) {
    console.log(error)
    return false
  }

}

const deleteData = async (url) => {
  try {
    const res = await fetch(url, { method: 'DELETE' })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error)
    }
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export {
  getData,
  postData,
  updateData,
  deleteData
}
