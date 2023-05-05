import { Request, Response } from "express";
import { Folha } from "../models/folha.model";

export class Negocio{
    calcularBruto(valor: number, hora: number):number{
        let bruto = valor * hora;
        return bruto;
    }

    calcularIRRF(valor: number, hora: number):number{
        let bruto = valor * hora;
        if(bruto <= 1903.98){
            let irrf = 0;
            return irrf;
        }
        else if(bruto <= 2826.65){
            let irrf = bruto * 0.075 - 142.80;
            return irrf;
        }
        else if(bruto <= 3751.05){
            let irrf = bruto * 0.15 - 354.80;
            return irrf;
        }
        else if(bruto <= 4664.68){
            let irrf = bruto * 0.225 - 636.13;
            return irrf;
        }
        else{
            let irrf = bruto * 0.275 - 869.36;
            return irrf;
        }
    }

    calcularINSS(valor: number, hora: number):number{
        let bruto = valor * hora;
        if(bruto <= 1693.72){
            let inss = bruto * 0.08;
            return inss;
        }
        else if(bruto <= 2822.90){
            let inss = bruto * 0.09;
            return inss;
        }
        else if(bruto <= 5645.80){
            let inss = bruto * 0.11;
            return inss;
        }
        else{
            let inss = bruto - 621.03;
            return inss;
        }
    }

    calcularFGTS(valor: number, hora: number):number{
        let bruto = valor * hora;
        return bruto * 0.08;
    }

    calcularLiquido(bruto: number, irrf: number, inss: number):number{
        let liquido = bruto - irrf - inss;
        return liquido;
    }
}