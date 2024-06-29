export class OrderDto {
  constructor(
    private printString: string,
    private soundFileString: string | null,
    private vibrateFlag: boolean,
    private orderDateTime: Date,
  ){}
}