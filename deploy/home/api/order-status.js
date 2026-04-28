module.exports = async (req, res) => {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { orderId } = req.query;

    if (!orderId) {
      return res.status(400).json({ success: false, message: 'Missing orderId' });
    }

    const CF_APP_ID = process.env.CASHFREE_APP_ID;
    const CF_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
    const CF_ENV = process.env.CASHFREE_ENV || 'production';

    const CF_API_BASE = CF_ENV === 'production'
      ? 'https://api.cashfree.com/pg'
      : 'https://sandbox.cashfree.com/pg';

    const CF_API_VERSION = '2025-01-01';

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
};
