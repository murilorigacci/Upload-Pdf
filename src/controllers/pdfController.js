import AlunoModel from '../models/alunoModel.js';
import { gerarPdfAluno, gerarPdfTodos } from '../utils/pdfHelper.js';


export const relatorioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const aluno = await AlunoModel.buscarPorId(parseInt(id));

        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }

        res.json({ data: aluno });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar aluno.' });
    }
};
