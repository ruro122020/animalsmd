

const getData = async (url) => {
  try {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error('Fetch to database failed')
    }
    const data = await res.json()
    return data
  } catch (err) {
    console.log('err', err)
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

    if (!res.ok) {
      throw new Error('Update to database failed')
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.log('update err', error)
    return false
  }

}

const deleteData = async (url) => {
  try {
    const res = await fetch(url, { method: 'DELETE' })

    if (!res.ok) {
      throw new Error('Could not delete')
    }
    return true
  } catch (err) {
    console.log('delete error', err)
    return false
  }
}

export {
  getData,
  postData,
  updateData,
  deleteData
}
