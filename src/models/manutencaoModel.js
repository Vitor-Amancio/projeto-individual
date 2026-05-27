// Importa a conexão com o banco de dados configurada na pasta database
var database = require("../database/config");

// Função para buscar os indicadores principais da tela inicial
function buscarKpis(idUsuario) {
    // Retorna veículos ativos, soma total de custos, média de gasto e contagem total
    var instrucaoSql = `
        SELECT 
            (SELECT COUNT(*) FROM veiculo WHERE fk_usuario = ${idUsuario}) AS veiculosAtivos,
            SUM(m.valor) AS custoTotal,
            COUNT(m.id) AS totalManutencoes
        FROM manutencao m
        JOIN veiculo v ON m.fk_veiculo = v.id
        WHERE v.fk_usuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Função para alimentar o Gráfico de Barras com o custo por mês
function buscarCustoMensal(idUsuario) {
    var instrucaoSql = `
        SELECT 
            MONTH(m.data_servico) AS mes,
            SUM(m.valor) AS custo
        FROM manutencao m
        JOIN veiculo v ON m.fk_veiculo = v.id
        WHERE v.fk_usuario = ${idUsuario} AND YEAR(m.data_servico) = YEAR(CURRENT_DATE())
        GROUP BY MONTH(m.data_servico)
        ORDER BY mes;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Função para alimentar o Gráfico de Rosca com a contagem de tipos de manutenção
function buscarDistribuicao(idUsuario) {
    var instrucaoSql = `
        SELECT 
            t.nome AS tipo,
            COUNT(m.id) AS quantidade,
            SUM(m.valor) AS valor_total
        FROM manutencao m
        JOIN veiculo v ON m.fk_veiculo = v.id
        JOIN tipo_manutencao t ON m.fk_tipo = t.id
        WHERE v.fk_usuario = ${idUsuario}
        GROUP BY t.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Função para preencher a tabela de Histórico Recente ultimas 5 manutenções
function buscarUltimas(idUsuario) {
    var instrucaoSql = `
        SELECT 
            DATE_FORMAT(m.data_servico, '%d/%m/%Y') AS dataFormatada,
            CONCAT(v.marca, ' ', v.modelo) AS veiculo,
            t.nome AS tipo,
            m.valor,
            m.descricao
        FROM manutencao m
        JOIN veiculo v ON m.fk_veiculo = v.id
        JOIN tipo_manutencao t ON m.fk_tipo = t.id
        WHERE v.fk_usuario = ${idUsuario}
        ORDER BY m.data_servico DESC
        LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
// Funcao para insrir as manutenções dos veiculos
function inserir(data_servico, quilometragem, valor, descricao, fk_veiculo, fk_tipo) {
    var instrucaoSql = `
    INSERT INTO manutencao (data_servico, quilometragem, valor, descricao, fk_veiculo, fk_tipo) 
    VALUES ('${data_servico}', ${quilometragem}, ${valor}, '${descricao}', ${fk_veiculo}, ${fk_tipo});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//Função para inserir os veiculo
function inserirVeiculo(marca, modelo, ano, placa, fk_usuario) {
    var instrucaoSql = `
    INSERT INTO veiculo (marca, modelo, ano, placa, fk_usuario) VALUES ('${marca}', '${modelo}', ${ano}, '${placa}', ${fk_usuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

//funcao para buscar os veiculos
function buscarVeiculo(idUsuario) {
    var instrucaoSql = `
    SELECT id, marca, modelo FROM veiculo WHERE fk_usuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Exportando as funções para serem utilizadas pelo controller
module.exports = {
    buscarKpis,
    buscarCustoMensal,
    buscarDistribuicao,
    buscarUltimas,
    inserir,
    inserirVeiculo,
    buscarVeiculo
};
