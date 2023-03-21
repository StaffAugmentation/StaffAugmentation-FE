export class Company{
    idCompany: number;
    companyName: string;
    bankAccount?: string;
    isDeleted: boolean;
    isEveris: boolean;
    cmpVatlegalEntity?: string;
    cmpBicsw?: string;
    cmpVatRate?: 0;
    idApproverCmp?: 0;
    cmpEmail?: string
    constructor(idCompany: number,
        companyName: string,
        bankAccount: string,
        isDeleted: boolean,
        isEveris: boolean,
        cmpVatlegalEntity: string,
        cmpBicsw: string,
        cmpVatRate: 0,
        idApproverCmp: 0,
        cmpEmail: string){

            this.idCompany=idCompany,
            this.companyName=companyName,
            this.bankAccount=bankAccount,
            this.isDeleted=isDeleted,
            this.isEveris=isEveris,
            this.cmpVatlegalEntity=cmpVatlegalEntity,
            this.cmpBicsw=cmpBicsw,
            this.cmpVatRate=cmpVatRate,
            this.idApproverCmp=idApproverCmp,
            this.cmpEmail=cmpEmail
        }
}
