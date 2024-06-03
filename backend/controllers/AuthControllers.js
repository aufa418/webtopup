const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function loginUser(req, res) {
    const { email, password } = req.body;
    const userLogin = prisma.adminAccount.findUnique({
        where: {
            email,
            password
        }
    });

    if (!userLogin) return res.status(401).json({ message: 'Invalid Data' });

    try {
        const payload = { email, password };
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

        const tokenAccess = jwt.sign(payload, accessTokenSecret, {
            expiresIn: '15s'
        });
        const tokenRefresh = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: '1d'
        });

        const maxAge = 60 * 60 * 24 * 100;
        const cookie = res.cookie('refresh_token', tokenRefresh, {
            httpOnly: true,
            maxAge
        });

        await prisma.adminAccount.update({
            where: {
                email
            },
            data: {
                refresh_token: tokenRefresh
            }
        });

        return res.status(200).json({
            message: 'Success Login',
            access_token: tokenAccess
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

async function logoutAccount(req, res) {
    const refreshTokenCookie = req.cookies.refresh_token;
    if (!refreshTokenCookie) return res.status(204).json({ message: 'No Cookie' });

    const adminAccount = prisma.adminAccount.findFirst({
        where: {
            refresh_token: refreshTokenCookie
        }
    });
    if (!adminAccount) return res.status(204).json({ message: 'No Data' });

    await prisma.adminAccount.update({
        where: {
            id: adminAccount.id
        },
        data: {
            refresh_token: null
        }
    });

    res.clearCookie('refresh_token');

    return res.status(200).json({ message: 'Logout Success' });
}

function refreshToken(req, res) {
    try {
        const refreshTokenCookie = req.cookies.refresh_token;
        const adminData = prisma.adminAccount.findFirst({
            where: {
                refresh_token: refreshTokenCookie
            }
        });
        const refreshToken = process.env.REFRESH_TOKEN_SECRET;
        const accessToken = process.env.ACCESS_TOKEN_SECRET;

        if (!refreshTokenCookie) return res.status(401).json({ message: 'Cookie not Found' });
        if (!adminData) return res.status(403).json({ message: 'Data Tidak ditemukan' });

        jwt.verify(refreshTokenCookie, refreshToken, (err, encoded) => {
            if (err) return res.status(403).json({ message: err.message });

            const payload = {
                email: adminData.email,
                password: adminData.password
            };

            const newAccessToken = jwt.sign(payload, accessToken, {
                expiresIn: '15s'
            });

            return res.status(200).json({ access_token: newAccessToken });
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { loginUser, logoutAccount, refreshToken };
