//This function holds the basic information about the user account
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
accounts["admin@csu.fullerton.edu"] = "Placeholder for person obj"

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
//this function will eventually add more but for now it just asks about the valid email
// function ask_info() {
//     var temp_email = prompt("Please Enter a valid email: ")
// }

//this function will verify the domain of an email address
function verify_domain(email) {
    email = String(email)
    copy_domain = false
    temp_domain = ""
    for (let i = 0; i < email.length; i++) {
        //goes until it finds the @ symbol this determines what the email domain is
        if ("@" == email[i]) {
            copy_domain = true
        }
        //when it finds the @, it should the rest of the email string to the temp_domain
        if (copy_domain) {
            temp_domain = temp_domain + email[i]
        }
    }
    //it now compares the domain to the correct domain @csu.fullerton.edu
    if (temp_domain == "@csu.fullerton.edu") {
        return true
    }
    //if it did not match then it should return false
    return false
}

//test passes the check for email domain
//var temp_string = "userinfo@csu.fullerton.edu"
//console.log(verify_domain(temp_string))
//our verify domain function works as intended

