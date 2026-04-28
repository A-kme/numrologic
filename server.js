require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve all static files (HTML, CSS, JS, images, assets)
app.use(express.static(path.join(__dirname)));

// ─── Cashfree Config ────────────────────────────────────────────
const CF_APP_ID     = process.env.CASHFREE_APP_ID;
const CF_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const CF_ENV        = process.env.CASHFREE_ENV || 'production';

// API base URL
const CF_API_BASE = CF_ENV === 'production'
  ? 'https://api.cashfree.com/pg'
  : 'https://sandbox.cashfree.com/pg';

// API version header
const CF_API_VERSION = '2025-01-01';

console.log(`[Cashfree] Environment: ${CF_ENV}`);
console.log(`[Cashfree] API Base: ${CF_API_BASE}`);

// ─── Create Order Endpoint ──────────────────────────────────────
app.post('/api/create-order', async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, amount } = req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone are required.'
      });
    }

    // Generate a unique order ID
    const orderId = 'NL_' + uuidv4().replace(/-/g, '').substring(0, 16);
    const orderAmount = amount || 497;

    // Build the order payload for Cashfree
    const orderPayload = {
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: 'INR',
      customer_details: {
        customer_id: 'cust_' + Date.now(),
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone
      },
      order_meta: {
        return_url: `https://${req.get('host')}/success.html?order_id={order_id}`
      }
    };

    // Call Cashfree Create Order API
    const response = await fetch(`${CF_API_BASE}/orders`, {
      method: 'POST',
      headers: {
        'x-client-id': CF_APP_ID,
        'x-client-secret': CF_SECRET_KEY,
        'x-api-version': CF_API_VERSION,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderPayload)
    });

    const data = await response.json();

    if (response.ok && data.payment_session_id) {
      console.log(`[Order Created] ${orderId} — ₹${orderAmount} — ${customerName}`);
      return res.status(200).json({
        success: true,
        payment_session_id: data.payment_session_id,
        order_id: data.order_id
      });
    } else {
      console.error('[Cashfree Error]', data);
      return res.status(400).json({
        success: false,
        message: data.message || 'Failed to create order.',
        details: data
      });
    }
  } catch (error) {
    console.error('[Server Error]', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again.'
    });
  }
});

// ─── Webhook Endpoint (for Cashfree payment notifications) ──────
app.post('/api/webhook', (req, res) => {
  console.log('[Webhook Received]', JSON.stringify(req.body, null, 2));
  // In production, verify the webhook signature here
  // and update your database with payment status
  res.status(200).json({ status: 'ok' });
});

// ─── Check Order Status ─────────────────────────────────────────
app.get('/api/order-status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    const response = await fetch(`${CF_API_BASE}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'x-client-id': CF_APP_ID,
        'x-client-secret': CF_SECRET_KEY,
        'x-api-version': CF_API_VERSION
      }
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({
        success: true,
        order_status: data.order_status,
        order_id: data.order_id,
        order_amount: data.order_amount
      });
    } else {
      return res.status(400).json({ success: false, details: data });
    }
  } catch (error) {
    console.error('[Status Check Error]', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// ─── Start Server ───────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✅ NumroLogic server running at http://localhost:${PORT}`);
  console.log(`   Open http://localhost:${PORT}/home.html in your browser\n`);
});
