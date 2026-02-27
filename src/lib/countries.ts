export type Continent =
  | 'Europe'
  | 'Asia'
  | 'Africa'
  | 'North America'
  | 'South America'
  | 'Oceania'
  | 'Antarctica';

export const CONTINENTS: Continent[] = [
  'Europe',
  'Asia',
  'Africa',
  'North America',
  'South America',
  'Oceania',
  'Antarctica',
];

export interface Country {
  name: string;
  /** ISO 3166-1 numeric code (as string, zero-padded to 3 digits) — matches world-atlas geo.id */
  isoNumeric: string;
  continent: Continent;
}

export const COUNTRIES: Country[] = [
  // ── Europe ──────────────────────────────────────────────────────────────────
  { name: 'Albania', isoNumeric: '008', continent: 'Europe' },
  { name: 'Andorra', isoNumeric: '020', continent: 'Europe' },
  { name: 'Austria', isoNumeric: '040', continent: 'Europe' },
  { name: 'Belarus', isoNumeric: '112', continent: 'Europe' },
  { name: 'Belgium', isoNumeric: '056', continent: 'Europe' },
  { name: 'Bosnia and Herzegovina', isoNumeric: '070', continent: 'Europe' },
  { name: 'Bulgaria', isoNumeric: '100', continent: 'Europe' },
  { name: 'Croatia', isoNumeric: '191', continent: 'Europe' },
  { name: 'Cyprus', isoNumeric: '196', continent: 'Europe' },
  { name: 'Czech Republic', isoNumeric: '203', continent: 'Europe' },
  { name: 'Denmark', isoNumeric: '208', continent: 'Europe' },
  { name: 'Estonia', isoNumeric: '233', continent: 'Europe' },
  { name: 'Finland', isoNumeric: '246', continent: 'Europe' },
  { name: 'France', isoNumeric: '250', continent: 'Europe' },
  { name: 'Germany', isoNumeric: '276', continent: 'Europe' },
  { name: 'Greece', isoNumeric: '300', continent: 'Europe' },
  { name: 'Hungary', isoNumeric: '348', continent: 'Europe' },
  { name: 'Iceland', isoNumeric: '352', continent: 'Europe' },
  { name: 'Ireland', isoNumeric: '372', continent: 'Europe' },
  { name: 'Italy', isoNumeric: '380', continent: 'Europe' },
  { name: 'Kosovo', isoNumeric: '383', continent: 'Europe' },
  { name: 'Latvia', isoNumeric: '428', continent: 'Europe' },
  { name: 'Liechtenstein', isoNumeric: '438', continent: 'Europe' },
  { name: 'Lithuania', isoNumeric: '440', continent: 'Europe' },
  { name: 'Luxembourg', isoNumeric: '442', continent: 'Europe' },
  { name: 'Malta', isoNumeric: '470', continent: 'Europe' },
  { name: 'Moldova', isoNumeric: '498', continent: 'Europe' },
  { name: 'Monaco', isoNumeric: '492', continent: 'Europe' },
  { name: 'Montenegro', isoNumeric: '499', continent: 'Europe' },
  { name: 'Netherlands', isoNumeric: '528', continent: 'Europe' },
  { name: 'North Macedonia', isoNumeric: '807', continent: 'Europe' },
  { name: 'Norway', isoNumeric: '578', continent: 'Europe' },
  { name: 'Poland', isoNumeric: '616', continent: 'Europe' },
  { name: 'Portugal', isoNumeric: '620', continent: 'Europe' },
  { name: 'Romania', isoNumeric: '642', continent: 'Europe' },
  { name: 'Russia', isoNumeric: '643', continent: 'Europe' },
  { name: 'San Marino', isoNumeric: '674', continent: 'Europe' },
  { name: 'Serbia', isoNumeric: '688', continent: 'Europe' },
  { name: 'Slovakia', isoNumeric: '703', continent: 'Europe' },
  { name: 'Slovenia', isoNumeric: '705', continent: 'Europe' },
  { name: 'Spain', isoNumeric: '724', continent: 'Europe' },
  { name: 'Sweden', isoNumeric: '752', continent: 'Europe' },
  { name: 'Switzerland', isoNumeric: '756', continent: 'Europe' },
  { name: 'Ukraine', isoNumeric: '804', continent: 'Europe' },
  { name: 'United Kingdom', isoNumeric: '826', continent: 'Europe' },
  { name: 'Vatican City', isoNumeric: '336', continent: 'Europe' },

  // ── Asia ────────────────────────────────────────────────────────────────────
  { name: 'Afghanistan', isoNumeric: '004', continent: 'Asia' },
  { name: 'Armenia', isoNumeric: '051', continent: 'Asia' },
  { name: 'Azerbaijan', isoNumeric: '031', continent: 'Asia' },
  { name: 'Bahrain', isoNumeric: '048', continent: 'Asia' },
  { name: 'Bangladesh', isoNumeric: '050', continent: 'Asia' },
  { name: 'Bhutan', isoNumeric: '064', continent: 'Asia' },
  { name: 'Brunei', isoNumeric: '096', continent: 'Asia' },
  { name: 'Cambodia', isoNumeric: '116', continent: 'Asia' },
  { name: 'China', isoNumeric: '156', continent: 'Asia' },
  { name: 'East Timor', isoNumeric: '626', continent: 'Asia' },
  { name: 'Georgia', isoNumeric: '268', continent: 'Asia' },
  { name: 'India', isoNumeric: '356', continent: 'Asia' },
  { name: 'Indonesia', isoNumeric: '360', continent: 'Asia' },
  { name: 'Iran', isoNumeric: '364', continent: 'Asia' },
  { name: 'Iraq', isoNumeric: '368', continent: 'Asia' },
  { name: 'Israel', isoNumeric: '376', continent: 'Asia' },
  { name: 'Japan', isoNumeric: '392', continent: 'Asia' },
  { name: 'Jordan', isoNumeric: '400', continent: 'Asia' },
  { name: 'Kazakhstan', isoNumeric: '398', continent: 'Asia' },
  { name: 'Kuwait', isoNumeric: '414', continent: 'Asia' },
  { name: 'Kyrgyzstan', isoNumeric: '417', continent: 'Asia' },
  { name: 'Laos', isoNumeric: '418', continent: 'Asia' },
  { name: 'Lebanon', isoNumeric: '422', continent: 'Asia' },
  { name: 'Malaysia', isoNumeric: '458', continent: 'Asia' },
  { name: 'Maldives', isoNumeric: '462', continent: 'Asia' },
  { name: 'Mongolia', isoNumeric: '496', continent: 'Asia' },
  { name: 'Myanmar', isoNumeric: '104', continent: 'Asia' },
  { name: 'Nepal', isoNumeric: '524', continent: 'Asia' },
  { name: 'North Korea', isoNumeric: '408', continent: 'Asia' },
  { name: 'Oman', isoNumeric: '512', continent: 'Asia' },
  { name: 'Pakistan', isoNumeric: '586', continent: 'Asia' },
  { name: 'Palestine', isoNumeric: '275', continent: 'Asia' },
  { name: 'Philippines', isoNumeric: '608', continent: 'Asia' },
  { name: 'Qatar', isoNumeric: '634', continent: 'Asia' },
  { name: 'Saudi Arabia', isoNumeric: '682', continent: 'Asia' },
  { name: 'Singapore', isoNumeric: '702', continent: 'Asia' },
  { name: 'South Korea', isoNumeric: '410', continent: 'Asia' },
  { name: 'Sri Lanka', isoNumeric: '144', continent: 'Asia' },
  { name: 'Syria', isoNumeric: '760', continent: 'Asia' },
  { name: 'Taiwan', isoNumeric: '158', continent: 'Asia' },
  { name: 'Tajikistan', isoNumeric: '762', continent: 'Asia' },
  { name: 'Thailand', isoNumeric: '764', continent: 'Asia' },
  { name: 'Turkmenistan', isoNumeric: '795', continent: 'Asia' },
  { name: 'Turkey', isoNumeric: '792', continent: 'Asia' },
  { name: 'United Arab Emirates', isoNumeric: '784', continent: 'Asia' },
  { name: 'Uzbekistan', isoNumeric: '860', continent: 'Asia' },
  { name: 'Vietnam', isoNumeric: '704', continent: 'Asia' },
  { name: 'Yemen', isoNumeric: '887', continent: 'Asia' },

  // ── Africa ──────────────────────────────────────────────────────────────────
  { name: 'Algeria', isoNumeric: '012', continent: 'Africa' },
  { name: 'Angola', isoNumeric: '024', continent: 'Africa' },
  { name: 'Benin', isoNumeric: '204', continent: 'Africa' },
  { name: 'Botswana', isoNumeric: '072', continent: 'Africa' },
  { name: 'Burkina Faso', isoNumeric: '854', continent: 'Africa' },
  { name: 'Burundi', isoNumeric: '108', continent: 'Africa' },
  { name: 'Cabo Verde', isoNumeric: '132', continent: 'Africa' },
  { name: 'Cameroon', isoNumeric: '120', continent: 'Africa' },
  { name: 'Central African Republic', isoNumeric: '140', continent: 'Africa' },
  { name: 'Chad', isoNumeric: '148', continent: 'Africa' },
  { name: 'Comoros', isoNumeric: '174', continent: 'Africa' },
  { name: 'Congo', isoNumeric: '178', continent: 'Africa' },
  { name: 'DR Congo', isoNumeric: '180', continent: 'Africa' },
  { name: "Côte d'Ivoire", isoNumeric: '384', continent: 'Africa' },
  { name: 'Djibouti', isoNumeric: '262', continent: 'Africa' },
  { name: 'Egypt', isoNumeric: '818', continent: 'Africa' },
  { name: 'Equatorial Guinea', isoNumeric: '226', continent: 'Africa' },
  { name: 'Eritrea', isoNumeric: '232', continent: 'Africa' },
  { name: 'Eswatini', isoNumeric: '748', continent: 'Africa' },
  { name: 'Ethiopia', isoNumeric: '231', continent: 'Africa' },
  { name: 'Gabon', isoNumeric: '266', continent: 'Africa' },
  { name: 'Gambia', isoNumeric: '270', continent: 'Africa' },
  { name: 'Ghana', isoNumeric: '288', continent: 'Africa' },
  { name: 'Guinea', isoNumeric: '324', continent: 'Africa' },
  { name: 'Guinea-Bissau', isoNumeric: '624', continent: 'Africa' },
  { name: 'Kenya', isoNumeric: '404', continent: 'Africa' },
  { name: 'Lesotho', isoNumeric: '426', continent: 'Africa' },
  { name: 'Liberia', isoNumeric: '430', continent: 'Africa' },
  { name: 'Libya', isoNumeric: '434', continent: 'Africa' },
  { name: 'Madagascar', isoNumeric: '450', continent: 'Africa' },
  { name: 'Malawi', isoNumeric: '454', continent: 'Africa' },
  { name: 'Mali', isoNumeric: '466', continent: 'Africa' },
  { name: 'Mauritania', isoNumeric: '478', continent: 'Africa' },
  { name: 'Mauritius', isoNumeric: '480', continent: 'Africa' },
  { name: 'Morocco', isoNumeric: '504', continent: 'Africa' },
  { name: 'Mozambique', isoNumeric: '508', continent: 'Africa' },
  { name: 'Namibia', isoNumeric: '516', continent: 'Africa' },
  { name: 'Niger', isoNumeric: '562', continent: 'Africa' },
  { name: 'Nigeria', isoNumeric: '566', continent: 'Africa' },
  { name: 'Rwanda', isoNumeric: '646', continent: 'Africa' },
  { name: 'São Tomé and Príncipe', isoNumeric: '678', continent: 'Africa' },
  { name: 'Senegal', isoNumeric: '686', continent: 'Africa' },
  { name: 'Seychelles', isoNumeric: '690', continent: 'Africa' },
  { name: 'Sierra Leone', isoNumeric: '694', continent: 'Africa' },
  { name: 'Somalia', isoNumeric: '706', continent: 'Africa' },
  { name: 'South Africa', isoNumeric: '710', continent: 'Africa' },
  { name: 'South Sudan', isoNumeric: '728', continent: 'Africa' },
  { name: 'Sudan', isoNumeric: '729', continent: 'Africa' },
  { name: 'Tanzania', isoNumeric: '834', continent: 'Africa' },
  { name: 'Togo', isoNumeric: '768', continent: 'Africa' },
  { name: 'Tunisia', isoNumeric: '788', continent: 'Africa' },
  { name: 'Uganda', isoNumeric: '800', continent: 'Africa' },
  { name: 'Zambia', isoNumeric: '894', continent: 'Africa' },
  { name: 'Zimbabwe', isoNumeric: '716', continent: 'Africa' },

  // ── North America ────────────────────────────────────────────────────────────
  { name: 'Antigua and Barbuda', isoNumeric: '028', continent: 'North America' },
  { name: 'Bahamas', isoNumeric: '044', continent: 'North America' },
  { name: 'Barbados', isoNumeric: '052', continent: 'North America' },
  { name: 'Belize', isoNumeric: '084', continent: 'North America' },
  { name: 'Canada', isoNumeric: '124', continent: 'North America' },
  { name: 'Costa Rica', isoNumeric: '188', continent: 'North America' },
  { name: 'Cuba', isoNumeric: '192', continent: 'North America' },
  { name: 'Dominica', isoNumeric: '212', continent: 'North America' },
  { name: 'Dominican Republic', isoNumeric: '214', continent: 'North America' },
  { name: 'El Salvador', isoNumeric: '222', continent: 'North America' },
  { name: 'Grenada', isoNumeric: '308', continent: 'North America' },
  { name: 'Guatemala', isoNumeric: '320', continent: 'North America' },
  { name: 'Haiti', isoNumeric: '332', continent: 'North America' },
  { name: 'Honduras', isoNumeric: '340', continent: 'North America' },
  { name: 'Jamaica', isoNumeric: '388', continent: 'North America' },
  { name: 'Mexico', isoNumeric: '484', continent: 'North America' },
  { name: 'Nicaragua', isoNumeric: '558', continent: 'North America' },
  { name: 'Panama', isoNumeric: '591', continent: 'North America' },
  { name: 'Saint Kitts and Nevis', isoNumeric: '659', continent: 'North America' },
  { name: 'Saint Lucia', isoNumeric: '662', continent: 'North America' },
  { name: 'Saint Vincent and the Grenadines', isoNumeric: '670', continent: 'North America' },
  { name: 'Trinidad and Tobago', isoNumeric: '780', continent: 'North America' },
  { name: 'United States', isoNumeric: '840', continent: 'North America' },

  // ── South America ────────────────────────────────────────────────────────────
  { name: 'Argentina', isoNumeric: '032', continent: 'South America' },
  { name: 'Bolivia', isoNumeric: '068', continent: 'South America' },
  { name: 'Brazil', isoNumeric: '076', continent: 'South America' },
  { name: 'Chile', isoNumeric: '152', continent: 'South America' },
  { name: 'Colombia', isoNumeric: '170', continent: 'South America' },
  { name: 'Ecuador', isoNumeric: '218', continent: 'South America' },
  { name: 'Guyana', isoNumeric: '328', continent: 'South America' },
  { name: 'Paraguay', isoNumeric: '600', continent: 'South America' },
  { name: 'Peru', isoNumeric: '604', continent: 'South America' },
  { name: 'Suriname', isoNumeric: '740', continent: 'South America' },
  { name: 'Uruguay', isoNumeric: '858', continent: 'South America' },
  { name: 'Venezuela', isoNumeric: '862', continent: 'South America' },

  // ── Oceania ──────────────────────────────────────────────────────────────────
  { name: 'Australia', isoNumeric: '036', continent: 'Oceania' },
  { name: 'Fiji', isoNumeric: '242', continent: 'Oceania' },
  { name: 'Kiribati', isoNumeric: '296', continent: 'Oceania' },
  { name: 'Marshall Islands', isoNumeric: '584', continent: 'Oceania' },
  { name: 'Micronesia', isoNumeric: '583', continent: 'Oceania' },
  { name: 'Nauru', isoNumeric: '520', continent: 'Oceania' },
  { name: 'New Zealand', isoNumeric: '554', continent: 'Oceania' },
  { name: 'Palau', isoNumeric: '585', continent: 'Oceania' },
  { name: 'Papua New Guinea', isoNumeric: '598', continent: 'Oceania' },
  { name: 'Samoa', isoNumeric: '882', continent: 'Oceania' },
  { name: 'Solomon Islands', isoNumeric: '090', continent: 'Oceania' },
  { name: 'Tonga', isoNumeric: '776', continent: 'Oceania' },
  { name: 'Tuvalu', isoNumeric: '798', continent: 'Oceania' },
  { name: 'Vanuatu', isoNumeric: '548', continent: 'Oceania' },

  // ── Antarctica ───────────────────────────────────────────────────────────────
  { name: 'Antarctica', isoNumeric: '010', continent: 'Antarctica' },
];

export function countriesByContinent(continent: Continent): Country[] {
  return COUNTRIES.filter((c) => c.continent === continent).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

export function getStats(continent: Continent, visitedSet: Set<string>) {
  const countries = countriesByContinent(continent);
  const visited = countries.filter((c) => visitedSet.has(c.isoNumeric)).length;
  const total = countries.length;
  const notYet = total - visited;
  const percentage = total === 0 ? 0 : Math.round((visited / total) * 100);
  return { visited, notYet, total, percentage };
}

export function getGlobalStats(visitedSet: Set<string>) {
  const total = COUNTRIES.length;
  const visited = COUNTRIES.filter((c) => visitedSet.has(c.isoNumeric)).length;
  const notYet = total - visited;
  const percentage = total === 0 ? 0 : Math.round((visited / total) * 100);
  return { visited, notYet, total, percentage };
}
