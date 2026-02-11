import type { Metadata } from 'next';
import '../ProfilePage.css';

export const metadata: Metadata = {
  title: 'Account Settings',
  description: 'Manage your account settings, password, and preferences.',
};

const SettingsPage = () => {
  return (
    <div className="profile">
      <div className="profile__header">
        <h1 className="profile__title">Account Settings</h1>
        <p className="profile__subtitle">Manage your account settings and preferences</p>
      </div>

      <div className="profile__card">
        <h2 className="profile__card-title">Profile Information</h2>

        <form className="profile__form">
          <div className="profile__form-section">
            <h3 className="profile__form-section-title">Basic Information</h3>

            <div className="profile__form-group">
              <label htmlFor="email" className="profile__label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                defaultValue="user@example.com"
                disabled
                className="profile__input"
              />
              <span className="profile__help-text">
                Your email address cannot be changed
              </span>
            </div>

            <div className="profile__form-group">
              <label htmlFor="username" className="profile__label">
                Username
              </label>
              <input
                id="username"
                type="text"
                defaultValue="GamerPro123"
                className="profile__input"
              />
            </div>
          </div>

          <div className="profile__form-section">
            <h3 className="profile__form-section-title">Change Password</h3>

            <div className="profile__form-group">
              <label htmlFor="current-password" className="profile__label">
                Current Password
              </label>
              <input
                id="current-password"
                type="password"
                placeholder="••••••••"
                className="profile__input"
              />
            </div>

            <div className="profile__form-group">
              <label htmlFor="new-password" className="profile__label">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                placeholder="••••••••"
                className="profile__input"
              />
            </div>

            <div className="profile__form-group">
              <label htmlFor="confirm-password" className="profile__label">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="profile__input"
              />
            </div>
          </div>

          <div className="profile__form-section">
            <h3 className="profile__form-section-title">Preferences</h3>

            <div className="profile__toggle-group">
              <div className="profile__toggle-label-container">
                <span className="profile__toggle-label">Email Notifications</span>
                <span className="profile__toggle-description">
                  Receive email updates about your orders
                </span>
              </div>
              <div className="profile__toggle profile__toggle--active">
                <div className="profile__toggle-slider"></div>
              </div>
            </div>

            <div className="profile__toggle-group">
              <div className="profile__toggle-label-container">
                <span className="profile__toggle-label">Order Updates</span>
                <span className="profile__toggle-description">
                  Get notified when your order status changes
                </span>
              </div>
              <div className="profile__toggle profile__toggle--active">
                <div className="profile__toggle-slider"></div>
              </div>
            </div>
          </div>

          <div className="profile__actions">
            <button type="submit" className="profile__button profile__button--primary">
              Save Changes
            </button>
            <button type="button" className="profile__button profile__button--secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
