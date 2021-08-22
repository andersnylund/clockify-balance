import { storage } from 'webextension-polyfill';
import { API_URL } from './constants';

export interface User {
  id: string;
  email: string;
  name: string;
  memberships: Membership[];
  profilePicture: string;
  activeWorkspace: string;
  defaultWorkspace: string;
  settings: Settings;
  status: string;
}

export interface Membership {
  userId: string;
  hourlyRate: null;
  costRate: null;
  targetId: string;
  membershipType: string;
  membershipStatus: string;
}

export interface Settings {
  weekStart: string;
  timeZone: string;
  timeFormat: string;
  dateFormat: string;
  sendNewsletter: boolean;
  weeklyUpdates: boolean;
  longRunning: boolean;
  timeTrackingManual: boolean;
  summaryReportSettings: SummaryReportSettings;
  isCompactViewOn: boolean;
  dashboardSelection: string;
  dashboardViewType: string;
  dashboardPinToTop: boolean;
  projectListCollapse: number;
  collapseAllProjectLists: boolean;
  groupSimilarEntriesDisabled: boolean;
  myStartOfDay: string;
  projectPickerTaskFilter: boolean;
  theme: string;
}

export interface SummaryReportSettings {
  group: string;
  subgroup: string;
}

export const getUser = async (): Promise<User> => {
  const accessToken = (await storage.local.get('accessToken')).accessToken;
  const response = await fetch(`${API_URL}/user`, {
    headers: {
      'X-Auth-Token': accessToken,
    },
  });
  const user: User = await response.json();
  return user;
};

export interface TimeEntry {
  id: string;
  description: string;
  tagIds: string[] | null;
  userId: string;
  billable: boolean;
  taskId: null;
  projectId: null;
  timeInterval: TimeInterval;
  workspaceId: string;
  isLocked: boolean;
  customFieldValues: null;
}

export interface TimeInterval {
  start: string;
  end: string;
  duration: string;
}

export const getTimeEntries = async (
  workspaceId: string,
  userId: string
): Promise<TimeEntry[]> => {
  const accessToken = (await storage.local.get('accessToken')).accessToken;
  const response = await fetch(
    `${API_URL}/workspaces/${workspaceId}/user/${userId}/time-entries`,
    {
      headers: {
        'X-Auth-Token': accessToken,
      },
    }
  );
  const timeEntries: TimeEntry[] = await response.json();
  return timeEntries;
};
