import { NGINX_URL } from '@/config/config';

export async function fetchUserEmail(userId: string): Promise<string> {
  try {
    const response = await fetch(`${NGINX_URL}/api/users/${userId}/email/`, {
      method: 'GET',
      headers: {
        'X-Internal-Request': 'true'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.email;
  } catch (error) {
    console.error(`Failed to fetch email for user ${userId}:`, error);
    throw new Error('Could not fetch user email');
  }
}