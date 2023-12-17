const users= []

exports.addUserToRing = ({id,name,room})=>{
    const numberOfUsersInRing = users.filter(user =>user.room === room).length
    if(numberOfUsersInRing === 6)
        return {error: "Ring is already full."}
    const newUser = {id,name,room}
    users.push(newUser)
    return {newUser}
}

exports.removeUser = id=>{
    const removeIndex = users.findIndex(user=>user.id === id)

    if(removeIndex !== -1)
        return users.splice(removeIndex,1)[0]
}

exports.getUser = id =>{
    return users.find(user=>user.id === id)
}

exports.getUsersInRing = room=>{
    return users.filter(user=>user.room === room)
}