

export function sortAsc(users){
    return users.sort(function(a, b){
        var titleA = a.firstName.toLowerCase(), titleB = b.firstName.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
    });
}
export function sortDesc(users){
    return users.sort(function(a, b){
        var titleA = a.firstName.toLowerCase(), titleB = b.firstName.toLowerCase();
        if (titleA > titleB) return -1;
        if (titleA < titleB) return 1;
        return 0;
    });
    
}

export function getRoleArray(roles, value){

    let formattedRoles = [];
    for(let i = 0; i < value.length; i++){
        let role = roles.find(item=>item.name === value[i]);
        formattedRoles.push({id: role._id, name: role.name});
    }

    return formattedRoles;
}


export function getPageTotal(arr){
    return arr.length;
}


export function getpageChunk(arr, pagination){
    
    return arr.splice((pagination.pagination.curPage-1)*pagination.pagination.pageSize, pagination.pagination.pageSize);
}

export function searchInPermission(pattern, permissions){
    let result = [];
    result = permissions.filter((item)=>{
        return item.name.toLowerCase().includes(pattern.toLowerCase()) || 
        item.clientName.toLowerCase().includes(pattern.toLowerCase());
    });
    return result;
}

export function searchInUserGroup(pattern, usergroups){
    let result = [];
    result = usergroups.filter((item)=>{
        return item.name.toLowerCase().includes(pattern.toLowerCase()) ||
        item.role.find((role)=>{
            return role.name.toLowerCase().includes(pattern.toLowerCase())
        })
    });
    return result;
}

export function searchInClient(pattern, clients){
    let result = [];
    result = clients.filter((item)=>{
        return item.name.toLowerCase().includes(pattern.toLowerCase());
    });
    return result;
}

