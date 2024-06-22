import { OrderDto } from "./orderDto";

class OrderManager {
  private orderList : OrderDto[] = [];
  private _totalOrderCount = 0;
  enqueue(orderDto: OrderDto): void{
    this.orderList.push(orderDto);
    this._totalOrderCount++;
    console.info('orderCount : ' + this.orderList.length);
  }
  dequeue() : {} | undefined {
    return this.orderList.shift();
  }
  remainingOrder(): number {
    return this.orderList.length;
  }
  totalOrderCount(): number {
    return this._totalOrderCount;
  }
}
export const orderManager = new OrderManager();