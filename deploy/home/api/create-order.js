const crypto = require('crypto');

module.exports = async (req, res) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { customerName, customerEmail, customerPhone, amount } = req.body;

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone are required.'
      });
    }

    const CF_APP_ID = process.env.CASHFREE_APP_ID;
    const CF_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
    const CF_ENV = process.env.CASHFREE_ENV || 'production';

    const CF_API_BASE = CF_ENV === 'production'
      ? 'https://api.cashfree.com/pg'
      : 'https://sandbox.cashfree.com/pg';

    const CF_API_VERSION = '2025-01-01';

    // Generate a unique order ID
    const orderId = 'NL_' + crypto.randomUUID().replace(/-/g, '').substring(0, 16);
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
        return_url: `https://${req.headers.host}/success.html?order_id={order_id}`
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
};
