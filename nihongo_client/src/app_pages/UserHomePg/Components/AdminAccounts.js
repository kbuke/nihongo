

function AdminAccounts({
    adminAccounts,
    userCards,
    filterBar
}){
    const filterUsers = adminAccounts.filter(accountInfo => accountInfo.username.toLowerCase().includes(filterBar.toLowerCase()))
    return(
        userCards(filterUsers)
    )
}
export default AdminAccounts