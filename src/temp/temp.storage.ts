import { Produto } from "../interface/produto.interface";

export const produtos: Produto[] = [
  {
    nome: 'Produto 1',
    descricao: 'Descrição do produto 1 ',
    preco: 'R$14.90',
    imagem: `${__dirname}/../assets/vip1.jpg`,
    linkPagamento: "https://pepper.com.br/checkout/index.html?p=100009&o=116454",
    linkGrupo: "https://aqui_fica_o_link_pro_seuGP1.com",
  },
  {
    nome: 'Produto 2',
    descricao: 'Descrição do produto 2',
    preco: 'R$29.90',
    imagem: `${__dirname}/../assets/vip2.jpg`,
    linkPagamento: "https://pepper.com.br/checkout/index.html?p=100248&o=116761",
    linkGrupo: "https://aqui_fica_o_link_pro_seuGP2.com",
  },
  {
    nome: 'Produto 3',
    descricao: 'Descrição do produto 3',
    preco: 'R$79.90',
    imagem: `${__dirname}/../assets/vip3.jpg`,
    linkPagamento: "https://pepper.com.br/checkout/index.html?p=100350&o=116890",
    linkGrupo: "https://aqui_fica_o_link_pro_seuGP3.com",
  },
];