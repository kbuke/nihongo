

function TravelerUsers({
    travelerRole,
    userCards,
    filterBar
}){
    const filterTravelers = travelerRole.filter(accountInfo => accountInfo.username.toLowerCase().includes(filterBar.toLowerCase()))
    return(
        userCards(filterTravelers)
    )
}
export default TravelerUsers