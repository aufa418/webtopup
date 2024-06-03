const Midtrans = require('midtrans-client')

const midtransServerKey = process.env.MIDTRANS_SERVER_KEY
const midtransClientKey = process.env.MIDTRANS_CLIENT_KEY

let snap = new Midtrans.Snap({
    isProduction: true,
    serverKey: midtransServerKey,
    clientKey: midtransClientKey
})

const getPaymentToken = async (req, res) => {
    const { id, price, name, quantity } = req.body;
    if (!id || !price || !name || !quantity) return res.status(404).json({
        message: 'Data diperlukan'
    })

    const parameter = {
        item_details: {
            id: id.toString(),
            name,
            price,
            quantity
        },
        transaction_details: {
            order_id: `order-${Date.now()}-${id}-${quantity * price}`,
            gross_amount: price * quantity
        }
    }
    const token = await snap.createTransactionToken(parameter)

    return res.json({ token })
}

module.exports = { getPaymentToken }

