// Model de manutenção
var manutencaoModel = require("../models/manutencaoModel");

// Busca KPIs gerais do usuário
function buscarKpis(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        // Envia o id para o Model buscar no banco e retorna a promessa pro front-end
        manutencaoModel.buscarKpis(idUsuario)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado[0]);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os KPIs: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

// Busca custo mensal (gráfico de barras)
function buscarCustoMensal(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        // Envia o id para o Model buscar no banco e retorna a promessa pro front-end
        manutencaoModel.buscarCustoMensal(idUsuario)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado.");
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar o custo mensal: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

// Busca distribuição de tipos (gráfico de rosca)
function buscarDistribuicao(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        // Envia o id para o Model buscar no banco e retorna a promessa pro front-end
        manutencaoModel.buscarDistribuicao(idUsuario)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado.");
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar a distribuição: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

// Busca histórico das últimas 5 manutenções
function buscarUltimas(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        // Envia o id para o Model buscar no banco e retorna a promessa pro front-end
        manutencaoModel.buscarUltimas(idUsuario)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado.");
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar as últimas manutenções: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

// Inserindo as manuntenções no banco de dados
function inserir(req, res) {
    // Crie uma variável que vá recuperar os valores para serem inseridos no BD
    var idUsuario = req.params.idUsuario;
    var data_servico = req.body.dataServer;
    var quilometragem = req.body.quilometragemServer;
    var valor = req.body.valorServer;
    var descricao = req.body.descricaoServer;
    var fk_veiculo = req.body.fkVeiculoServer;
    var fk_tipo = req.body.fkTipoServer;

    // Faça as validações dos valores
    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else if (data_servico == undefined) {
        res.status(400).send("Data de serviço está undefined!");
    } else if (quilometragem == undefined) {
        res.status(400).send("Quilometragem está undefined!");
    } else if (valor == undefined) {
        res.status(400).send("Valor está undefined!");
    } else if (fk_veiculo == undefined) {
        res.status(400).send("Veiculo está undefined!");
    } else if (fk_tipo == undefined) {
        res.status(400).send("Tipo de manuntenção está undefined!");
    } else {



        // Passe os valores como parâmetro e vá para o arquivo manutencaoModel.js
        manutencaoModel.inserir(data_servico, quilometragem, valor, descricao, fk_veiculo, fk_tipo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro da manutenção! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function inserirVeiculo(req, res) {
    // Crie uma variável que vá recuperar os valores para serem inseridos no BD
    var idUsuario = req.params.idUsuario;
    var marca = req.body.marcaServer;
    var modelo = req.body.modeloServer;
    var ano = req.body.anoServer;
    var placa = req.body.placaServer;


    // Faça as validações dos valores
    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else if (marca == undefined) {
        res.status(400).send("Marca do veiculo está undefined!");
    } else if (modelo == undefined) {
        res.status(400).send("modelo está undefined!");
    } else if (ano == undefined) {
        res.status(400).send("ano está undefined!");
    } else if (placa == undefined) {
        res.status(400).send("placa está undefined!");
    } else {



        // Passe os valores como parâmetro e vá para o arquivo manutencaoModel.js
        manutencaoModel.inserirVeiculo(marca, modelo, ano, placa, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro da manutenção! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


//Buscando os veiculos no banco de dados
function buscarVeiculo(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        // Envia o id para o Model buscar no banco e retorna a promessa pro front-end
        manutencaoModel.buscarVeiculo(idUsuario)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado.");
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar seus veiculos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarKpis,
    buscarCustoMensal,
    buscarDistribuicao,
    buscarUltimas,
    inserir,
    inserirVeiculo,
    buscarVeiculo
};
