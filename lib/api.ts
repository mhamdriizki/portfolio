const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
export const UPLOADS_URL = 'http://localhost:8080/uploads';

export interface Project {
  ID: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: string | null;
  title: string;
  description: string;
  tech_stack: string[];
  image_url: string;
  demo_url: string;
  repo_url: string;
  is_featured: boolean;
  image_base64?: string; // For payload only
}

export interface Activity {
  ID: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: string | null;
  title: string;
  description: string;
  type: string; // 'Milestone', 'Post', etc.
  date?: string; // Backend might set this automatically via CreatedAt, or we pass it? Docs don't show "date" in Create Request, but response has ID/CreatedAt. Assuming CreatedAt is used or 'date' field exists if specified.
                 // Wait, docs say "GET /activities". Docs don't explicitely show response fields for activities other than ID, title, image_url.
                 // Create Request has "type", "link", "image_base64".
                 // I'll keep "date" as optional in case we want to sort by it or if backend supports it.
  link: string;
  image_url: string;
  image_base64?: string; // For payload only
}

export interface AuthResponse {
  token: string;
  error?: string;
}

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken() {
    return this.token;
  }

  logout() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Auth
  async login(username: string, password: string): Promise<AuthResponse> {
    // Docs: POST /auth/login
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    // Docs say response is { token: "..." }
    const data = await res.json();
    if (!res.ok) throw new Error('Login failed');
    return data;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>('/projects');
  }

  async createProject(project: Partial<Project>): Promise<Project> {
    // Docs: POST /admin/projects
    // Payload includes image_base64
    return this.request<Project>('/admin/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }
    
  async updateProject(id: number, project: Partial<Project>): Promise<Project> {
    // Docs: PUT /admin/projects/:id
    return this.request<Project>(`/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  async deleteProject(id: number): Promise<void> {
    // Docs: DELETE /admin/projects/:id
    return this.request<void>(`/admin/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Activities
  async getActivities(): Promise<Activity[]> {
    // Docs: GET /activities
    return this.request<Activity[]>('/activities');
  }

  async createActivity(activity: Partial<Activity>): Promise<Activity> {
    // Docs: POST /admin/activities
    // Request: title, description, type, link, image_base64
    return this.request<Activity>('/admin/activities', {
      method: 'POST',
      body: JSON.stringify(activity),
    });
  }

  async updateActivity(id: number, activity: Partial<Activity>): Promise<Activity> {
    // Not explicitly documented, but assuming consistency with Projects
    return this.request<Activity>(`/admin/activities/${id}`, {
      method: 'PUT', 
      body: JSON.stringify(activity),
    });
  }

  async deleteActivity(id: number): Promise<void> {
    // Docs: DELETE /admin/activities/:id
    return this.request<void>(`/admin/activities/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();
