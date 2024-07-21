function CitizenAccounts({
    citizenAccounts, 
    userCards,
    filterBar
}){
    const filterUsers = citizenAccounts.filter(accountInfo => accountInfo.username.toLowerCase().includes(filterBar.toLowerCase()))
    return(
        userCards(citizenAccounts)
    )
}
export default CitizenAccounts