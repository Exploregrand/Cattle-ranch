/**
 * The people behind Herd & Field. Add real people only: name, role, one line about them,
 * and a photo under /public/images/team. Members appear on the site as soon as they're listed.
 */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: string; // e.g. "/images/team/jane.jpg"
}

export const team: TeamMember[] = [
  // { name: "Full name", role: "Founder", bio: "One line about them.", photo: "/images/team/name.jpg" },
];
