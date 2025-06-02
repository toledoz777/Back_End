create database cento_treinamento;

use cento_treinamento;

create table sessoes (
id int auto_increment primary key,
aluno varchar(100),
personal varchar (100),
tipo_treino varchar(100),
data date,
horario time,
observacoes text
);
