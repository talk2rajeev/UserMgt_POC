
export function sortAsc(users){
    return users.sort(function(a, b){
        var titleA = a.name.toLowerCase(), titleB = b.name.toLowerCase();
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
       // return a.name>b.name;
    });
}
export function sortDesc(users){
    return users.sort(function(a, b){
        var titleA = a.name.toLowerCase(), titleB = b.name.toLowerCase();
        if (titleA > titleB) return -1;
        if (titleA < titleB) return 1;
        return 0;
    });
    
}