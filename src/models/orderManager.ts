class OrderManager {
  private orderList : {}[] = [];
  enqueue(printString: string, vibrateFlag: boolean): void{
    this.orderList.push({"printString" : printString, "vibrateFlag": vibrateFlag});
    console.info('orderCount : ' + this.orderList.length);
  }
  dequeue() : {} | undefined {
    return this.orderList.shift();
  }
}
export const orderManager = new OrderManager();