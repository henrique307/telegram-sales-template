import { Markup, Telegraf } from 'telegraf';
import { produtos } from './temp/temp.storage'
import { sendCatalog } from './utils/sendCatalog';
import { Produto } from './interface/produto.interface';
import { config } from './config/config';
import express from 'express'
// import { PaymentListner } from './api/webhook';

const bot = new Telegraf('6541010593:AAEP1NHhycyDEMzGTuEm3HwjUAZjm2qfWqQ');

bot.start((ctx) => {
  ctx.reply('Olá! Seja Bem-vindo! Digite /catalogo para ver a nossa lista de packs disponíveis.');
});

bot.command('catalogo', async (ctx) => {
  await sendCatalog(ctx);

  await ctx.reply(`Qual produto você deseja?`, Markup.inlineKeyboard(
    produtos.map(produto => {
      return Markup.button.callback(produto.nome, `resposta_${produto.nome}`)
    })
  ))

  for (let produto of produtos) {
    bot.action(`resposta_${produto.nome}`, async (ctx) => {
      ctx.answerCbQuery();

      await ctx.reply(`Você selecionou o ${produto.nome}, Acesse este link para realisar o pagamento: ${produto.linkPagamento}`, {
        parse_mode: "Markdown"
      })

      const app = express();

      app.post('/pagamentoAprovado', (req, res) => {
        console.log("Pagamento feito com sucesso!");

        ctx.reply(`Pagamento realizado com sucesso! Aqui está o link do grupo: ${produto.linkGrupo}`)

        servidor.close();
      })

      app.post('/pagamentoRecusado', (req, res) => {
        console.log("pagamento recusado!");

        ctx.reply(`Seu pagamento foi recusado! Por favor tente novamente.`)

        servidor.close();
      })

      const servidor = app.listen(config.application.PORT, () => console.log("Esperando pagamento"))
    });
  }

});

bot.launch().then(() => console.log('Bot está online.'));