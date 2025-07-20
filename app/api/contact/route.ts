import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 })
    }

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Resend's default sender
      to: [process.env.CONTACT_EMAIL || "your-email@example.com"],
      subject: `New Portfolio Contact: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6, #10b981); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; text-align: center;">New Portfolio Contact</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e40af; margin-top: 0;">Contact Details</h2>
              <p style="margin: 10px 0;"><strong style="color: #374151;">Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong style="color: #374151;">Email:</strong> <a href="mailto:${email}" style="color: #3b82f6;">${email}</a></p>
              <p style="margin: 10px 0;"><strong style="color: #374151;">Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #059669; margin-top: 0;">Message</h2>
              <div style="background: #f0f9ff; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0; line-height: 1.6; color: #374151;">${message.replace(/\n/g, "<br>")}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:${email}" style="background: linear-gradient(135deg, #3b82f6, #10b981); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">Reply to ${name}</a>
            </div>
          </div>
        </div>
      `,
      text: `
New Portfolio Contact

Name: ${name}
Email: ${email}
Submitted: ${new Date().toLocaleString()}

Message:
${message}
      `,
    })

    // Also send a confirmation email to the person who contacted you
    await resend.emails.send({
      from: "Aditya Ravi <onboarding@resend.dev>",
      to: [email],
      subject: "Thanks for reaching out! - Aditya Ravi",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6, #10b981); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; text-align: center;">Thanks for reaching out!</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="margin: 0 0 15px 0; color: #374151;">Hi <strong>${name}</strong>,</p>
              
              <p style="margin: 15px 0; color: #374151; line-height: 1.6;">
                Thank you for contacting me through my portfolio website! I've received your message and will get back to you as soon as possible.
              </p>
              
              <div style="background: #f0f9ff; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                <p style="margin: 0; color: #374151;"><strong>Your message:</strong></p>
                <p style="margin: 10px 0 0 0; color: #6b7280; font-style: italic;">"${message}"</p>
              </div>
              
              <p style="margin: 15px 0; color: #374151; line-height: 1.6;">
                I typically respond within 24-48 hours. In the meantime, feel free to check out my projects on 
                <a href="https://github.com/adityaravi" style="color: #3b82f6;">GitHub</a> or connect with me on 
                <a href="https://linkedin.com/in/adityaravi" style="color: #3b82f6;">LinkedIn</a>.
              </p>
              
              <p style="margin: 15px 0 0 0; color: #374151;">
                Best regards,<br>
                <strong style="color: #1e40af;">Aditya Ravi</strong><br>
                <span style="color: #6b7280;">AI & Data Science Student</span>
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
Hi ${name},

Thank you for contacting me through my portfolio website! I've received your message and will get back to you as soon as possible.

Your message: "${message}"

I typically respond within 24-48 hours. In the meantime, feel free to check out my projects on GitHub or connect with me on LinkedIn.

Best regards,
Aditya Ravi
AI & Data Science Student
      `,
    })

    console.log("✅ Email sent successfully:", emailData)

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    })
  } catch (error) {
    console.error("❌ Contact form error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again or email me directly.",
      },
      { status: 500 },
    )
  }
}
