import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import styles from './exportarExamenes.module.css';


function ExportarExamenesPDF({ targetId, fileName = "examenes.pdf", buttonText = "Descargar PDF", className }) {

    const exportarPDF = async () => {
        const element = document.getElementById(targetId);
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save(fileName);
    };

    return (
        <button className={styles.pdfButton} onClick={exportarPDF}>
            {buttonText}
        </button>
    );
}

export default ExportarExamenesPDF;
