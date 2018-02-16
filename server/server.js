

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');


    // Pass to next layer of middleware
    next();
});


/*---------
    USER 
----------*/
let users = [
    {id: 1, name: 'Rajeev', email: 'rajeev@sony.com', phone: 83456789},
    {id: 2, name: 'Raj', email: 'raj@sony.com', phone: 754738290},
    {id: 3, name: 'saurabh', email: 'saurabh@sony.com', phone: 128793648},
    {id: 4, name: 'Devidatta', email: 'devi@sony.com', phone: 8928736482},
    {id: 5, name: 'Divya', email: 'divya@sony.com', phone: 738247589}
];
app.get("/user/getall", function(req, res){
    res.json(users);
});

app.post("/user/create", function(req, res){
    let user = req.body;
    let id =  Math.floor( Math.random()*100 ) + 100;
    users.push({id, name: user.name, email: user.email, phone: user.phone});
    res.json(users);
});
app.put("/user/update", function(req, res){
    let user = req.body;
    console.log(req.body);
    users.map(function(item){
        if(parseInt(req.body.id) === parseInt(item.id) ){
            item.name = user.name;
            item.email = user.email;
            item.phone = user.phone;
        }
        return item;
    });
    res.json(users);
});
app.delete("/user/delete", function(req, res){
    users = users.filter(function(item){
        return parseInt(req.body.id) !== parseInt(item.id) ? true : false;
    });
    res.json(users);
});



/*---------
 USER GROUP
----------*/
let usergroups = [
    {
        "id": 101, 
        "name": "Admin Group", 
        "userIds": [
            {"id": 1, "name": "rajeev"}, 
            {"id": 2, "name": "raj"}
        ], 
        "roleIds": [
            {"id": 401, name: "admin"}, 
            {"id": 401, name: "HR"}
        ]
    }
];
app.get("/usergroup/getall", function(req, res){
    res.json(usergroups);
});
app.post("/usergroup/create", function(req, res){
    let usergroup = req.body;
    let name = usergroup.name;
    let userIds = usergroup.userIds;
    let roleIds = usergroup.roleIds;
    let id =  Math.floor( Math.random()*100 ) + 100;
    usergroups.push({id: id, name: name, userIds: roleIds, roleIds: roleIds})
    res.json({msg: 'UserGroup created successfully'});
});
app.put("/usergroup/update", function(req, res){
    let usergroup = req.body;
    let roleIds = usergroup.roleIds;
    let userIds = usergroup.userIds;
    usergroups.map(function(item){
        if(parseInt(req.body.id) === parseInt(item.id) ){
            item.userIds = userIds;
            item.roleIds = roleIds;
            item.name = usergroup.name;
        }
        return item;
    });
    res.json(usergroups);
});
app.delete("/usergroup/delete", function(req, res){
    usergroups = usergroups.filter(function(item){
        return parseInt(req.body.id) !== parseInt(item.id) ? true : false;
    });
    res.json(usergroups);
});



/*---------
   ROLES
----------*/
let rolesxxx = [
    {id: 101, 'name': 'Operator', 'pIds': ['401', '402']},
    {id: 102, 'name': 'HR', 'pIds': ['403']},
    {id: 103, 'name': 'Manager', 'pIds': ['405', '409']},
    {id: 104, 'name': 'Software Engg', 'pIds': ['405', '409']}
];
let roles = [
    {id: 101, 'name': 'Operator', 'pIds': [{id: '401', name: 'Server Room Access'}, {id: '402', name: 'ODM Room Access'}]},
    {id: 102, 'name': 'HR', 'pIds': [{id: '403', name: 'HR portal access'}]},
    {id: 103, 'name': 'Manager', 'pIds': [{id: '405', name: 'DMM App Access'}, {id: '409', name:'JIRA Admin access'}]},
    {id: 104, 'name': 'Software Engg', 'pIds': [{id: '405', name: 'DMM App Access'}, {id: '409', name:'JIRA Admin access'}]}
];
app.get("/role/getall", function(req, res){  
    res.json(roles);
});
app.post("/role/create", function(req, res){
    console.log(req.body);
    
    let role = req.body;
    let nrole = {};
    nrole.id =  Math.floor( Math.random()*100 ) + 100;
    nrole.name= role.name;

    var arr = role.pIds.map(function(item, i){
        var a = item.split('-')
        a = a.map(function(item){
            return item.trim();
        });
        
        return {id: a[0].substring(1, a[0].length-1), name: a[1]}
    })
    nrole.pIds = arr;

    roles.push(nrole);
    res.json(roles);
});
app.put("/role/update", function(req, res){
    let role = req.body;
    console.log(role)
    roles.map(function(item){
        if(parseInt(req.body.id) === parseInt(item.id) ){
            item.name = role.name;
            item.pIds = role.pIds;
        }
        return item;
    });
    res.json(roles);
});
app.delete("/role/delete", function(req, res){
    roles = roles.filter(function(item){
        return parseInt(req.body.id) !== parseInt(item.id) ? true : false;
    });
    res.json(roles);
});
app.delete("/role/perm/delete", function(req, res){
    console.log(req.body.id, req.body.pid);

    var role = roles.find(function(item){
        return parseInt(req.body.id) === parseInt(item.id);
   });
   var pid = role.pIds.filter(function(item){
        return parseInt(req.body.pid) !== parseInt(item.id) ? true : false;
   })
   roles = roles.map(function(item){
       return req.body.id === parseInt(item.id) ? {id: req.body.id, name: item.name, pIds: pid}	: item
   });
    
    res.json(roles);
});



/*---------
PERMISSION
----------*/
let permission= [{id: 401, name: 'Server Room Access'}, {id: 402, name: 'ODM Room Access'}, {id: 403, name: 'HR portal access'}, {id: 405, name: 'DMM App Access'}, {id: 409, name: 'JIRA Admin access'}];
app.get("/permission/getall", function(req, res){
    
    res.json(permission);
});
app.post("/permission/create", function(req, res){
    //let perm = req.body.permission;
    console.log(req.body);
    permission.push({id: Math.floor( Math.random()*1000 ) + 1000, name: req.body.name })
    res.json(permission);
});
app.put("/permission/update", function(req, res){
    console.log(req.body);
    permission.map(function(item){
        if(parseInt(req.body.id) === parseInt(item.id) ){
            item.name = req.body.name;
            console.log(req.body.name);
        }
        return item;
    });
    res.json(permission);
});

app.delete("/permission/delete", function(req, res){
    
    console.log(req.body);
    permission = permission.filter(function(item){
        return parseInt(req.body.id) !== parseInt(item.id) ? true : false;
    });
    res.json(permission);
});

app.listen(3000, function() {
  console.log("Express running");
});