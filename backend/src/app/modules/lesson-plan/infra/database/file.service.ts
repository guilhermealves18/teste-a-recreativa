// src/app/modules/lesson-plan/infra/file.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as mammoth from 'mammoth';
import * as pdfParse from 'pdf-parse';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class FileService {
  async extractTextFromPDF(filePath: string): Promise<string> {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }

  async extractTextFromDocx(filePath: string): Promise<string> {
    const dataBuffer = fs.readFileSync(filePath);
    const result = await mammoth.extractRawText({ buffer: dataBuffer });
    return result.value.replace(/- /g, '-\n').replace(/\n+/g, '\n').trim();
  }

  async generatePDF(
    data: {
      objectives: string[];
      activities: string[];
      evaluation: string[];
      title: string;
    },
    outputPath: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
      });
      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);

      doc
        .fillColor('#1a3c34')
        .fontSize(20)
        .font('Helvetica-Bold')
        .text('Plano de Aula', { align: 'center' });

      doc
        .fillColor('#666')
        .fontSize(12)
        .font('Helvetica')
        .text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, {
          align: 'center',
        });

      doc.moveDown(1);
      doc
        .fillColor('#1a3c34')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text(`Título: ${data.title}`, { align: 'left' });

      doc
        .moveDown(0.5)
        .lineWidth(1)
        .strokeColor('#ccc')
        .moveTo(50, doc.y)
        .lineTo(550, doc.y)
        .stroke();

      doc.moveDown(1);
      doc
        .fillColor('#2e5e54')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('Objetivos:');
      doc.moveDown(0.5);
      data.objectives.forEach((item: string) => {
        doc
          .fillColor('#000')
          .fontSize(12)
          .font('Helvetica')
          .text(`• ${item}`, { indent: 20 });
      });

      doc.moveDown(1);
      doc
        .fillColor('#2e5e54')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('Atividades:');
      doc.moveDown(0.5);
      data.activities.forEach((item: string) => {
        doc
          .fillColor('#000')
          .fontSize(12)
          .font('Helvetica')
          .text(`• ${item}`, { indent: 20 });
      });

      doc.moveDown(1);
      doc
        .fillColor('#2e5e54')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('Avaliação:');
      doc.moveDown(0.5);
      data.evaluation.forEach((item: string) => {
        doc
          .fillColor('#000')
          .fontSize(12)
          .font('Helvetica')
          .text(`• ${item}`, { indent: 20 });
      });

      doc.moveDown(2);
      doc
        .fillColor('#666')
        .fontSize(10)
        .font('Helvetica-Oblique')
        .text(
          'Gerado automaticamente em ' + new Date().toLocaleString('pt-BR'),
          { align: 'center' },
        );

      doc.end();
      stream.on('finish', () => resolve());
      stream.on('error', (err) => reject(err));
    });
  }
}
