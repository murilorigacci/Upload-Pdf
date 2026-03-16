import htmlPdf from 'html-pdf-node';
import fs from 'fs';
import { table } from 'console';

export async function gerarPdfAluno(aluno) {
    let fotoHtml = 'Não tem foto!';

    if (aluno.foto) {
        const base64 = fs.readFileSync(aluno.foto).toString('base64');
        fotoHtml = `<img src="data:image/jpeg;base64, ${base64}" width="120"/>`;

    }

    const html = `
    <html>
        <body>
            <h1>Relatório do aluno</h1>

                <p>Foto: ${fotoHtml}</p>
                <p>Nome: ${aluno.nome}</p>
                <p>Escola: ${aluno.escola || '-'}</p>
                <p>Turma: ${aluno.turma || '-'}</p>
        </body>
    </html>`;
}
return htmlPdf.generatePdf({ content: html }, { format: 'A4' })


export async function gerarPdfTodos(Alunos) {
    const linhas = Alunos
        .map(
             (a) => `
    <tr>
        <td>${a.nome}</td>
        <td>${a.escola || '-'}</td>
        <td>${a.turma || '-'}</td>
        <td>${a.foto || '-'}</td>
    </tr>`,
    )
        .join('');
}

const html = `
<h1 style="text-align: cetnter";> Relatório de Alunos</h1>

    < table border = "1" cellspacing = "0" cellspacing = "0" >
        <tr>
            <th>Nome</th>
            <th>Escola</th>
            <th>Turma</th>
            <th>Foto</th>
        </tr> ${linhas}
    </table >
        <p>Total: ${Alunos.length} alunos</p>
`;
