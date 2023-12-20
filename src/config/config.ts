import DotenvFlow from "dotenv-flow"

DotenvFlow.config();

export const config = {
    application: {
        PORT: process.env.PORT || 3000,
    },
    ambiente: process.argv[2]
}

console.log(process.argv)