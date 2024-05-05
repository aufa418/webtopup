import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getProduct = async (req, res) => {
    const data = await prisma.product.findMany()
    return res.json(200, {
        message: 'Success get Data',
        data
    })
}

export const getDataByProductGame = async (req, res) => {
    const data = await prisma.product.findMany({
        where: {
            game: req.params.game
        }
    })

    return res.json(200, {
        message: 'Success get data',
        data
    })
}

export const getDataByProductId = async (req, res) => {
    try {
        const data = await prisma.product.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!data) {
            return res.status(404).json({
                message: 'Data produk tidak ditemukan'
            });
        }

        return res.status(200).json({
            message: 'Berhasil mendapatkan data',
            data
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
}

export const createProduct = async (req, res) => {
    const { name, price, game } = req.body;

    if (!name || !price || !game) {
        return res.status(400).json({
            message: 'Bad Request, pastikan semua field terisi'
        });
    }

    try {
        const data = await prisma.product.create({
            data: {
                name, price, game
            }
        });

        return res.status(201).json({
            message: 'Success create data',
            data
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

export const updateProduct = async (req, res) => {
    const { name, price, game } = req.body
    const { id } = req.params

    const data = await prisma.product.update({
        where: {
            id: id
        },
        data: {
            name, price, game
        }
    })

    return res.json(200, {
        message: 'Success update data',
        data
    })
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    const data = await prisma.product.delete({
        where: {
            id: id
        }
    })

    return res.json(200, {
        message: 'Success delete data',
        data
    })
}
