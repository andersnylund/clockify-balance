import { endOfMonth, startOfMonth } from 'date-fns';
import { TimeEntry, User } from './clockify';
import { API_URL } from './constants';

const getToken = () => window.localStorage.getItem('token') ?? '';

export const getUser = async (): Promise<User> => {
  const response = await fetch(`${API_URL}/user`, {
    headers: {
      'X-Auth-Token': getToken(),
    },
  });
  const user: User = await response.json();
  return user;
};

export const getTimeEntries = async (
  workspaceId: string,
  userId: string
): Promise<TimeEntry[]> => {
  const start = startOfMonth(new Date()).toISOString();
  const end = endOfMonth(new Date()).toISOString();
  const response = await fetch(
    `${API_URL}/workspaces/${workspaceId}/user/${userId}/time-entries?start=${start}&end=${end}&page-size=1000`,
    {
      headers: {
        'X-Auth-Token': getToken(),
      },
    }
  );
  const timeEntries: TimeEntry[] = await response.json();
  return timeEntries;
};
