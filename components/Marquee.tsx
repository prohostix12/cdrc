const items = [
  'Online Degrees', 'UGC Approved', 'Open Schooling', 'NAAC Accredited',
  'Flexible Learning', 'MBA Programs', 'BCA Programs', 'BBA Programs',
  'Career Guidance', 'Affordable Fees', 'Online Degrees', 'UGC Approved',
  'Open Schooling', 'NAAC Accredited', 'Flexible Learning', 'MBA Programs',
  'BCA Programs', 'BBA Programs', 'Career Guidance', 'Affordable Fees',
];

export default function Marquee() {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-star">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
