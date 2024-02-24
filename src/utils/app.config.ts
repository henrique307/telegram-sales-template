import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors';
import { Context } from "telegraf";
import { Produto } from "../interface/produto.interface";
import { produtos } from "../temp/temp.storage";

export function appConfig(app: Application, ctx: Context, produto: Produto) {
    app.use(
        cors(),
        express.json()
    )

    app.post('/pagamentoAprovado', checaProduto, (req, res) => {

        if(!res.locals.produto) {
            ctx.reply("Houve um erro ao ientificar o produto no banco de dados.")
            res.status(404).send("ERRO")
            return
        }

        res.send("Pagamento feito com sucesso!");

        ctx.reply(`Pagamento realizado com sucesso! Aqui está o produto: ${res.locals.produto.linkGrupo}`)

    })

    app.post('/pagamentoRecusado', (req, res) => {

        res.send("pagamento recusado!");

        ctx.reply(`Seu pagamento foi recusado! Por favor tente novamente.`);

    })

}

function checaProduto(req: Request, res: Response, next: NextFunction) {
    const produto = produtos.find(produto => produto.nome === req.body.prod_name)

    res.locals.produto = produto

    next();
}