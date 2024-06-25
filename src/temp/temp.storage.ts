import { randomUUID } from "crypto";
import { Product } from "../interface/produto.interface";

export const products: Product[] = [
  {
    id: randomUUID(),
    name: 'Produto 1',
    description: 'Descrição do produto 1 ',
    price: 14.90,
    image: `${__dirname}/../assets/vip1.jpg`,
    content: "https://aqui_fica_o_link_pro_seu_Produto1.com",
  },
  {
    id: randomUUID(),
    name: 'Produto 2',
    description: 'Descrição do produto 2',
    price: 29.90,
    image: `${__dirname}/../assets/vip2.jpg`,
    content: "https://aqui_fica_o_link_pro_seu_Produto2.com",
  },
  {
    id: randomUUID(),
    name: 'Produto 3',
    description: 'Descrição do produto 3',
    price: 79.90,
    image: `${__dirname}/../assets/vip3.jpg`,
    content: "https://aqui_fica_o_link_pro_seu_Produto3.com",
  },
];