fetch('https://localhost:5001/api/token')
    .then(response => response.json())
    .then(data => console.log(data));
console.log("hello there")

// get method with Axios

const getDta = () => {
    // axios.get('https://localhost:5001/api/token{id_token}').then(response => {
    //     console.log(response)
    // })
    // ********** Or you can use this form of axios*********
    // axios({
    //     method: "get",
    //     url: "https://localhost:5001/api/token"
    // })
    // .then(response =>console.log(response))
}
getDta()
// Post method with axios
const postItem = () => {
    axios({
        method: "post",
        url: "https://localhost:5001/api/token",
        data: {
            ID: "7987987989789",
            token: "ajffjdsflkgffsdgsg"
        }
    })
        .then(response => console.log(response))
}
postItem()