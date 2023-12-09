import { Context } from "telegraf";
import { produtos } from "../temp/temp.storage";

export async function sendCatalog(ctx: Context) {
    // Lógica para enviar o catálogo de produtos
    ctx.reply('Catálogo de Produtos:');

    for(let produto in produtos) {
        const photo = { source: produtos[produto].imagem };
        const caption = `Nome: ${produtos[produto].nome}\nDescrição: ${produtos[produto].descricao}\nPreço: ${produtos[produto].preco}\n\n`;

        await ctx.replyWithPhoto( photo , { caption } );
    }

}
