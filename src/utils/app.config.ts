import express, { Application } from "express";
import cors from 'cors';
import { Context } from "telegraf";
import { Produto } from "../interface/produto.interface";

export function appConfig(app: Application, ctx: Context, produto: Produto) {
    app.use(
        cors(),
        express.json()
    )

    app.post('/pagamentoAprovado', (req, res) => {

        res.send("Pagamento feito com sucesso!");

        ctx.reply(`Pagamento realizado com sucesso! Aqui está o link do grupo: ${produto.linkGrupo}`)

    })

    app.post('/pagamentoRecusado', (req, res) => {

        res.send("pagamento recusado!");

        ctx.reply(`Seu pagamento foi recusado! Por favor tente novamente.`)

    })

}