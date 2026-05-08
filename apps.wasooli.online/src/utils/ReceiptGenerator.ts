// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import { Transaction } from '../apis/Apis';

// Helper to format currency
const formatCurrency = (amount: string | number) => {
  return typeof amount === 'string' ? parseFloat(amount).toFixed(2) : amount.toFixed(2);
};

// Helper for date formatting
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const getMonthFromDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long' });
};

const generateReceiptHtml = (transaction: Transaction, userProfile: any) => {
  const memberName = transaction.merchant_membership?.nickname || transaction.merchant_membership?.member?.user?.first_name || '';
  const memberCode = transaction.merchant_membership?.member?.code || '';
  const accountId = transaction.merchant_membership?.account || '';
  
  // Format creator name
  const createdBy = transaction.metadata?.created_by
    ? transaction.metadata.created_by
        .split(" ")
        .map((word) =>
          word.length > 1
            ? word.charAt(0).toUpperCase() + word.slice(1)
            : word.toUpperCase()
        )
        .join(" ")
    : "";

  const date = formatDate(transaction.created_at);
  
  // Calculate total payable (sum of invoice amounts plus remaining balance if any logic requires it, but for now using the total of invoices)
  // Based on the React component: const totalPayable = ... (passed as prop)
  // We'll calculate it from invoices if not provided directly
  const totalPayable = transaction.invoices?.reduce((acc, inv) => acc + parseFloat(inv.total_amount || '0'), 0).toFixed(2);
  
const invoicesHtml = transaction.invoices?.length > 0 
    ? `
      <div class="dashed-hr"></div>
      <div>
        ${transaction.invoices.map((invoice: any) => `
            <div class="flex justify-between text-sm my-1">
              <span>
                ${invoice?.name ? invoice.name : `Fee of ${getMonthFromDate(invoice.created_at)}`}
              </span>
              <span>${formatCurrency(invoice.total_amount)}</span>
            </div>
        `).join('')}
      </div>
    `
    : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Courier New', Courier, monospace;
      padding: 20px;
      color: black;
      margin: 0;
    }
    .container {
      width: 100%;
      max-width: 320px; /* w-80 equivalent */
      margin: 24px auto; /* mt-6 mx-auto */
      padding: 24px 0; /* py-6 */
    }
    .text-center { text-align: center; }
    .text-lg { font-size: 18px; }
    .text-sm { font-size: 14px; }
    .text-xs { font-size: 12px; }
    .font-bold { font-weight: bold; }
    .font-mono { font-family: 'Courier New', Courier, monospace; }
    .font-sans { font-family: sans-serif; }
    
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .justify-between { justify-content: space-between; }
    .items-center { align-items: center; }
    .gap-2 { gap: 8px; }
    
    .my-1 { margin-top: 4px; margin-bottom: 4px; }
    .my-2 { margin-top: 8px; margin-bottom: 8px; }
    .mb-3 { margin-bottom: 12px; }
    
    .dashed-hr { 
      border-top: 1px dashed black; 
      margin: 10px 0; 
      height: 0;
    }
    
    /* Reset defaults */
    p { margin: 0; }
  </style>
</head>
<body>
    <div class="container font-mono text-black">
      <h2 class="text-center text-lg font-bold" style="margin: 0 0 10px 0;">
        ${userProfile?.merchant_name || 'Merchant Name'}
      </h2>
      
      <div class="dashed-hr"></div>
      
      <div class="flex flex-col justify-between text-sm my-1">
        <div class="flex justify-between">
          <span class="flex gap-2">
            <p>Name:</p>
            <p>${memberName}</p>
          </span>
          <span class="flex gap-2">
            <p>Code:</p>
            <p>${memberCode}</p>
          </span>
        </div>
        
        <div class="flex justify-between items-center my-1">
          <p>One Bill ID:</p>
          <p>${accountId}</p>
        </div>
        
        <div class="flex justify-between my-1">
          <p>Cashier:</p>
          <p>${createdBy}</p>
        </div>
        
        <div class="flex justify-between my-1">
          <p>Date:</p>
          <p>${date}</p>
        </div>
      </div>

      ${invoicesHtml}
      
      <div class="dashed-hr"></div>
      
      <div class="flex justify-between font-bold my-1">
        <span>Payable:</span>
        <span>${totalPayable}</span>
      </div>
      
      <div class="flex justify-between text-sm my-1">
        <span>Balance:</span>
        <span>${formatCurrency(transaction.balance)}</span>
      </div>
      
      <div class="flex justify-between font-bold my-1">
        <span>Total Paid:</span>
        <span>${formatCurrency(transaction.value)}</span>
      </div>
      
      <div class="dashed-hr"></div>

      <p class="text-xs text-center font-sans mb-3">
        Powered by wasooli.online
      </p>
    </div>
</body>
</html>
  `;
};

export const printReceipt = async (transaction: Transaction, userProfile: any) => {
  try {
    const html = generateReceiptHtml(transaction, userProfile);
    
    // Print directly using RNPrint which supports HTML
    await RNPrint.print({ 
      html,
      jobName: `receipt_${transaction.id}`
    });

  } catch (error) {
    console.error('Error printing receipt:', error);
  }
};
