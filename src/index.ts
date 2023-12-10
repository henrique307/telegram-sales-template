import { Markup, Telegraf } from 'telegraf';
import { produtos } from './temp/temp.storage'
import { sendCatalog } from './utils/sendCatalog';
import express from 'express'
import { config } from './config/config';

const bot = new Telegraf('6541010593:AAEP1NHhycyDEMzGTuEm3HwjUAZjm2qfWqQ');
const app = express();

const rotaWebhook = `/webhook-${Math.floor(Math.random() * 10000)}`;
const webhookURL = `https://many-packs-e61cfca5ea3b.herokuapp.com${rotaWebhook}`

bot.telegram.setWebhook(webhookURL)

bot.start((ctx) => {
  ctx.reply('Olá! Seja Bem-vindo! Digite /catalogo para ver a nossa lista de packs disponíveis.');
});

bot.command('catalogo', async (ctx) => {
  app.use(bot.webhookCallback(rotaWebhook))

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
      
      let pagamentoResolvido = false
      
      app.post('/pagamentoAprovado', (req, res) => {
        bot.handleUpdate(req.body, res)
        
        res.send("Pagamento feito com sucesso!");

        ctx.reply(`Pagamento realizado com sucesso! Aqui está o link do grupo: ${produto.linkGrupo}`)

        pagamentoResolvido = true

      })

      app.post('/pagamentoRecusado', (req, res) => {
        bot.handleUpdate(req.body, res)
        
        res.send("pagamento recusado!");
        
        ctx.reply(`Seu pagamento foi recusado! Por favor tente novamente.`)
        
        pagamentoResolvido = true
        
      })

      setTimeout(() => {
        if(!pagamentoResolvido) {
          ctx.reply(`Tempo limite para compra do pacote ${produto.nome} atingido, por favor tente novamente.`)
        }
      }, 180000);

    });
  }

});

bot.launch().then(() => {
  console.info("app rodando =)")
})

app.listen(config.application.PORT, () => {console.log("WebHookOuvindo")})