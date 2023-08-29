export class User {
    constructor(name, email, pass, avatar, code, admin=false){
this.username = name;
this.email = email;
this.password =pass;
this.avatar = avatar;
this.code = code;
this.admin = admin;
    }
}