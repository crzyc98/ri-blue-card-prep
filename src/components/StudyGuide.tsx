import { useState } from 'react';

const sections = [
  {
    title: 'RI Firearms Law',
    emoji: '⚖️',
    color: 'blue',
    content: [
      { heading: 'Age Requirement', text: 'You must be 21 years of age or older to purchase a handgun or handgun ammunition in Rhode Island.' },
      { heading: '7-Day Waiting Period', text: 'There is a seven-day waiting period before you can purchase a handgun.' },
      { heading: 'Who Cannot Own a Firearm', text: 'Convicted criminals, mental incompetents, drug addicts, and habitual drunkards cannot legally own a firearm in RI.' },
      { heading: 'Crime of Violence Penalty', text: 'Committing a crime of violence while armed adds 5 years to the prison sentence for that crime.' },
      { heading: 'Transporting Without a License', text: 'You do NOT need a license to transport a handgun to/from a bonafide target range from home or your place of business, if it is broken down, unloaded, or secured in a separate container.' },
      { heading: 'Concealed Handgun Note', text: 'A handgun transported openly is still considered concealed if it is NOT being transported to/from a bonafide target range from home or place of business.' },
      { heading: 'Serial Number', text: 'You cannot alter the serial number of any firearm.' },
      { heading: 'Gunshot Wounds', text: 'All gunshot wounds must be reported to the police immediately.' },
      { heading: 'RI Law Reference', text: 'Rhode Island General Laws (RIGL) Title 11, Chapter 11-47.' },
      { heading: 'Blue Card vs. Carry Permit', text: 'The Blue Card (Pistol/Revolver Safety Certificate) is NOT the same as a Concealed Carry Permit. Carry permits are issued through town halls and the RI Attorney General\'s Office.' },
    ],
  },
  {
    title: '10 Commandments of Handgun Safety',
    emoji: '🛡️',
    color: 'red',
    content: [
      { heading: '1. Watch that muzzle!', text: 'Keep it pointed in a safe direction at all times.' },
      { heading: '2. Treat every handgun as loaded', text: 'It might be, even if you think it isn\'t.' },
      { heading: '3. Be sure of your target', text: 'Know what is in front of it and beyond it. Make sure you have an adequate backstop.' },
      { heading: '4. Finger off the trigger', text: 'Keep your finger outside the trigger guard until ready to shoot. This is the best way to prevent an accidental discharge.' },
      { heading: '5. Check your barrel and ammunition', text: 'Make sure the barrel and action are clear of obstructions, and carry only the proper ammunition for your handgun.' },
      { heading: '6. Unload when not in use', text: 'Leave actions open, and carry firearms in cases and unloaded to and from the shooting area.' },
      { heading: '7. Point only at what you intend to shoot', text: 'Avoid all horseplay with a gun.' },
      { heading: '8. No running or climbing', text: 'Don\'t run, jump, or climb with a loaded handgun. Unload before climbing a fence or tree. Pull a handgun toward you by the grip, not the muzzle.' },
      { heading: '9. Store handguns and ammo separately', text: 'Store each in secured locations beyond the reach of children and careless adults. Use a trigger lock or cable lock.' },
      { heading: '10. No alcohol or drugs', text: 'Avoid alcoholic beverages before and during shooting. Also avoid mind- or behavior-altering medicines or drugs.' },
    ],
  },
  {
    title: 'Four Primary Rules of Firearm Safety',
    emoji: '📋',
    color: 'orange',
    content: [
      { heading: 'Rule 1', text: 'Point the muzzle in a safe direction.' },
      { heading: 'Rule 2', text: 'Treat every firearm with the respect due a loaded gun.' },
      { heading: 'Rule 3', text: 'Be sure of the target and what is in front of it and beyond it.' },
      { heading: 'Rule 4', text: 'Keep your finger outside the trigger guard until ready to shoot.' },
    ],
  },
  {
    title: 'Handgun Parts & Types',
    emoji: '🔧',
    color: 'gray',
    content: [
      { heading: 'Three Basic Types', text: 'Single-shot pistols, revolvers, and semi-automatic pistols.' },
      { heading: 'Three Basic Parts', text: 'Action (trigger group), Frame (metal housing/grip), and Barrel (tube the bullet travels through).' },
      { heading: 'Revolver', text: 'Stores ammunition in a rotating cylinder. Can be single-action (hammer must be manually cocked) or double-action (trigger cocks and fires).' },
      { heading: 'Semi-Automatic Pistol', text: 'Stores ammunition in a removable magazine in the grip. After each shot, the case is ejected automatically and a new round is chambered.' },
      { heading: 'Key Parts — Muzzle', text: 'The end of the barrel through which the bullet exits.' },
      { heading: 'Key Parts — Chamber', text: 'The base of the barrel used to hold the cartridge ready for shooting.' },
      { heading: 'Key Parts — Breech', text: 'The rear end of the barrel.' },
      { heading: 'Key Parts — Bore', text: 'The inside of the barrel through which the projectile travels.' },
      { heading: 'Safety Mechanisms', text: 'Pivot/Thumb Safety (semi-autos), Grip Safety (semi-autos), Half-Cock Safety (single-action revolvers). Safeties can FAIL — never rely on them completely.' },
      { heading: 'Rifling', text: 'Spiral grooves (and lands between them) cut into the bore. This puts spin on the bullet, increasing accuracy and distance.' },
      { heading: 'Fully Automatic', text: 'A fully automatic firearm fires continuously while the trigger is held. It MAY NOT be used for hunting or sport shooting.' },
    ],
  },
  {
    title: 'Ammunition',
    emoji: '💥',
    color: 'yellow',
    content: [
      { heading: 'Four Components', text: 'Case (container), Primer (ignites powder when struck by firing pin), Gunpowder (burns rapidly and converts to expanding gas), Projectile/Bullet (expelled from the barrel).' },
      { heading: 'Centerfire vs. Rimfire', text: 'Centerfire: primer is in the center of the base — most handgun and rifle ammo. Rimfire: primer is in the rim — limited to low-pressure loads, not reloadable.' },
      { heading: 'Caliber', text: 'The size of the handgun bore, measured in hundredths or thousandths of an inch, or millimeters. Every handgun is designed for a specific cartridge.' },
      { heading: 'Matching Ammo', text: 'ALWAYS match the ammunition caliber exactly to what is stamped on the barrel or slide. Using wrong ammo can cause an explosion. Never mix ammunition.' },
      { heading: 'Same Bore ≠ Interchangeable', text: 'Having the same bore size does NOT mean cartridges are interchangeable. Always match exactly.' },
    ],
  },
  {
    title: 'Storage & Transport',
    emoji: '🔒',
    color: 'green',
    content: [
      { heading: 'Storage Rule', text: 'Firearms must be stored UNLOADED in a LOCKED location, SEPARATE from ammunition. The area should be cool, clean, and dry.' },
      { heading: 'Orientation', text: 'Store horizontally or muzzle pointing DOWN. Storing muzzle-up causes gun oil to drain into the action, creating a sticky film.' },
      { heading: 'Locking Devices', text: 'Trigger locks fit around the trigger guard. Cable locks prevent the action from closing on a live cartridge.' },
      { heading: 'Never Hide a Loaded Gun', text: 'Hiding a loaded gun does NOT prevent children from accessing it. Always lock it.' },
      { heading: 'Ammunition Storage', text: 'Store ammunition separately in locked compartments, away from flammables and in a cool, dry place.' },
      { heading: 'Vehicle Transport', text: 'Keep handgun locked in the trunk or an area not immediately accessible to anyone in the vehicle. NOT under the seat, in the glove box, or a door pocket.' },
      { heading: 'Unload Before Transport', text: 'Always unload and case firearms before transporting. The action should be open or the gun broken down.' },
    ],
  },
  {
    title: 'Shooting Techniques & Range Safety',
    emoji: '🎯',
    color: 'purple',
    content: [
      { heading: 'Three Fundamentals of Marksmanship', text: '1. Proper sight adjustment/patterning, 2. Proper shooting technique, 3. Practice.' },
      { heading: 'Four Fundamentals for Accurate Shot', text: '1. Aim carefully (align sights), 2. Take a deep breath then exhale, 3. Squeeze trigger slowly, 4. Follow through.' },
      { heading: 'Sight Alignment', text: 'Lining up the rear and front sights. With iron sights, focus on the FRONT sight — the target and rear sight appear blurred.' },
      { heading: 'Dominant Eye', text: 'Aim with your dominant (master) eye. It may not be the same as your dominant hand.' },
      { heading: 'Two-Handed Grip', text: 'Typically more stable than one-handed. Never cross thumb behind slide on semi-automatic — the slide can cause injury.' },
      { heading: 'Trigger Squeeze', text: 'Apply slow, steady pressure. Do NOT jerk or slap the trigger — this causes misses.' },
      { heading: 'Range Safety', text: 'Always wear hearing and eye protection. Never handle your firearm while others are downrange. Respond IMMEDIATELY to "cease fire."' },
      { heading: 'Hang Fire & Misfire', text: 'Keep muzzle pointed safely, wait at least 30 seconds before opening the action. Do not attempt to fire again immediately.' },
      { heading: 'Alcohol', text: 'Never consume alcohol before or during shooting. It impairs coordination, hearing, vision, communication, and judgment.' },
    ],
  },
  {
    title: 'Federal & General Laws',
    emoji: '🏛️',
    color: 'blue',
    content: [
      { heading: 'Second Amendment', text: '"A well regulated militia being necessary to the security of a free State, the right of the People to keep and bear arms shall not be infringed." Ratified 1791.' },
      { heading: 'Gun Control Act of 1968', text: 'Controls mail-order sales of firearms; prohibits certain categories of individuals from owning firearms; requires individuals to purchase handguns only in their state of residence.' },
      { heading: 'Firearm Owners\' Protection Act', text: 'Amended Gun Control Act of 1968, including clarification of which categories of individuals are prohibited from owning a firearm.' },
      { heading: 'Air Travel', text: 'All firearms must be unloaded, packed in a hard-sided locked container, declared at the ticket counter, and checked as luggage. Never in carry-on.' },
      { heading: 'Castle Doctrine', text: 'Protects the right to act in self-defense when an intruder is within your residence or legally occupied place, vehicle, or workplace.' },
      { heading: 'Deadly Force', text: 'It is ALWAYS illegal to use deadly force if involved in a non-deadly attack. Know your state\'s self-defense laws.' },
      { heading: 'Prohibited Locations', text: 'School grounds, courthouses, government buildings, military bases, airports, banks, parks, places serving alcohol, churches, and others may prohibit firearms.' },
      { heading: 'Ignorance is No Defense', text: 'Ignorance of handgun laws is NOT a valid excuse for violating them.' },
    ],
  },
  {
    title: 'Loading & Unloading Safely',
    emoji: '🔄',
    color: 'red',
    content: [
      { heading: 'Before Anything', text: 'ALWAYS point the muzzle in a safe direction and verify the gun is unloaded before handling, cleaning, or storing.' },
      { heading: 'Unloading a Semi-Auto', text: '1. Safety on. 2. Remove the magazine. 3. Pull slide to the rear. 4. Visually AND physically check the chamber. REMOVING THE MAGAZINE DOES NOT MEAN THE GUN IS UNLOADED.' },
      { heading: 'Loading a Semi-Auto', text: '1. Point muzzle safely. 2. Safety on. 3. Remove magazine. 4. Pull slide to verify empty chamber. 5. Load cartridges into magazine. 6. Insert magazine. 7. Pull slide fully back and LET IT GO — do not guide it forward by hand.' },
      { heading: 'Unloading a Revolver (Double-Action)', text: '1. Point muzzle up safely. 2. Release cylinder latch, swing cylinder out. 3. Push ejector rod to eject cases. 4. Visually check chamber and cylinder.' },
      { heading: 'Extractor / Ejector Rod', text: 'Used on revolvers to remove fired cartridge cases from the cylinder chambers.' },
    ],
  },
];

const colorMap: Record<string, { bg: string; border: string; badge: string; btnBg: string; btnText: string }> = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800', btnBg: 'bg-blue-700', btnText: 'text-white' },
  red: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-800', btnBg: 'bg-red-600', btnText: 'text-white' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-800', btnBg: 'bg-orange-600', btnText: 'text-white' },
  gray: { bg: 'bg-gray-50', border: 'border-gray-300', badge: 'bg-gray-200 text-gray-700', btnBg: 'bg-gray-700', btnText: 'text-white' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-800', btnBg: 'bg-yellow-600', btnText: 'text-white' },
  green: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-800', btnBg: 'bg-green-700', btnText: 'text-white' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-800', btnBg: 'bg-purple-700', btnText: 'text-white' },
};

export default function StudyGuide() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">📖 Study Guide</h2>
        <p className="text-gray-500">Click any section to expand it. All content is based on the official exam study materials.</p>
      </div>

      {sections.map((section, i) => {
        const c = colorMap[section.color] || colorMap['blue'];
        const isOpen = open === i;
        return (
          <div key={i} className={`rounded-xl border-2 overflow-hidden transition-all ${c.border}`}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className={`w-full flex items-center justify-between p-5 text-left font-bold text-gray-800 transition-colors ${isOpen ? c.bg : 'bg-white hover:bg-gray-50'}`}
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">{section.emoji}</span>
                <span className="text-lg">{section.title}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>
                  {section.content.length} topics
                </span>
              </span>
              <span className="text-xl text-gray-400">{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
              <div className={`${c.bg} border-t ${c.border} p-5`}>
                <div className="space-y-4">
                  {section.content.map((item, j) => (
                    <div key={j} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                      <div className="font-semibold text-gray-800 mb-1 text-sm">{item.heading}</div>
                      <div className="text-gray-600 text-sm leading-relaxed">{item.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
