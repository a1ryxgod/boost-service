'use client';

import { useAuth } from '../../context/AuthContext';
import { DashboardSidebar } from './DashboardSidebar';
import { BoosterSidebar } from './BoosterSidebar';
import { UserRole } from '../../types';

export function SmartSidebar() {
  const { user } = useAuth();

  if (user?.role === UserRole.BOOSTER) {
    return <BoosterSidebar />;
  }

  return <DashboardSidebar />;
}
