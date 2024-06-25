import { Context } from "telegraf";
import { products } from "../temp/temp.storage";

export async function sendCatalog(ctx: Context) {
    // Lógica para enviar o catálogo de produtos
    ctx.reply('Catálogo de Produtos:');

    for(let product in products) {
        const photo = { source: products[product].image };
        const caption = `Nome: ${products[product].name}\nDescrição: ${products[product].description}\nPreço: ${formatPrice(products[product].price)}\n\n`;

        await ctx.replyWithPhoto( photo , { caption } );
    }

}

function formatPrice(preco: number) {
    return `R$ ${preco.toFixed(2)}`.replace(".", ",")
}