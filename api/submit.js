export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  try {

    const d = req.body;

    let message = "";

    // ===========================
    // PARENT FORM
    // ===========================
    if (d.form === "Parent Registration") {

      message =
`📚 NEW PARENT REGISTRATION

👤 Parent Name
${d.parent_name}

📞 Phone
${d.parent_phone}

👦 Child
${d.child_name}

🎓 Grade
${d.child_grade}

🏫 Board
${d.board}

📖 Subjects
${d.subjects}

🏙 City
${d.city}

🏠 Address
${d.address}

🖥 Teaching Mode
${d.teaching_mode}

⏰ Preferred Timing
${d.preferred_timing}

📝 Special Requirements
${d.special_requirements || "None"}
`;

    }

    // ===========================
    // TEACHER FORM
    // ===========================
    else {

      message =
`👨‍🏫 NEW TEACHER APPLICATION

👤 Name
${d.teacher_name}

📞 Phone
${d.teacher_phone}

📧 Email
${d.teacher_email}

🎓 Qualification
${d.qualification}

📖 Subjects
${d.subjects}

🏫 Grades
${d.grades}

💼 Experience
${d.experience}

🏙 City
${d.city}

🖥 Teaching Mode
${d.teaching_mode}

📍 Area
${d.area}

💰 Expected Fee
${d.expected_fee}

📝 About
${d.about}
`;

    }

    const telegram = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text: message
        })
      }
    );

    const result = await telegram.json();

    if (!result.ok) {
      throw new Error(result.description);
    }

    return res.status(200).json({
      success: true
    });

  }
  catch(err){

    console.error(err);

    return res.status(500).json({
      success:false,
      message:err.message
    });

  }

}
