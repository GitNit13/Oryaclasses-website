export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  try {
    const data = req.body;

    const message = `
📚 NEW FORM SUBMISSION

👤 Name: ${data.name || "N/A"}
📞 Phone: ${data.phone || "N/A"}
📧 Email: ${data.email || "N/A"}

📝 Details:
${JSON.stringify(data, null, 2)}
`;

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text: message,
        }),
      }
    );

    const result = await response.json();

    if (!result.ok) {
      throw new Error(result.description);
    }

    return res.status(200).json({
      success: true,
      message: "Form submitted successfully!",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
