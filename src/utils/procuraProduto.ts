import { produtos } from "../temp/temp.storage";

function calcularSimilaridadeJaccard(str1: string, str2: string) {
    const set1 = new Set(str1.toLowerCase());
    const set2 = new Set(str2.toLowerCase());

    const intersecao = new Set([...set1].filter(x => set2.has(x)));
    const uniao = new Set([...set1, ...set2]);

    const similaridade = intersecao.size / uniao.size;
    return similaridade;
}

export function procuraProduto(consulta: string) {
    let resultados: string[] = [];
    const nomes = produtos.map(produto => produto.nome)

    // Calcula a similaridade de Jaccard
    const similaridades = nomes.map(nome => ({
        nome,
        similaridade: calcularSimilaridadeJaccard(nome, consulta),
    }));

    // Ordena por similaridade (do maior para o menor)
    similaridades.sort((a, b) => b.similaridade - a.similaridade);

    // Retorna os resultados ordenados
    resultados = similaridades.map(item => item.nome);

    if (resultados[0] === consulta) {
        return { resultado: produtos.find(produto => produto.nome === resultados[0]), correto: true }
    } else {
        return { resultado: resultados[0], correto: false }
    }
}