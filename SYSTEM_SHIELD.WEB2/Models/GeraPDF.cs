using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;

namespace SYSTEM_SHIELD.WEB2.Models
{
    public class GeraPDF
    {
        public void Gerador()
        {
            using (var fileStream = new System.IO.FileStream(@"C:\Users\paulo\Downloads\PDFs\RelatorioShield.pdf", System.IO.FileMode.Create, System.IO.FileAccess.Write, System.IO.FileShare.None))
            {
                var document = new iTextSharp.text.Document();
                var pdfWriter = iTextSharp.text.pdf.PdfWriter.GetInstance(document, fileStream);
                document.Open();
                iTextSharp.text.FontFactory.RegisterDirectory("C:\\WINDOWS\\Fonts");
                var font = iTextSharp.text.FontFactory.GetFont("Calibri", 14);

                // Textos.
                var paragraph = new iTextSharp.text.Paragraph("Aqui temos um parágrafo alinhado à esquerda.", font);
                paragraph.Alignment = iTextSharp.text.Element.ALIGN_LEFT;
                document.Add(paragraph);

                paragraph = new iTextSharp.text.Paragraph("Aqui temos um parágrafo centralizado.", font);
                paragraph.Alignment = iTextSharp.text.Element.ALIGN_CENTER;
                document.Add(paragraph);

                paragraph = new iTextSharp.text.Paragraph("Aqui temos um parágrafo alinhado à direita.", font);
                paragraph.Alignment = iTextSharp.text.Element.ALIGN_RIGHT;
                document.Add(paragraph);

                paragraph = new iTextSharp.text.Paragraph("E, finalmente, aqui temos um parágrafo justificado. Aqui precisamos de mais texto para ver se o texto está realmente sendo justificado! Confira as outras categorias do meu site para artigos relacionados a outras tecnologias de desenvolvimento de software!", font);
                paragraph.Alignment = iTextSharp.text.Element.ALIGN_JUSTIFIED;
                document.Add(paragraph);

                // Figuras geométricas.
                var contentByte = pdfWriter.DirectContent;
                contentByte.Rectangle(100, 530, 180, 110);
                contentByte.Stroke();
                contentByte.Circle(400, 580, 50);
                contentByte.Stroke();

                // Imagem.
                //var image = iTextSharp.text.Image.GetInstance("penguins.jpg");
                //image.ScaleToFit(400, 300);
                //image.SetAbsolutePosition(80, 200);
                //contentByte.AddImage(image);

                document.Close();
                //System.Diagnostics.Process.Start("output.pdf");
            }


        }
    }
}
