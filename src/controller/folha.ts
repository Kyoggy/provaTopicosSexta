import { Request, Response } from "express";
import { Folha } from "../models/folha.model";
import { Negocio } from "./negocio";

let folhas: Folha[] = [];
const negocio : Negocio = new Negocio();

export class FolhaController {
    listarFolha(request: Request, response: Response): Response {
      return response.status(200).json({ message: "Folhas cadastradas", dados: folhas });
    }

    buscarFolha(request: Request, response: Response): Response {
        // const nome = request.params.nome;
        const { cpf } = request.params;

        //Laço tradicional - index
        //Foreach
        //Find
        for(let folhaCadastrada of folhas){
            if(folhaCadastrada.cpf == cpf){
                return response.status(200).json(
                    { message: "Folha solicitada", dados : folhaCadastrada }
                );
            }
        }
        return response.status(404).json({message : "Folha não encontrada!"});
    }

    cadastrarFolha(request: Request, response: Response): Response {
        let folha: Folha = new Folha();
        folha.nome = request.body.nome;
        folha.cpf = request.body.cpf;
        folha.horas = request.body.horas;
        folha.valor = request.body.valor;
        folha.mes = request.body.mes;
        folha.ano = request.body.ano;
        folha.bruto = negocio.calcularBruto(folha.valor, folha.horas);
        folha.inss = negocio.calcularINSS(folha.valor, folha.horas);
        folha.irrf = negocio.calcularIRRF(folha.valor, folha.horas);
        folha.fgts = negocio.calcularFGTS(folha.valor, folha.horas);
        folha.liquido = negocio.calcularLiquido(folha.bruto, folha.irrf, folha.inss);
        /*for(let folhaCadastrada of folhas){
            if(folhaCadastrada.cpf == cpf){
            
            }
        }
        */
        folhas.push(folha);
    
        return response
          .status(201)
          .json({ message: "Folha cadastrada!", dados: folha });
    }
}