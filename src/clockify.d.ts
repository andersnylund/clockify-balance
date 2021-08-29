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
