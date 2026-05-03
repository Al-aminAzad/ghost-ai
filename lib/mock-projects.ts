export interface Project {
  id: string;
  name: string;
  slug: string;
  owned: boolean;
}

export const MOCK_PROJECTS: Project[] = [
  { id: "1", name: "E-Commerce Platform", slug: "e-commerce-platform", owned: true },
  { id: "2", name: "Auth Service", slug: "auth-service", owned: true },
  { id: "3", name: "Shared Architecture", slug: "shared-architecture", owned: false },
];
