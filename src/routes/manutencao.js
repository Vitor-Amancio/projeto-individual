var express = require("express");
var router = express.Router();

// importando o controller que tem a logica e as funcoes para essas rotas
var manutencaoController = require("../controllers/manutencaoController.js");

// get eh usado quando queremos buscar alguma informacao do banco de dados (ex: kpis)
// o :idUsuario significa que o link vai receber um parametro variavel na url
router.get("/kpis/:idUsuario", function (req, res) {
    manutencaoController.buscarKpis(req, res);
});

// Busca custo mensal (gráfico de barras)
router.get("/custo-mensal/:idUsuario", function (req, res) {
    manutencaoController.buscarCustoMensal(req, res);
});

// Busca distribuição de tipos (gráfico de rosca)
router.get("/buscar-distribuicao/:idUsuario", function (req, res) {
    manutencaoController.buscarDistribuicao(req, res);
});

// Busca histórico das últimas 5 manutenções
router.get("/buscar-ultimas/:idUsuario", function (req, res) {
    manutencaoController.buscarUltimas(req, res);
});

// post eh usado quando queremos enviar e salvar novos dados no banco (ex: um cadastro)
router.post("/inserir/:idUsuario", function (req, res) {
    manutencaoController.inserir(req, res);
});

// Inserir veiculos do usuario
router.post("/inserirVeiculo/:idUsuario", function (req, res) {
    manutencaoController.inserirVeiculo(req, res);
});

//Buscando os veiculos que um usuario tem cadastrado
router.get("/buscar-veiculo/:idUsuario", function (req, res) {
    manutencaoController.buscarVeiculo(req, res);
});

module.exports = router;