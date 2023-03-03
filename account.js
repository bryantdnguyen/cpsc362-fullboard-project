
function Person(email, password) {
    this.email = email
    this.password = password
    this.fn = ""
    this.ln = ""

    this.info = function() {
        return "user info:" + this.fn + " " + this.ln + " " + this.email + " " + this.password;
    }
    //these functions all change the objects information
    this.changeFN = function(first_name) {
        this.fn = first_name
    }
    this.changeLN = function(last_name) {
        this.ln = last_name
    }
    this.changeEM = function(email) {
        this.email = email
    }
    this.changePW = function(password) {
        this.password = password
    }

}

current_user = "this should hold the object, so it doesn't have to go back through the user information"
//accounts will store the objects with key-value pairs, the key will be their email
const accounts = {}
account["admin@csu.fullerton.edu"] = "Placeholder for person obj"

const admin = new Person("admin@csu.fullerton.edu", "csufadmin")

console.log(admin)
console.log(accounts["admin@csu.fullerton.edu"])
console.log(admin.info())

function test_password(password_input, user) {
    if (password_input == user.password) {
        return true
    } else {
        return false
    }
}

function ask_info() {
    var temp_email = prompt("Please Enter a valid email: ")
    return temp_email
}

var temp_string = "userinfo@csu.fullerton.edu"

console.log(temp_string.length)
console.log(temp_string[1])

function verify_email() {
    for (let i = 0; i < temp_string.length; i++) {
        if ("@" != temp_string[i]) {
            continue
        } else {
            temp_domain = temp_domain + temp_string[i] 
        }
    }
    
    if (temp_domain != "@csu.fullerton.edu") return false
}

if (!verify_email()) {
    "Please enter a valid csuf email"
}