export class OrderModel
{
    private customerName: string;
    private mobile: number;
    private orderedItems: string;
    private totalAmount: number;
    private date: Date;
    private status: string;
    
    constructor(customerName: string, mobile: number, orderedItems: string, totalAmount: number,
        date: Date, status: string)
{
    this.customerName = customerName;
    this.mobile = mobile;
    this.orderedItems = orderedItems;
    this.totalAmount = totalAmount;
    this.date = date;
    this.status = status;
}
}