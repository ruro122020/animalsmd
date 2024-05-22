
const BASEURL = `http://localhost:5555`

const getData = async (url) => {
  try {
    const res = await fetch(`${BASEURL}/${url}`)

    if (!res.ok) {
      throw new Error('Fetch to database failed')
    }
    const data = await res.json()
    print('data in api', data)
    print('data in api', data)
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

    if (!res.ok) {
      throw new Error("Post to database failed")
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.log('post err', error)
    return false
  }

}

const updateData = async (url, body) => {

  try {
    const res = await fetch(`${BASEURL}/${url}`, {
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
    const res = await fetch(`${BASEURL}/${url}`, { method: 'DELETE' })

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
