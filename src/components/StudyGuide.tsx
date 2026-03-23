import { useState } from 'react';

const sections = [
  {
    title: 'RI Firearms Law',
    icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
    gradient: 'from-blue-500 to-indigo-600',
    content: [
      { heading: 'Age Requirement', text: 'You must be 21 years of age or older to purchase a handgun or handgun ammunition in Rhode Island.' },
      { heading: '7-Day Waiting Period', text: 'There is a seven-day waiting period before you can purchase a handgun.' },
      { heading: 'Who Cannot Own a Firearm', text: 'Convicted criminals, mental incompetents, drug addicts, and habitual drunkards cannot legally own a firearm in RI.' },
      { heading: 'Crime of Violence Penalty', text: 'A first conviction for committing a crime of violence while armed carries a sentence of 3 to 10 years (RIGL 11-47-3).' },
      { heading: 'Transporting Without a License', text: 'You do NOT need a license to transport a handgun to/from a bonafide target range from home or your place of business, if it is broken down, unloaded, or secured in a separate container.' },
      { heading: 'Concealed Handgun Note', text: 'A handgun transported openly is still considered concealed if it is NOT being transported to/from a bonafide target range from home or place of business.' },
      { heading: 'Serial Number', text: 'You cannot alter the serial number of any firearm.' },
      { heading: 'Gunshot Wounds', text: 'Physicians treating gunshot wounds must report them to the police (RIGL 11-47-48).' },
      { heading: 'RI Law Reference', text: 'Rhode Island General Laws (RIGL) Title 11, Chapter 11-47.' },
      { heading: 'Blue Card vs. Carry Permit', text: 'The Blue Card (Pistol/Revolver Safety Certificate) is NOT the same as a Concealed Carry Permit. Carry permits are issued through town halls and the RI Attorney General\'s Office.' },
    ],
  },
  {
    title: '10 Commandments of Handgun Safety',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    gradient: 'from-red-500 to-rose-600',
    content: [
      { heading: '1. Watch that muzzle!', text: 'Keep it pointed in a safe direction at all times.' },
      { heading: '2. Treat every handgun as loaded', text: 'It might be, even if you think it isn\'t.' },
      { heading: '3. Be sure of your target', text: 'Know what is in front of it and beyond it. Make sure you have an adequate backstop.' },
      { heading: '4. Finger off the trigger', text: 'Keep your finger outside the trigger guard until ready to shoot. This is the best way to prevent an accidental discharge.' },
      { heading: '5. Check your barrel and ammunition', text: 'Make sure the barrel and action are clear of obstructions, and carry only the proper ammunition for your handgun.' },
      { heading: '6. Unload when not in use', text: 'Leave actions open, and carry firearms in cases and unloaded to and from the shooting area.' },
      { heading: '7. No flat surfaces or water', text: 'Never shoot at a hard, flat surface or the surface of water. Bullets can ricochet.' },
      { heading: '8. No running or climbing', text: 'Don\'t run, jump, or climb with a loaded handgun. Unload before climbing a fence or tree.' },
      { heading: '9. Store handguns and ammo separately', text: 'Store each in secured locations beyond the reach of children and careless adults. Use a trigger lock or cable lock.' },
      { heading: '10. No alcohol or drugs', text: 'Avoid alcoholic beverages before and during shooting. Also avoid mind- or behavior-altering medicines or drugs.' },
    ],
  },
  {
    title: 'Four Primary Rules of Firearm Safety',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    gradient: 'from-amber-500 to-orange-600',
    content: [
      { heading: 'Rule 1', text: 'Point the muzzle in a safe direction.' },
      { heading: 'Rule 2', text: 'Treat every firearm with the respect due a loaded gun.' },
      { heading: 'Rule 3', text: 'Be sure of the target and what is in front of it and beyond it.' },
      { heading: 'Rule 4', text: 'Keep your finger outside the trigger guard until ready to shoot.' },
    ],
  },
  {
    title: 'Handgun Parts & Types',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    gradient: 'from-slate-500 to-slate-700',
    content: [
      { heading: 'Three Basic Types', text: 'Single-shot pistols, revolvers, and semi-automatic pistols.' },
      { heading: 'Three Basic Parts', text: 'Action (trigger group), Frame (metal housing/grip), and Barrel (tube the bullet travels through).' },
      { heading: 'Revolver', text: 'Stores ammunition in a rotating cylinder. Can be single-action (hammer must be manually cocked) or double-action (trigger cocks and fires).' },
      { heading: 'Semi-Automatic Pistol', text: 'Stores ammunition in a removable magazine in the grip. After each shot, the case is ejected automatically and a new round is chambered.' },
      { heading: 'Muzzle', text: 'The end of the barrel through which the bullet exits.' },
      { heading: 'Chamber', text: 'The base of the barrel used to hold the cartridge ready for shooting.' },
      { heading: 'Breech', text: 'The rear end of the barrel.' },
      { heading: 'Bore', text: 'The inside of the barrel through which the projectile travels.' },
      { heading: 'Safety Mechanisms', text: 'Pivot/Thumb Safety, Grip Safety, Half-Cock Safety. Safeties can FAIL — never rely on them completely.' },
      { heading: 'Rifling', text: 'Spiral grooves (and lands between them) cut into the bore. This puts spin on the bullet, increasing accuracy and distance.' },
    ],
  },
  {
    title: 'Ammunition',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    gradient: 'from-yellow-500 to-amber-600',
    content: [
      { heading: 'Four Components', text: 'Case (container), Primer (ignites powder when struck by firing pin), Gunpowder (burns rapidly and converts to expanding gas), Projectile/Bullet (expelled from the barrel).' },
      { heading: 'Centerfire vs. Rimfire', text: 'Centerfire: primer is in the center of the base — most handgun and rifle ammo. Rimfire: primer is in the rim — limited to low-pressure loads.' },
      { heading: 'Caliber', text: 'The size of the handgun bore, measured in hundredths or thousandths of an inch, or millimeters.' },
      { heading: 'Matching Ammo', text: 'ALWAYS match the ammunition caliber exactly to what is stamped on the barrel or slide. Never mix ammunition.' },
      { heading: 'Same Bore ≠ Interchangeable', text: 'Having the same bore size does NOT mean cartridges are interchangeable.' },
    ],
  },
  {
    title: 'Storage & Transport',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    gradient: 'from-emerald-500 to-teal-600',
    content: [
      { heading: 'Storage Rule', text: 'Firearms must be stored UNLOADED in a LOCKED location, SEPARATE from ammunition. The area should be cool, clean, and dry.' },
      { heading: 'Orientation', text: 'Store horizontally or muzzle pointing DOWN. Storing muzzle-up causes gun oil to drain into the action.' },
      { heading: 'Locking Devices', text: 'Trigger locks fit around the trigger guard. Cable locks prevent the action from closing on a live cartridge.' },
      { heading: 'Never Hide a Loaded Gun', text: 'Hiding a loaded gun does NOT prevent children from accessing it. Always lock it.' },
      { heading: 'Ammunition Storage', text: 'Store ammunition separately in locked compartments, away from flammables and in a cool, dry place.' },
      { heading: 'Vehicle Transport', text: 'Keep handgun locked in the trunk or an area not immediately accessible. NOT under the seat, in the glove box, or a door pocket.' },
    ],
  },
  {
    title: 'Shooting Techniques & Range Safety',
    icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    gradient: 'from-purple-500 to-indigo-600',
    content: [
      { heading: 'Three Fundamentals of Marksmanship', text: 'Proper sight adjustment, proper shooting technique, and practice.' },
      { heading: 'Four Fundamentals for Accurate Shot', text: '1. Aim carefully, 2. Take a deep breath then exhale, 3. Squeeze trigger slowly, 4. Follow through.' },
      { heading: 'Sight Alignment', text: 'Lining up the rear and front sights. With iron sights, focus on the FRONT sight — the target and rear sight appear blurred.' },
      { heading: 'Dominant Eye', text: 'Aim with your dominant (master) eye. It may not be the same as your dominant hand.' },
      { heading: 'Two-Handed Grip', text: 'Typically more stable than one-handed. Never cross thumb behind slide on semi-automatic.' },
      { heading: 'Trigger Squeeze', text: 'Apply slow, steady pressure. Do NOT jerk or slap the trigger.' },
      { heading: 'Range Safety', text: 'Always wear hearing and eye protection. Never handle your firearm while others are downrange.' },
      { heading: 'Hang Fire & Misfire', text: 'Keep muzzle pointed safely, wait at least 30 seconds before opening the action.' },
    ],
  },
  {
    title: 'Federal & General Laws',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    gradient: 'from-blue-600 to-cyan-600',
    content: [
      { heading: 'Second Amendment', text: '"A well regulated militia being necessary to the security of a free State, the right of the People to keep and bear arms shall not be infringed."' },
      { heading: 'Gun Control Act of 1968', text: 'Controls mail-order sales; prohibits certain categories of individuals from owning firearms; requires individuals to purchase handguns only in their state of residence.' },
      { heading: 'Air Travel', text: 'All firearms must be unloaded, packed in a hard-sided locked container, declared at the ticket counter, and checked as luggage.' },
      { heading: 'Castle Doctrine', text: 'Protects the right to act in self-defense when an intruder is within your residence or legally occupied place.' },
      { heading: 'Deadly Force', text: 'It is ALWAYS illegal to use deadly force if involved in a non-deadly attack.' },
      { heading: 'Prohibited Locations', text: 'School grounds, courthouses, government buildings, military bases, airports, and others may prohibit firearms.' },
    ],
  },
  {
    title: 'Loading & Unloading Safely',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    gradient: 'from-rose-500 to-red-600',
    content: [
      { heading: 'Before Anything', text: 'ALWAYS point the muzzle in a safe direction and verify the gun is unloaded before handling, cleaning, or storing.' },
      { heading: 'Unloading a Semi-Auto', text: '1. Safety on. 2. Remove the magazine. 3. Pull slide to the rear. 4. Visually AND physically check the chamber. REMOVING THE MAGAZINE DOES NOT MEAN THE GUN IS UNLOADED.' },
      { heading: 'Loading a Semi-Auto', text: '1. Point muzzle safely. 2. Safety on. 3. Verify empty chamber. 4. Load cartridges into magazine. 5. Insert magazine. 6. Pull slide fully back and LET IT GO.' },
      { heading: 'Unloading a Revolver', text: '1. Point muzzle safely. 2. Release cylinder latch, swing cylinder out. 3. Push ejector rod to eject cases. 4. Visually check all chambers.' },
      { heading: 'Extractor / Ejector Rod', text: 'Used on revolvers to remove fired cartridge cases from the cylinder chambers.' },
    ],
  },
];

export default function StudyGuide() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white text-slate-900 mb-1">Study Guide</h2>
        <p className="dark:text-slate-400 text-slate-500 text-sm">Click any section to expand. Based on official exam study materials.</p>
      </div>

      {sections.map((section, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`rounded-xl overflow-hidden transition-all border dark:border-slate-700/50 border-slate-200 ${isOpen ? 'shadow-lg' : ''}`}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className={`w-full flex items-center justify-between p-4 text-left font-semibold transition-all ${
                isOpen
                  ? 'dark:bg-slate-800 bg-slate-50'
                  : 'dark:bg-slate-800/30 bg-white dark:hover:bg-slate-800/60 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${section.gradient} flex items-center justify-center shrink-0`}>
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={section.icon} />
                  </svg>
                </span>
                <span className="dark:text-white text-slate-900 text-sm">{section.title}</span>
                <span className="dark:bg-slate-700 bg-slate-200 dark:text-slate-400 text-slate-500 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {section.content.length}
                </span>
              </span>
              <svg className={`w-4 h-4 dark:text-slate-500 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <div className="dark:bg-slate-800/50 bg-slate-50 border-t dark:border-slate-700/50 border-slate-200 p-4">
                <div className="space-y-2.5">
                  {section.content.map((item, j) => (
                    <div key={j} className="dark:bg-slate-900/50 bg-white rounded-lg p-4 dark:border-slate-700/30 border-slate-100 border">
                      <div className="font-semibold dark:text-slate-200 text-slate-800 mb-1 text-sm">{item.heading}</div>
                      <div className="dark:text-slate-400 text-slate-500 text-sm leading-relaxed">{item.text}</div>
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
