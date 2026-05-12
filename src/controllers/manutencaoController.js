// Importa o arquivo de banco de dados que executa as instruções SQL
var manutencaoModel = require("../models/manutencaoModel");

// Controlador para buscar as KPIs
function buscarKpis(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        // Chama a função correspondente no Model e lida com a promessa
        manutencaoModel.buscarKpis(idUsuario)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado[0]); // Retorna apenas o primeiro objeto KPIs
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

function buscarCustoMensal(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        req.status(400).send("Seu idUsuario está undefined!")
    } else {
        manutencaoModel.buscarCustoMensal(idUsuario)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado.")
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("houve um erro ao buscar os KPIs: ", erro, sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarDistribuicao(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        req.status(400).send("seu idUsuario esta undefined")
    } else {
        manutencaoModel.buscarDistribuicao(idUsuario)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("nenhum resultado encontrado")
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("houve um erro ao buscar os KPIs: ", erro, sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarUltimas(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        req.status(400).send("Seu idUsuario está undefined.")
    } else {
        manutencaoModel.buscarUltimas(idUsuario)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado")
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os KPIs: ", erro, sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarKpis,
    buscarCustoMensal,
    buscarDistribuicao,
    buscarUltimas
};
