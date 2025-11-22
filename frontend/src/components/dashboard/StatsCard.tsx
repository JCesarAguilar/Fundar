interface StatsCardProps {
  title: string;
  value: string | number;
}

export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="bg-white-strong shadow-sm rounded-lg p-5 border border-gray-soft">
      <p className="text-sm text-gray-strong">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-2">{value}</h3>
    </div>
  );
}
