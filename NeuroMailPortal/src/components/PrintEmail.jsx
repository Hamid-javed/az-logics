import React, { useRef } from "react";
import ReactDOMServer from "react-dom/server";
import ReactHtmlParser from "html-react-parser";
import { Print } from "../Icons";

const PrintEmail = ({ details,setIsOpen }) => {
  const iframeRef = useRef(null);

  const handlePrint = () => {
    // Create an iframe element (hidden)
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    // Write email content to the iframe
    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write("<html><head><title>Email Print</title><style>...</style></head><body>");
    
    // Insert email content
    iframeDoc.write(`
      <div>
        <div class="email-header">
          ${
            details.recipients?.find(
              (recip) => recip?.recipient_type === "from"
            )
              ? `<p><strong>From:</strong> ${
                  details.recipients.find(
                    (recip) => recip?.recipient_type === "from"
                  ).email
                }</p>`
              : ""
          }
          ${
            details.recipients?.some((recip) => recip?.recipient_type === "to")
              ? `<p><strong>To:</strong> ${details.recipients
                  .filter((recip) => recip.recipient_type === "to")
                  .map((r) => r.email)
                  .join(", ")}</p>`
              : ""
          }
          ${
            details.recipients?.some((recip) => recip?.recipient_type === "cc")
              ? `<p><strong>CC:</strong> ${details.recipients
                  .filter((recip) => recip.recipient_type === "cc")
                  .map((r) => r.email)
                  .join(", ")}</p>`
              : ""
          }
          ${
            details.subject
              ? `<p><strong>Subject:</strong> ${details.subject}</p>`
              : ""
          }
        </div>
        <div class="email-body">
          ${ReactDOMServer.renderToStaticMarkup(ReactHtmlParser(details.body))}
        </div>
        <div class="email-footer">
          <p>This email was printed from the NeuroMail Print System.</p>
        </div>
      </div>
    `);

    iframeDoc.write("</body></html>");
    iframeDoc.close();

    // Trigger the print dialog
    iframe.contentWindow.print();

    // Cleanup by removing the iframe after printing
    iframe.onload = () => {
      document.body.removeChild(iframe);
    };
  };

  return (
    <div>
      <button
        onClick={()=>{setIsOpen(false);handlePrint();}}
        className="flex whitespace-nowrap gap-3 items-center"
      >
        <Print className={"w-6 h-6"} />
        <span className="ml-[2px]">Print</span>
      </button>
    </div>
  );
};

export default PrintEmail;

