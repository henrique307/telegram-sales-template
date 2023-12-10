import { Produto } from "../interface/produto.interface";


export const produtos: Produto[] = [
  {
    nome: 'VIP 1',
    descricao: 'Grupo 1 - 30 vídeos e 40 fotos ',
    preco: 'R$14.90',
    imagem: `${__dirname}/../assets/vip1.jpg`,
    linkPagamento: "https://pepper.com.br/checkout/index.html?p=100009&o=116454",
    linkGrupo: "https://aqui_fica_o_link_pro_seuGP1.com",
    porta: 3000
  },
  {
    nome: 'VIP 2',
    descricao: 'Grupo 2 - 60 vídeos e 80 fotos ',
    preco: 'R$29.90',
    imagem: `${__dirname}/../assets/vip2.jpg`,
    linkPagamento: "https://pepper.com.br/checkout/index.html?p=100251&o=116767",
    linkGrupo: "https://aqui_fica_o_link_pro_seuGP2.com",
    porta: 4000
  },
  {
    nome: 'VIP 3',
    descricao: 'Grupo 3 - 154 vídeos e 495 fotos ',
    preco: 'R$79.90',
    imagem: `${__dirname}/../assets/vip3.jpg`,
    linkPagamento: "https://pepper.com.br/checkout/index.html?p=100248&o=116761",
    linkGrupo: "https://aqui_fica_o_link_pro_seuGP3.com",
    porta: 8080
  },
];