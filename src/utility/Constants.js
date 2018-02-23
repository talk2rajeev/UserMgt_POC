/*
export const BASE_PATH = "http://127.0.0.1:9002";

export const API_PATH = {
    "user": {
        "getall": "/user/get-all",
        "create": "/user/create",
        "delete": "/user/delete?id=",
        "update": "/user/update?id="
    },
    "usergroup": {
        "getall": "/ug/get-all",
        "create": "/ug/create",
        "delete": "/ug/delete?id=",
        "update": "/ug/update?id="
    },
    "role": {
        "getall": "/role/get-all",
        "create": "/role/create",
        "delete": "/role/delete?id=",
        "update": "/role/update?id="
    },
    "permission": {
        "getall": "/permission/get-all",
        "create": "/permission/create",
        "delete": "/permission/delete?id=",
        "update": "/permission/update?id="
    }
}
*/

module.exports ={
    BASE_PATH: "http://127.0.0.1:9002",
    API_PATH: {
        "user": {
            "getall": "/user/get-all",
            "create": "/user/create",
            "delete": "/user/delete?id=",
            "update": "/user/update?id="
        },
        "usergroup": {
            "getall": "/ug/get-all",
            "create": "/ug/create",
            "delete": "/ug/delete?id=",
            "update": "/ug/update?id="
        },
        "role": {
            "getall": "/role/get-all",
            "create": "/role/create",
            "delete": "/role/delete?id=",
            "update": "/role/update?id="
        },
        "permission": {
            "getall": "/permission/get-all",
            "create": "/permission/create",
            "delete": "/permission/delete?id=",
            "update": "/permission/update?id="
        }
    }
}