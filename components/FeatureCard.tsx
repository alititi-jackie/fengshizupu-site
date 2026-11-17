import SiteLink from './SiteLink';
export default function FeatureCard({ href, title, motto, description, action, mobileAction }: {
  href: string; title: string; motto: string; description: string; action: string; mobileAction: string;
}) {
  return <SiteLink className="enping-card" href={href}>
    <span className="enping-seal">冯</span><span className="enping-body">
      <span className="enping-title">{title}</span><span className="enping-motto">{motto}</span>
      <span className="enping-intro">{description}<span className="enping-more">　{mobileAction} ›</span></span>
    </span><span className="enping-btn">{action}</span>
  </SiteLink>;
}
