export class Order {
  constructor(
    public readonly id: string,
    public readonly reference: string,
    public readonly createdAt: Date,
    public readonly fiatAmount: number,
    public readonly fiat: string,
    public readonly currencyId: string,
    public readonly status: string,
    public readonly expirationTime: Date
  ) {}

  isExpired(): boolean {
    return new Date() > this.expirationTime;
  }

  isCompleted(): boolean {
    return this.status === "CO" || this.status === "AC";
  }
}
