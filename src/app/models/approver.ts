export class Approver{
    id:number;
    appFirstName:string;
    appLastName:string;
    constructor(id:number,appFirstName:string,appLastName:string){
        this.id=id;
        this.appFirstName=appFirstName;
        this.appLastName=appLastName;
    }
}