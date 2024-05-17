
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

const postData = async (url, obj) => {

}

const updateData = async (url, obj) => {

}

const deleteData = async (url) => {

}

export {
  getData,
  postData,
  updateData,
  deleteData
}
