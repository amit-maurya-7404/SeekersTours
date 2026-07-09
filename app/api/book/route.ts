import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      fullName,
      email,
      whatsapp,
      travelers,
      travelDate,
      notes,
      tripTitle,
      tripPrice,
      bookingOption,
      tripId
    } = body

    const totalCost = Math.round(Number(tripPrice) * Number(travelers))

    // Clean WhatsApp number for reliable wa.me links
    let cleanWhatsapp = whatsapp.replace(/\D/g, '')
    if (cleanWhatsapp.length === 11 && cleanWhatsapp.startsWith('0')) {
      cleanWhatsapp = cleanWhatsapp.substring(1)
    }
    if (cleanWhatsapp.length === 10) {
      cleanWhatsapp = '91' + cleanWhatsapp
    }

    // Construct the email templates
    const userEmailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background-color: #ea580c; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px;">SEEKERS TOURS</h1>
        </div>
        <div style="padding: 24px; color: #334155; line-height: 1.6;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Booking Request Received!</h2>
          <p>Hi <strong>${fullName}</strong>,</p>
          <p>Thank you for submitting your booking request for <strong>${tripTitle}</strong>. We are excited to have you join our adventure community!</p>
          
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #ea580c; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #ea580c; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Trip Details</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Adventure:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${tripTitle}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Package Option:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${bookingOption || 'Standard'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Batch Date:</td>
                <td style="padding: 6px 0; color: #ea580c; font-weight: bold;">${travelDate}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Explorers Count:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${travelers}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Total Investment:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">₹${totalCost}</td>
              </tr>
            </table>
          </div>
          
          <p><strong>What happens next?</strong></p>
          <p>Our tour coordinator will reach out to you on your WhatsApp number (<strong>${whatsapp}</strong>) within the next 2 hours to confirm slot availability, discuss payment methods, and finalize your booking.</p>
          
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 12px; color: #64748b; text-align: center; margin-bottom: 0;">
            Need immediate help? Click to chat with us on <a href="https://wa.me/918369218944" style="color: #ea580c; text-decoration: none; font-weight: 600;">WhatsApp Support</a>.
          </p>
        </div>
      </div>
    `

    const ownerEmailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background-color: #0f172a; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: bold; letter-spacing: 1px;">🚨 New Booking Notification</h1>
        </div>
        <div style="padding: 24px; color: #334155; line-height: 1.6;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 18px; font-weight: bold; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px;">Lead Details</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 40%;">Customer Name:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Email Address:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold;"><a href="mailto:${email}" style="color: #ea580c; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 500;">WhatsApp Number:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold;"><a href="https://wa.me/${cleanWhatsapp}" style="color: #ea580c; text-decoration: none;">${whatsapp}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Adventure Trip:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${tripTitle} (ID: ${tripId})</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Package Option:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${bookingOption || 'Standard'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Batch Date:</td>
              <td style="padding: 8px 0; color: #ea580c; font-weight: bold;">${travelDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Explorers Count:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${travelers} Pax</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Total Revenue:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">₹${totalCost}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 500; vertical-align: top;">Special Notes:</td>
              <td style="padding: 8px 0; color: #334155; font-style: italic;">${notes || 'None provided'}</td>
            </tr>
          </table>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://wa.me/${cleanWhatsapp}" style="background-color: #25d366; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              Reach out on WhatsApp
            </a>
          </div>
        </div>
      </div>
    `

    // Extract SMTP details
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = Number(process.env.SMTP_PORT) || 587
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const emailFrom = process.env.EMAIL_FROM || 'bookings@seekerstours.com'
    const ownerEmail = process.env.EMAIL_TO_OWNER || 'owner@seekerstours.com'

    const emailConfigured = smtpHost && smtpUser && smtpPass

    if (emailConfigured) {
      // Transporter config
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })

      // Send to Customer
      await transporter.sendMail({
        from: `"Seekers Tours" <${emailFrom}>`,
        to: email,
        subject: `Booking Requested: ${tripTitle} - Seekers Tours`,
        html: userEmailHtml,
      })

      // Send to Owner
      await transporter.sendMail({
        from: `"Booking Desk" <${emailFrom}>`,
        to: ownerEmail,
        subject: `🚨 New Booking Request: ${tripTitle} from ${fullName}`,
        html: ownerEmailHtml,
      })

      return NextResponse.json({
        success: true,
        message: 'Emails dispatched successfully.',
        emailConfigured: true
      })
    } else {
      // Fallback Developer Logging
      console.log('--------------------------------------------------')
      console.log('🔔 [MOCK EMAIL ENGINE] SMTP details not configured.')
      console.log(`✉️ Mock email dispatched to USER: ${email}`)
      console.log(`✉️ Mock email dispatched to OWNER: ${ownerEmail}`)
      console.log('--------------------------------------------------')
      
      return NextResponse.json({
        success: true,
        message: 'Mock emails logged successfully (SMTP unconfigured).',
        emailConfigured: false,
        mockLogs: {
          userEmail: { to: email, html: userEmailHtml },
          ownerEmail: { to: ownerEmail, html: ownerEmailHtml }
        }
      })
    }
  } catch (error: any) {
    console.error('Error handling booking request:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
