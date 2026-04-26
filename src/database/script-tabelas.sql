CREATE DATABASE autotrack;
USE autotrack;

-- Tabela de Usuários
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(50) NOT NULL
);

-- Tabela de Veículos
CREATE TABLE veiculo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    marca VARCHAR(45) NOT NULL,
    modelo VARCHAR(45) NOT NULL,
    ano INT,
    placa CHAR(7),
    fk_usuario INT NOT NULL,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

-- Tabela de Apoio: Tipos de Manutenção
CREATE TABLE tipo_manutencao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

-- Tabela do Logbook (Histórico de Manutenções)
CREATE TABLE manutencao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data_servico DATE NOT NULL,
    quilometragem INT NOT NULL,
    valor DECIMAL(10,2),
    descricao VARCHAR(255),
    fk_veiculo INT NOT NULL,
    fk_tipo INT NOT NULL,
    FOREIGN KEY (fk_veiculo) REFERENCES veiculo(id),
    FOREIGN KEY (fk_tipo) REFERENCES tipo_manutencao(id)
);

-- Inserindo os tipos de manutenção
INSERT INTO tipo_manutencao (nome) VALUES 
('Preventiva'),
('Corretiva'),
('Upgrade/Performance'),
('Estética');