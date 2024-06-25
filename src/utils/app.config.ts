import express, { Application } from "express";
import { Context } from "telegraf";
import cors from 'cors';
import { getPayment, getProduct } from "./libs";
import { products } from "../temp/temp.storage";

export function appConfig(app: Application, ctx: Context) {
    app.use(
        cors(),
        express.json(),
    )

    app.post('/', async (req, res) => {
        if (req.body.action === "payment.created") {
            const payment = await getPayment(req.body.data.id);            
            const produto = getProduct(payment.additional_info.items[0].id);

            if (!produto)
                return ctx.reply("Houve um problema processando sua requisição, por favor entre em contato com nosso [suporte](https://wa.me/5521990868835)",{ parse_mode: "Markdown" });

            if (payment.status === "rejected")
                return ctx.reply(`Pagamento recusado.`);

            if (payment.status === "cancelled")
                return ctx.reply(`Pagamento cancelado.`);

            if (payment.status === "approved")
                return ctx.reply(`Pagamento realizado com sucesso! Aqui está o produto: ${produto.content}`);
        }
    })

}