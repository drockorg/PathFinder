const nodemailer = require('nodemailer');
const logger = require('./logger');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendPasswordResetEmail(email, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Reset Your Password - PathFinders',
      html: `
        <h1>Reset Your Password</h1>
        <p>You have requested to reset your password. Click the link below to proceed:</p>
        <a href="${resetUrl}" style="display: inline-block; background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>PathFinders Team</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      logger.info(`Password reset email sent to ${email}`);
    } catch (error) {
      logger.error(`Error sending password reset email to ${email}:`, error);
      throw new Error('Error sending password reset email');
    }
  }

  async sendPasswordChangeNotification(email) {
    const mailOptions = {
      from: `"PathFinders Support" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Password Changed Successfully - PathFinders',
      html: `
        <h1>Password Changed Successfully</h1>
        <p>Your password has been successfully changed.</p>
        <p>If you didn't make this change, please contact our support team immediately.</p>
        <p>Best regards,<br>PathFinders Team</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      logger.info(`Password change notification sent to ${email}`);
    } catch (error) {
      logger.error(`Error sending password change notification to ${email}:`, error);
      // Don't throw here as this is a notification, not a critical operation
    }
  }
}

module.exports = new EmailService();