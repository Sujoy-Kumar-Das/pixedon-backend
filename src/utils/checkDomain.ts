import axios from 'axios';

export async function checkDomain(email: string): Promise<boolean> {
  try {
    const domain = email.split('@')[1];
    const response = await axios.get(`http://${domain}`);
    return response.status === 200;
  } catch {
    return false;
  }
}
