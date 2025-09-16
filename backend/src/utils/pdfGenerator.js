const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function generateInvoice(order) {
    // charger le template
    const templatePath = path.join(__dirname, "../templates/invoiceTemplate.html");
    let html = fs.readFileSync(templatePath, "utf-8");

    // construire les lignes des items
    const itemsRows = order.items.map(item => `
          <tr>
              <td>${item.name}</td>
              <td><img src="${item.image || ""}" alt="${item.name}" width="50"/></td>
              <td>${item.quantity}</td>
              <td>${item.price.toFixed(2)} DA</td>
              <td>${(item.price * item.quantity).toFixed(2)} DA</td>
                  </tr>
        `).join("");

    // remplacer les placeholders dans le template
    html = html
        .replace("{{orderId}}", order.id)
        .replace("{{userName}}", order.email || "Client")
        .replace("{{date}}", new Date(order.created_at).toLocaleDateString())
        .replace("{{itemsRows}}", itemsRows)
        .replace("{{total}}", order.total.toFixed(2));

    // générer le PDF avec puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // sauvgarder le PDF 
    const pdfPath = path.join(__dirname, `../invoices/invoice_${order.id}.pdf`);
    await page.pdf({ path: pdfPath, format: 'A4' });

    await browser.close();
    return pdfPath;
}
module.exports = {
    generateInvoice
};
