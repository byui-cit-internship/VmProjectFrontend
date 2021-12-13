
const isAdmin = sessionStorage.getItem("isAdmin")
console.log("here", isAdmin)
const createAdmin = () => {

    const portal_div = document.getElementById("admin_portal")
    let aTag = document.createElement('a');
    aTag.setAttribute('href', "/VMAdmin_dash/admin.html");
    aTag.innerHTML = "Admin Portal";
    aTag.setAttribute("class", "submitBt btn-primary")
    portal_div.append(aTag)

}
createAdmin()
