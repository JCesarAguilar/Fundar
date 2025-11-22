import { P1 } from "../common/Typography";

interface CountryFilterProps {
  countries: string[];
  selectedCountry: string;
  onChange: (country: string) => void;
}

export default function CountryFilter({
  countries,
  selectedCountry,
  onChange,
}: CountryFilterProps) {
  return (
    <div className="flex items-center gap-5">
      <P1>Filter by country:</P1>
      <select
        id="country"
        value={selectedCountry}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-2 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-bluesky-strong cursor-pointer"
      >
        <option value="">🌍 All countries</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}
