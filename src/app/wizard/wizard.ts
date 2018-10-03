export class Wizard {
  step:number;
  totalStep:number;
  loginName:string;
  password:string;
  dbAddress:string;
  dbUSer:string;
  dbPassword:string;
  dbName:string;
  emailDomain:string;
  emailUser:string;
  emailPassword:string;
  baseMailFolder:string;
  runasuser:string;
  sudoPassword:string;
  selfsign:any;
  
  constructor() {
    this.step=1;
    this.totalStep=4;
  }
}