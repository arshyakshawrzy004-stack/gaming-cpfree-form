export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email } = req.body;

  const BOT_TOKEN = "8719633460:AAEKuvB957QtV6U2t8K7WxXyQoiaq86dTpw";
  const CHAT_ID_YOU = "7652970667";
  const CHAT_ID_GROUP = "-1003835244147";

  const text = `
📥 New Submission

👤 Name: ${name}
📧 Email: ${email}
`;

  const sendMessage = async (chatId) => {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
    });
  };

  await sendMessage(CHAT_ID_YOU);
  await sendMessage(CHAT_ID_GROUP);

  return res.status(200).json({ message: "Sent successfully" });
}
