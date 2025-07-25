import axios from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
  // Add other user fields as needed
}

export class UserClient {
  async fetchUser(token: string): Promise<{ data?: User; error?: string }> {
    try {
      const response = await axios.get("http://localhost:4000/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { data: response.data.user };
    } catch (error: any) {
      return { error: error.response?.data?.error || "Failed to fetch user" };
    }
  }
}

// Usage example:
// const userClient = new UserClient();
// const { data, error } = await userClient.fetchUser(token);