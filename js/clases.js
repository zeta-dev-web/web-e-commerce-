export class User {
    constructor(name, email, pass, avatar, code, carshop="", admin=false){
this.username = name;
this.email = email;
this.pass =pass;
this.avatar = avatar;
this.code = code;
this.carshop = carshop;
this.admin = admin;
    }
}