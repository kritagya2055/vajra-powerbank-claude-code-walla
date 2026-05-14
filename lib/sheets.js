import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!email || !key) return null;
  return new JWT({ email, key, scopes: SCOPES });
}

export async function appendOrderToSheet(order) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const auth = getClient();
  if (!sheetId || !auth) {
    console.warn("[sheets] Google Sheets not configured — skipping");
    return false;
  }

  const doc = new GoogleSpreadsheet(sheetId, auth);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  const headers = [
    "Order ID",
    "Timestamp",
    "Full Name",
    "Phone",
    "Email",
    "Location",
    "Product",
    "Quantity",
    "Unit Price",
    "Total",
    "Payment Method",
  ];

  try {
    await sheet.loadHeaderRow();
  } catch {
    await sheet.setHeaderRow(headers);
  }

  await sheet.addRow({
    "Order ID": order.orderId,
    Timestamp: order.timestamp,
    "Full Name": order.fullName,
    Phone: order.phone,
    Email: order.email || "",
    Location: order.location,
    Product: order.product,
    Quantity: order.quantity,
    "Unit Price": order.unitPrice,
    Total: order.total,
    "Payment Method": order.paymentMethod,
  });

  return true;
}
