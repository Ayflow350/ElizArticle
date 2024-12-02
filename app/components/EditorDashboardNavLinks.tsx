// components/EditorDashboardNavLinks.tsx
import Link from "next/link";

const EditorDashboardNavLinks = () => (
  <>
    <Link href="/AuthorDashboard/Article">Overview</Link>
    <Link href="/AuthorDashboard/Analytics">Analytics</Link>
  </>
);

export default EditorDashboardNavLinks;
