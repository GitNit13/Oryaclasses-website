export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed"
        });
    }

    try {

        const data = req.body;

        console.log(data);

        return res.status(200).json({
            success: true,
            message: "Backend working successfully!"
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

}
