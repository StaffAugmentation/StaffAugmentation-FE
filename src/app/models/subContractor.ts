import { Approvers } from "./approvers";
import { PaymentTerm } from "./paymentTerm";
import { TypeOfCost } from "./typeOfCost";

export class Subcontractor{
    id: number;
    valueId: string;
    ba?: string;
    bicsw?: string;
    vatRate?: number;
    isOfficial: boolean;
    legalEntityName?: string;
    legalEntityAdress?: string;
    vatNumber?: string;
    idNumber?: string;
    approver?: Approvers;
    paymentTerm?: PaymentTerm;
    typeOfCost?: TypeOfCost
    constructor(id: number,
        valueId: string,
        ba: string,
        bicsw: string,
        vatRate: number,
        isOfficial: boolean,
        legalEntityName: string,
        legalEntityAdress: string,
        vatNumber: string,
        idNumber: string,
        approver?: Approvers,
        paymentTerm?: PaymentTerm,
        typeOfCost?: TypeOfCost){

            this.id=id,
            this.valueId=valueId,
            this.ba=ba,
            this.bicsw=bicsw,
            this.vatRate=vatRate,
            this.isOfficial=isOfficial,
            this.legalEntityName=legalEntityName,
            this.legalEntityAdress=legalEntityAdress,
            this.vatNumber=vatNumber,
            this.idNumber=idNumber,
            this.approver=approver,
            this.paymentTerm=paymentTerm,
            this.typeOfCost=typeOfCost
        }
}
