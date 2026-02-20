'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { profileApi } from '../../../lib/api';
import './ProfilePage.css';

const SettingsPage = () => {
  const { user, refreshUser } = useAuth();

  // Profile form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [profileMsg, setProfileMsg] = useState('');
  const [profileError, setProfileError] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  // Populate form from user
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? '');
      setLastName(user.lastName ?? '');
      setPhone(user.phone ?? '');
      setEmailNotifications(user.emailNotifications);
    }
  }, [user]);

  const handleProfileSave = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setProfileMsg('');
    setProfileError('');
    setSavingProfile(true);
    try {
      await profileApi.update({ firstName, lastName, phone, emailNotifications });
      await refreshUser();
      setProfileMsg('Profile updated successfully.');
    } catch (err: unknown) {
      setProfileError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSave = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setPasswordMsg('');
    setPasswordError('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters');
      return;
    }

    setSavingPassword(true);
    try {
      await profileApi.changePassword({ currentPassword, newPassword, confirmPassword });
      setPasswordMsg('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      setPasswordError(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="profile">
      <div className="profile__header">
        <h1 className="profile__title">Account Settings</h1>
        <p className="profile__subtitle">Manage your account settings and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="profile__card">
        <h2 className="profile__card-title">Profile Information</h2>

        <form className="profile__form" onSubmit={handleProfileSave}>
          <div className="profile__form-section">
            <h3 className="profile__form-section-title">Basic Information</h3>

            <div className="profile__form-group">
              <label htmlFor="email" className="profile__label">Email Address</label>
              <input
                id="email"
                type="email"
                value={user?.email ?? ''}
                disabled
                className="profile__input"
              />
              <span className="profile__help-text">Your email address cannot be changed</span>
            </div>

            <div className="profile__form-group">
              <label htmlFor="firstName" className="profile__label">First Name</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your first name"
                className="profile__input"
                disabled={savingProfile}
              />
            </div>

            <div className="profile__form-group">
              <label htmlFor="lastName" className="profile__label">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Your last name"
                className="profile__input"
                disabled={savingProfile}
              />
            </div>

            <div className="profile__form-group">
              <label htmlFor="phone" className="profile__label">Phone</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 8900"
                className="profile__input"
                disabled={savingProfile}
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
              <div
                className={`profile__toggle ${emailNotifications ? 'profile__toggle--active' : ''}`}
                onClick={() => setEmailNotifications((v) => !v)}
                role="switch"
                aria-checked={emailNotifications}
                style={{ cursor: 'pointer' }}
              >
                <div className="profile__toggle-slider"></div>
              </div>
            </div>
          </div>

          {profileMsg && <p style={{ color: '#10b981', marginBottom: '1rem' }}>{profileMsg}</p>}
          {profileError && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{profileError}</p>}

          <div className="profile__actions">
            <button
              type="submit"
              className="profile__button profile__button--primary"
              disabled={savingProfile}
            >
              {savingProfile ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Password Card */}
      <div className="profile__card" style={{ marginTop: '2rem' }}>
        <h2 className="profile__card-title">Change Password</h2>

        <form className="profile__form" onSubmit={handlePasswordSave}>
          <div className="profile__form-section">
            <div className="profile__form-group">
              <label htmlFor="current-password" className="profile__label">Current Password</label>
              <input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="profile__input"
                disabled={savingPassword}
                required
              />
            </div>

            <div className="profile__form-group">
              <label htmlFor="new-password" className="profile__label">New Password</label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="profile__input"
                disabled={savingPassword}
                required
                minLength={8}
              />
            </div>

            <div className="profile__form-group">
              <label htmlFor="confirm-password" className="profile__label">Confirm New Password</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="profile__input"
                disabled={savingPassword}
                required
              />
            </div>
          </div>

          {passwordMsg && <p style={{ color: '#10b981', marginBottom: '1rem' }}>{passwordMsg}</p>}
          {passwordError && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{passwordError}</p>}

          <div className="profile__actions">
            <button
              type="submit"
              className="profile__button profile__button--primary"
              disabled={savingPassword}
            >
              {savingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
