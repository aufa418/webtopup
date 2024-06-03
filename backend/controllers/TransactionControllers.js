const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllTransaction = async (req, res) => {
    const data = await prisma.transaction.findMany({
        include: {
            product: true
        }
    });
    return res.json(200, {
        message: 'Success get All Data',
        data
    });
};

const storeTransaction = async (req, res) => {
    try {
        const { productId, quantity, gameId } = req.body;
        const newTransaction = await prisma.transaction.create({
            data: {
                productId,
                quantity,
                gameId
            },
            include: {
                product: true
            }
        });

        return res.status(201).json({
            message: 'Success create data',
            data: newTransaction
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTransaction = await prisma.transaction.delete({
            where: {
                id
            }
        });

        return res.status(200).json({
            message: 'Success Delete Data',
            data: deleteTransaction
        });
    } catch (error) {
        return res.status(404).json({
            message: 'ID Not Found'
        });
    }
};

module.exports = { getAllTransaction, storeTransaction, deleteTransaction };
