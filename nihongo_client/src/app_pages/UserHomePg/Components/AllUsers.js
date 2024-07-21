function AllUsers({
    userAccounts,
    userCards,
    filterBar
}){
    console.log(userAccounts)
    const filterUsers = userAccounts.filter(accountInfo => accountInfo.username.toLowerCase().includes(filterBar.toLowerCase()))
    return(
        userCards(filterUsers)
    )
}
export default AllUsers