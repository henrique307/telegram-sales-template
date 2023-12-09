import { Pix } from 'faz-um-pix'

export async function geraPix() {
    const chavePix = '18474094747';
    // return await generatePayload({
    //   pixKey: chavePix,
    //   merchantName: 'Nome do beneficiário',
    //   merchantCity: 'Cidade',
    //   transactionAmount: '10.00',
    //   additionalData: 'Info adicional',
    //   uniquePayment: true,
    // });

    return Pix(chavePix, "Silva da Silva", "Rio", 0.10, "teste")
}