import { rotaWebhook } from '..';
import { config } from '../config/config';
import { Product } from '../interface/produto.interface';

export async function Payment(item: Product): Promise<string> {

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.MercadoPago.token}`
        },
        body: JSON.stringify({
            items: [
                {
                    id: item.id,
                    title: item.name,
                    description: item.description,
                    quantity: 1,
                    currency_id: 'BRL',
                    unit_price: item.price,
                },
            ]
        })
    }).then(res => res.json());

    if(!response.init_point) throw response;

    return response.init_point;
}