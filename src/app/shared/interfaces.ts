export interface FbResponse{
    name: string
}
export interface Product{
    type?: string
    id?: string,
    title?: string,
    photo?: string,
    info?: string,
    price?: number,
    date?: Date,
    qty?:number
}
export interface Order {
  id: string,
  type: string,
  title: string,
  price: number,
  qty: number
}
