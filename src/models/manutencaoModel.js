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
    //subquery para visuaizar todos os veiculos inclusive os que não tem manutenção.
    //SUM para somar todos os valores de manutenção.
    //COUNT para contar quantas linhas tem em manutencao.
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
    //MONTH e YEAR foram usado para extrais mes e ano.
    //CURRENT_DATE para retornar a data atual, YEAR(m.data_servico) = YEAR(CURRENT_DATE()) é usado
    //para mostrar os gastos do ano atual
    //GROUP BY MONTH foi usado para é usad para não somar tudo de uma vez, assim semparando em lotes por mes
    // e soma
    //ORDER BY mes traz os dados em ordem cronologica
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
    //Join com veiculos é para garantir que venha so os dados do usuario logado, 
    //o segundo join para trocar os numeros de id de manutencoes por nomes legiveis ex: Estetica.
    //GROUP BY usado para agrupar por categoria de manutencao.
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
        LIMIT 15;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    //DATE_FORMAT para formatar a datada no padrao usado no brasil
    //CONCAT junta as strings de marca e modelo
    //ORDER BY m.data_servico DESC ordenando da manutencao mais recente para a mais antiga
}
// funcao para inserir as manutencoes no banco de dados
// a string sql pega os parametros js e coloca dentro do values
function inserir(data_servico, quilometragem, valor, descricao, fk_veiculo, fk_tipo) {
    var instrucaoSql = `
    INSERT INTO manutencao (data_servico, quilometragem, valor, descricao, fk_veiculo, fk_tipo) 
    VALUES ('${data_servico}', ${quilometragem}, ${valor}, '${descricao}', ${fk_veiculo}, ${fk_tipo});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// funcao para inserir o veiculo
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
