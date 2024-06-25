import DotenvFlow from "dotenv-flow"

DotenvFlow.config();

export const config = {
    application: {
        BOT_TOKEN: process.env.BOT_TOKEN,
        PORT: process.env.PORT || 5500,
    },
    ambiente: process.argv[2] || "dev",
    MercadoPago: {
        token: process.env.MERCADOPAGO_TOKEN
    }
}
