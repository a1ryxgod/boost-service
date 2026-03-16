import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../orders/orders.entity';
import { UserEntity } from '../users.entity';

/**
 * Notifications Service
 *
 * This service handles email notifications for order status changes.
 * For production, integrate with:
 * - SendGrid: npm install @sendgrid/mail
 * - NodeMailer: npm install nodemailer
 * - AWS SES: npm install @aws-sdk/client-ses
 */
@Injectable()
export class NotificationsService {
  /**
   * Send order created notification
   */
  async sendOrderCreatedEmail(order: OrderEntity, user: UserEntity): Promise<void> {
    console.log(`[EMAIL] Order created notification to ${user.email}`);
    console.log(`Order ID: ${order.id}, Price: ${order.price}`);

    // TODO: Implement actual email sending
    /**
     * Example with SendGrid:
     *
     * import sgMail from '@sendgrid/mail';
     * sgMail.setApiKey(process.env.SENDGRID_API_KEY);
     *
     * const msg = {
     *   to: user.email,
     *   from: 'noreply@boostservice.com',
     *   subject: 'Order Created Successfully',
     *   html: `
     *     <h1>Order Created</h1>
     *     <p>Your order has been created successfully.</p>
     *     <p>Order ID: ${order.id}</p>
     *     <p>Price: $${order.price}</p>
     *   `,
     * };
     *
     * await sgMail.send(msg);
     */
  }

  /**
   * Send order status updated notification
   */
  async sendOrderStatusUpdatedEmail(
    order: OrderEntity,
    user: UserEntity,
    newStatus: string,
  ): Promise<void> {
    console.log(`[EMAIL] Order status updated notification to ${user.email}`);
    console.log(`Order ID: ${order.id}, New Status: ${newStatus}`);

    // TODO: Implement actual email sending
  }

  /**
   * Send order assigned notification (to customer and booster)
   */
  async sendOrderAssignedEmail(
    order: OrderEntity,
    customer: UserEntity,
    booster: UserEntity,
  ): Promise<void> {
    console.log(`[EMAIL] Order assigned notification`);
    console.log(`Customer: ${customer.email}, Booster: ${booster.email}`);

    // Send to customer
    // TODO: Implement actual email sending

    // Send to booster
    // TODO: Implement actual email sending
  }

  /**
   * Send order completed notification
   */
  async sendOrderCompletedEmail(order: OrderEntity, user: UserEntity): Promise<void> {
    console.log(`[EMAIL] Order completed notification to ${user.email}`);
    console.log(`Order ID: ${order.id}`);

    // TODO: Implement actual email sending
  }

  /**
   * Send payment confirmation email
   */
  async sendPaymentConfirmationEmail(
    order: OrderEntity,
    user: UserEntity,
    amount: number,
  ): Promise<void> {
    console.log(`[EMAIL] Payment confirmation to ${user.email}`);
    console.log(`Amount: $${amount}`);

    // TODO: Implement actual email sending
  }

  /**
   * Send refund notification email
   */
  async sendRefundNotificationEmail(
    order: OrderEntity,
    user: UserEntity,
    amount: number,
  ): Promise<void> {
    console.log(`[EMAIL] Refund notification to ${user.email}`);
    console.log(`Amount: $${amount}`);

    // TODO: Implement actual email sending
  }

  /**
   * Send email verification link
   */
  async sendVerificationEmail(user: UserEntity, token: string): Promise<void> {
    const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;
    console.log(`[EMAIL] Email verification to ${user.email}`);
    console.log(`[EMAIL] Verify URL: ${verifyUrl}`);

    await this.sendEmail(
      user.email,
      'Verify your FANCY BOOST email',
      `<h1>Welcome to FANCY BOOST!</h1>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verifyUrl}" style="background:#7B61FF;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">Verify Email</a>
      <p>This link expires in 24 hours.</p>
      <p>If you did not create an account, you can safely ignore this email.</p>`,
    );
  }

  /**
   * Send password reset link
   */
  async sendPasswordResetEmail(user: UserEntity, token: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    console.log(`[EMAIL] Password reset to ${user.email}`);
    console.log(`[EMAIL] Reset URL: ${resetUrl}`);

    await this.sendEmail(
      user.email,
      'Reset your FANCY BOOST password',
      `<h1>Password Reset Request</h1>
      <p>You requested a password reset. Click the link below to set a new password:</p>
      <a href="${resetUrl}" style="background:#7B61FF;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">Reset Password</a>
      <p>This link expires in 1 hour.</p>
      <p>If you did not request a password reset, you can safely ignore this email.</p>`,
    );
  }

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(user: UserEntity): Promise<void> {
    console.log(`[EMAIL] Welcome email to ${user.email}`);

    // TODO: Implement actual email sending
  }

  /**
   * Send password changed notification
   */
  async sendPasswordChangedEmail(user: UserEntity): Promise<void> {
    console.log(`[EMAIL] Password changed notification to ${user.email}`);

    // TODO: Implement actual email sending
  }

  /**
   * Send review notification to booster
   */
  async sendReviewNotificationEmail(
    booster: UserEntity,
    rating: number,
    comment?: string,
  ): Promise<void> {
    console.log(`[EMAIL] New review notification to ${booster.email}`);
    console.log(`Rating: ${rating}/5`);

    // TODO: Implement actual email sending
  }

  /**
   * Send generic email
   */
  async sendEmail(
    to: string,
    subject: string,
    html: string,
  ): Promise<void> {
    console.log(`[EMAIL] Sending email to ${to}`);
    console.log(`Subject: ${subject}`);

    // TODO: Implement actual email sending
  }
}
