import jwt from "jsonwebtoken";

const jwtAuthMiddleware = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: "Not Authrized Login Again" })
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = token_decode.id
        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default jwtAuthMiddleware;

