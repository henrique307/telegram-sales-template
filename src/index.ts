import { Markup, Telegraf } from 'telegraf';
import { products } from './temp/temp.storage'
import { sendCatalog } from './utils/sendCatalog';
import express from 'express'
import { config } from './config/config';
import { appConfig } from './utils/app.config';
import { Payment } from './apis/MercadoPago';

if(!config.application.BOT_TOKEN) throw new Error("É necessário informar o Token do bot");

const bot = new Telegraf(config.application.BOT_TOKEN);
const app = express();

export const rotaWebhook = `/webhook-${Math.floor(Math.random() * 10000)}`;

bot.hears(/^[^\/].*/, (ctx) => {
  ctx.reply('Olá! Digite /catalogo para ver a nossa lista de produtos disponíveis.');
});

bot.start((ctx) => {
  ctx.reply('Olá! Seja Bem-vindo! Digite /catalogo para ver a nossa lista de produtos disponíveis.');
});

bot.command('catalogo', async (ctx) => {
  app.use(bot.webhookCallback(rotaWebhook))

  await sendCatalog(ctx);

  await ctx.reply(`Qual produto você deseja?`, Markup.inlineKeyboard(
    products.map(product => {
      return Markup.button.callback(product.name, `resposta_${product.name}`)
    })
  ))

  for (const product of products) {
    bot.action(`resposta_${product.name}`, async (ctx) => {

      ctx.answerCbQuery();
      ctx.reply("Gerando link de pagamento...");

      const linkPagamento = await Payment(product).catch(e => console.log(e));

      console.log(linkPagamento)

      await ctx.reply(`Você selecionou o ${product.name}, Realize o pagamento [aqui](${linkPagamento})`, {
        parse_mode: "Markdown"
      }).catch(e => console.log(e));

      appConfig(app, ctx);

    });
  }

});

bot.launch().then(() => {
  console.info("app rodando =)")
})

app.listen(config.application.PORT, () => { console.log(`webhook ouvindo na porta ${config.application.PORT} na rota ${rotaWebhook}`) })