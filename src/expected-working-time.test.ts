import tk from 'timekeeper';
import { mocked } from 'ts-jest/utils';
import { getTimeEntries, getUser } from './api';
import { TimeEntry, User } from './clockify';
import { getBalance } from './expected-working-time';
import { getExpectedMinutesThisMonthSoFar } from './working-minutes';

tk.freeze('2021-08-30');

jest.mock('./working-minutes');
jest.mock('./api');

describe('expected-working-time', () => {
  describe('getBalance', () => {
    it('formats the time correctly', async () => {
      mocked(getExpectedMinutesThisMonthSoFar).mockReturnValue(7.5 * 60);
      mocked(getUser).mockResolvedValue(mockUser);
      mocked(getTimeEntries).mockResolvedValue(mockTimeEntries);
      expect(await getBalance()).toEqual({
        monthIsPositive: false,
        monthString: '3:43',
      });
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
];
