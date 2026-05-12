var express = require("express");
var router = express.Router();


// Importando o controller que tratará as requisições das rotas abaixo
var manutencaoController = require("../controllers/manutencaoController.js");

// Rota GET para buscar os KPIs Recebe o ID do usuário como parâmetro na URL
router.get("/kpis/:idUsuario", function (req, res) {
    manutencaoController.buscarKpis(req, res);
});

router.get("/custo-mensal/:idUsuario", function (req, res) {
    manutencaoController.buscarCustoMensal(req, res);
});

router.get("/buscar-distribuicao/:idUsuario", function (req, res) {
    manutencaoController.buscarDistribuicao(req, res);
});

router.get("/buscar-ultimas/:idUsuario", function (req, res) {
    manutencaoController.buscarUltimas(req, res);
});

module.exports = router;