import tk from 'timekeeper';
import { mocked } from 'ts-jest/utils';
import { getTimeEntries, getUser } from './api';
import { TimeEntry, User } from './clockify';
import { getBalance } from './balance';
import { Interval, IntervalBalance } from './types';

tk.freeze('2021-08-10T13:00:00.000+03:00');

jest.mock('./api');

describe('expected-working-time', () => {
  describe('getBalance', () => {
    it('formats the times correctly', async () => {
      mocked(getUser).mockResolvedValue(mockUser);
      mocked(getTimeEntries).mockResolvedValue(mockTimeEntries);
      expect(await getBalance()).toEqual(
        new Map<Interval, IntervalBalance>([
          ['month', { stringRepresentation: '48:13', isPositive: false }],
          ['week', { stringRepresentation: '10:43', isPositive: false }],
          ['day', { stringRepresentation: '03:13', isPositive: false }],
        ])
      );
    });
  });
});

const mockUser: User = {
  id: 'userId',
  email: 'email@example.com',
  name: 'Example',
  memberships: [
    {
      userId: 'userId',
      hourlyRate: null,
      costRate: null,
      targetId: 'targetId',
      membershipType: 'WORKSPACE',
      membershipStatus: 'ACTIVE',
    },
    {
      userId: 'userId',
      hourlyRate: null,
      costRate: null,
      targetId: 'targetId',
      membershipType: 'PROJECT',
      membershipStatus: 'ACTIVE',
    },
    {
      userId: 'userId',
      hourlyRate: null,
      costRate: null,
      targetId: 'targetId',
      membershipType: 'PROJECT',
      membershipStatus: 'ACTIVE',
    },
  ],
  profilePicture: 'https://img.clockify.me/no-user-image.png',
  activeWorkspace: 'workspaceId',
  defaultWorkspace: 'workspaceId',
  settings: {
    weekStart: 'MONDAY',
    timeZone: 'Europe/Helsinki',
    timeFormat: 'HOUR24',
    dateFormat: 'DD.MM.YYYY',
    sendNewsletter: false,
    weeklyUpdates: false,
    longRunning: false,
    timeTrackingManual: true,
    summaryReportSettings: {
      group: 'Project',
      subgroup: 'Time Entry',
    },
    isCompactViewOn: true,
    dashboardSelection: 'ME',
    dashboardViewType: 'PROJECT',
    dashboardPinToTop: false,
    projectListCollapse: 50,
    collapseAllProjectLists: false,
    groupSimilarEntriesDisabled: false,
    myStartOfDay: '09:00',
    projectPickerTaskFilter: false,
    theme: 'DARK',
  },
  status: 'ACTIVE',
};

const mockTimeEntries: TimeEntry[] = [
  {
    id: '612cb0de73ce921672c7d58e',
    description: 'task 3',
    tagIds: null,
    userId: 'userId',
    billable: false,
    taskId: null,
    projectId: null,
    timeInterval: {
      start: '2021-08-30T09:57:23Z',
      end: '2021-08-30T12:45:00Z',
      duration: 'PT3H',
    },
    workspaceId: 'workspaceId',
    isLocked: false,
    customFieldValues: null,
  },
  {
    id: '612c983773ce921672c63e1b',
    description: 'task 2',
    tagIds: null,
    userId: 'userId',
    billable: false,
    taskId: null,
    projectId: null,
    timeInterval: {
      start: '2021-08-30T08:00:00Z',
      end: '2021-08-30T08:30:00Z',
      duration: 'PT30M',
    },
    workspaceId: 'workspaceId',
    isLocked: false,
    customFieldValues: null,
  },
  {
    id: '612c9842ff6efe46f55a08fa',
    description: 'task 1',
    tagIds: [],
    userId: 'userId',
    billable: false,
    taskId: null,
    projectId: null,
    timeInterval: {
      start: '2021-08-30T07:30:00Z',
      end: '2021-08-30T08:00:00Z',
      duration: 'PT30M',
    },
    workspaceId: 'workspaceId',
    isLocked: false,
    customFieldValues: null,
  },
  {
    id: '612c9842ff6efe46f55a08fa',
    description: 'task 0',
    tagIds: [],
    userId: 'userId',
    billable: false,
    taskId: null,
    projectId: null,
    timeInterval: {
      start: '2021-08-20T07:30:00Z',
      end: '2021-08-20T08:00:00Z',
      duration: 'PT30M',
    },
    workspaceId: 'workspaceId',
    isLocked: false,
    customFieldValues: null,
  },
];
