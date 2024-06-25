import { config } from "../config/config";
import { products } from "../temp/temp.storage";

export async function getPayment(paymentID: string) {
    return await fetch(`https://api.mercadopago.com/v1/payments/${paymentID}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.MercadoPago.token}`
        }
    }).then(res => res.json());
}

export function getProduct(productID: string) {
    return products
        .find(product => {return product.id === productID});
}