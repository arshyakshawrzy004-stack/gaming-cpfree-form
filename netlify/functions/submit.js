export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { email, name, website } = JSON.parse(event.body);

    // ضد اسپم
    if (website && website.trim() !== "") {
      return { statusCode: 200, body: "ok" };
    }

    if (!email || !name) {
      return { statusCode: 400, body: "Missing fields" };
    }

    const BOT_TOKEN = "8719633460:AAEKuvB957QtV6U2t8K7WxXyQoiaq86dTpw";
    const CHAT_ID_YOU = "7652970667";
    const CHAT_ID_GROUP = "-1003835244147";

    const text =
`📥 New Submission

👤 Name: ${name}
📧 Email: ${email}
🕒 ${new Date().toLocaleString()}`;

    const sendMessage = async (chatId) => {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text
        })
      });
    };

    await sendMessage(CHAT_ID_YOU);
    await sendMessage(CHAT_ID_GROUP);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" })
    };
  }
}
