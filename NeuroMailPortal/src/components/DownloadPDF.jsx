import jsPDF from "jspdf";
import { Download } from "../Icons";
import { useAuth } from "../AuthContext";
import ReactHtmlParser from "html-react-parser";
import ReactDOMServer from "react-dom/server";

const DownloadPDF = ({ details, setIsOpen }) => {
  const { emailData } = useAuth();

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(false);
          generatePDF(details, emailData);
        }}
        className="flex whitespace-nowrap gap-3 cursor-pointer items-center"
      >
        <Download className={"w-5 h-5"} />
        <span className="ml-[6px]">Download message</span>
      </button>
    </>
  );
};

export default DownloadPDF;

const generatePDF = (details, emailData) => {
  const doc = new jsPDF();

  // Add title
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Email Details", 10, 10);

  // Add spacing
  let y = 20;

  // Add From
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.text("From:", 10, y);
  doc.setFont("Helvetica", "normal");
  doc.text(
    details.recipients.some((recip) => recip?.recipient_type === "from")
      ? details.recipients.find((recip) => recip?.recipient_type === "from")
          ?.email
      : emailData?.email,
    30,
    y
  );
  y += 10;

  // Add To
  doc.setFont("Helvetica", "bold");
  doc.text("To:", 10, y);
  doc.setFont("Helvetica", "normal");
  if (details.recipients.length > 0) {
    details.recipients
      ?.filter((recip) => recip?.recipient_type === "to")
      .forEach((recip, index) => {
        doc.text(recip?.email || "No Email Provided", 30, y);
        y += 10;
      });
  } else {
    doc.text("No recipients available", 30, y);
    y += 10;
  }

  // Add Subject
  doc.setFont("Helvetica", "bold");
  doc.text("Subject:", 10, y);
  doc.setFont("Helvetica", "normal");
  doc.text(details.subject || "No Subject Provided", 30, y);
  y += 10;

  const generatePlainText = (htmlContent) => {
    const staticHtml = ReactDOMServer.renderToStaticMarkup(htmlContent);
    const plainText = staticHtml.replace(/<[^>]+>/g, "");
    return plainText;
  };

  doc.setFont("Helvetica", "bold");
  doc.text("Body:", 10, y);
  doc.setFont("Helvetica", "normal");

  const parsedHtml = ReactHtmlParser(
    details?.body || "No message to display. Keep shining!"
  );
  const plainText = generatePlainText(parsedHtml);

  const splitText = doc.splitTextToSize(plainText, 170);
  doc.text(splitText, 30, y + 10);
  y += splitText.length * 10;

  // Save PDF
  doc.save("email-details.pdf");
};
