export class SubContractor{
    id: number;
    valueId: string;
    subContBa?: string;
    subContBicsw?: string;
    subContVatRate?: number;
    isOfficial: boolean;
    idApproverSub?: number;
    legalEntityName?: string;
    legalEntityAdress?: string;
    vatNumber?: string;
    idNumber?: string;
    idPaymentTerm?: string;
    idTypeOfCost?: string
    constructor(id: number,
        valueId: string,
        subContBa: string,
        subContBicsw: string,
        subContVatRate: number,
        isOfficial: boolean,
        idApproverSub: number,
        legalEntityName: string,
        legalEntityAdress: string,
        vatNumber: string,
        idNumber: string,
        idPaymentTerm: string,
        idTypeOfCost: string){

            this.id=id,
            this.valueId=valueId,
            this.subContBa=subContBa,
            this.subContBicsw=subContBicsw,
            this.subContVatRate=subContVatRate,
            this.isOfficial=isOfficial,
            this.idApproverSub=idApproverSub,
            this.legalEntityName=legalEntityName,
            this.legalEntityAdress=legalEntityAdress,
            this.vatNumber=vatNumber,
            this.idNumber=idNumber,
            this.idPaymentTerm=idPaymentTerm,
            this.idTypeOfCost=idTypeOfCost
        }
}