import type { SeedNote } from './types';

export const seedNotes: SeedNote[] = [
  // === AFTERSCHOOL ===
  // missing
  { id: 'seed-as-m1', initiativeId: 'afterschool', category: 'missing', text: 'Weekend days. The space would be empty otherwise.', attribution: 'Yasmin' },
  { id: 'seed-as-m2', initiativeId: 'afterschool', category: 'missing', text: 'Someone who speaks Somali and Arabic.', attribution: 'Anonymous neighbour', context: 'Works with families' },
  { id: 'seed-as-m3', initiativeId: 'afterschool', category: 'missing', text: 'A place where kids can just run around. Not everything has to be structured.', attribution: 'Lars' },
  // whoElse
  { id: 'seed-as-w1', initiativeId: 'afterschool', category: 'whoElse', text: 'Vesterbro Ny Skole. They know these kids already.', attribution: 'Anonymous neighbour' },
  { id: 'seed-as-w2', initiativeId: 'afterschool', category: 'whoElse', text: 'The Somali Women\'s Association two streets over.', attribution: 'Fatima' },
  { id: 'seed-as-w3', initiativeId: 'afterschool', category: 'whoElse', text: 'Parents who are themselves new to Denmark.', attribution: 'Zofia', context: 'Lives in Vesterbro' },
  // canOffer
  { id: 'seed-as-c1', initiativeId: 'afterschool', category: 'canOffer', text: 'Two afternoons a week. I\'m a trained teacher.', attribution: 'Amina' },
  { id: 'seed-as-c2', initiativeId: 'afterschool', category: 'canOffer', text: 'Homework help in Polish and English.', attribution: 'Piotr' },
  { id: 'seed-as-c3', initiativeId: 'afterschool', category: 'canOffer', text: 'I can run art sessions. Done it before with kids.', attribution: 'Lena' },
  // extra
  { id: 'seed-as-e1', initiativeId: 'afterschool', category: 'extra', text: 'Make sure the food doesn\'t default to Danish. The kids will know the difference.', attribution: 'Hana' },
  { id: 'seed-as-e2', initiativeId: 'afterschool', category: 'extra', text: 'The kids I know are embarrassed to need help. Don\'t make it look like charity.', attribution: 'Ahmed' },
  { id: 'seed-as-e3', initiativeId: 'afterschool', category: 'extra', text: 'Strong start is what matters. Don\'t understaff year one.', attribution: 'Henrik' },

  // === MENTORSHIP ===
  // missing
  { id: 'seed-me-m1', initiativeId: 'mentorship', category: 'missing', text: 'Welding. Not just carpentry.', attribution: 'Anna' },
  { id: 'seed-me-m2', initiativeId: 'mentorship', category: 'missing', text: 'Role models who aren\'t white. The trades are already white enough.', attribution: 'Priya' },
  { id: 'seed-me-m3', initiativeId: 'mentorship', category: 'missing', text: 'Someone who can explain the paperwork. The bureaucracy stopped my sister.', attribution: 'Miriam' },
  // whoElse
  { id: 'seed-me-w1', initiativeId: 'mentorship', category: 'whoElse', text: 'The vocational college on Vesterbrogade.', attribution: 'Anonymous neighbour' },
  { id: 'seed-me-w2', initiativeId: 'mentorship', category: 'whoElse', text: 'Female plumbers who\'ve been doing it ten or more years.', attribution: 'Sigrid Holm' },
  // canOffer
  { id: 'seed-me-c1', initiativeId: 'mentorship', category: 'canOffer', text: 'I\'m a licensed electrician. Happy to mentor one day a month.', attribution: 'Jette' },
  { id: 'seed-me-c2', initiativeId: 'mentorship', category: 'canOffer', text: 'I can connect you with women in construction I know.', attribution: 'Camille' },
  { id: 'seed-me-c3', initiativeId: 'mentorship', category: 'canOffer', text: 'A spare workshop space on Thursdays.', attribution: 'Anonymous neighbour' },
  // extra
  { id: 'seed-me-e1', initiativeId: 'mentorship', category: 'extra', text: 'My daughter would sign up the day it opens.', attribution: 'Henrik' },
  { id: 'seed-me-e2', initiativeId: 'mentorship', category: 'extra', text: 'Don\'t make it too formal. The women I know learn by doing, not sitting.', attribution: 'Nadia' },

  // === LGBTQ ===
  // missing
  { id: 'seed-lg-m1', initiativeId: 'lgbtq', category: 'missing', text: 'Evening hours. Daytime doesn\'t work for most of us.', attribution: 'Yusuf' },
  { id: 'seed-lg-m2', initiativeId: 'lgbtq', category: 'missing', text: 'A room that doesn\'t look like a waiting room.', attribution: 'Maja', context: 'Lives in Vesterbro' },
  { id: 'seed-lg-m3', initiativeId: 'lgbtq', category: 'missing', text: 'Someone who actually grew up queer here.', attribution: 'Anonymous neighbour' },
  // whoElse
  { id: 'seed-lg-w1', initiativeId: 'lgbtq', category: 'whoElse', text: 'Trans youth specifically. They\'re the most isolated.', attribution: 'Kai' },
  { id: 'seed-lg-w2', initiativeId: 'lgbtq', category: 'whoElse', text: 'LGBT+ parents. We exist and we\'re invisible here.', attribution: 'Søren' },
  { id: 'seed-lg-w3', initiativeId: 'lgbtq', category: 'whoElse', text: 'Peer support, not just professionals.', attribution: 'Anonymous neighbour' },
  // canOffer
  { id: 'seed-lg-c1', initiativeId: 'lgbtq', category: 'canOffer', text: 'A few evenings a week. I\'ve volunteered at Lambda before.', attribution: 'Amir' },
  { id: 'seed-lg-c2', initiativeId: 'lgbtq', category: 'canOffer', text: 'My flat for small group meetings until the space is ready.', attribution: 'Luca' },
  { id: 'seed-lg-c3', initiativeId: 'lgbtq', category: 'canOffer', text: 'I\'m a counsellor. I\'d work for free here.', attribution: 'Maria' },
  // extra
  { id: 'seed-lg-e1', initiativeId: 'lgbtq', category: 'extra', text: 'Please don\'t call it a safe space and then not actually make it safe.', attribution: 'Anonymous neighbour' },
  { id: 'seed-lg-e2', initiativeId: 'lgbtq', category: 'extra', text: 'Trans-inclusive from day one. Not as an add-on.', attribution: 'Jamie' },
  { id: 'seed-lg-e3', initiativeId: 'lgbtq', category: 'extra', text: 'Saturday afternoons. That\'s when I see lonely queer kids around.', attribution: 'Astrid' },

  // === KITCHEN ===
  // missing
  { id: 'seed-ki-m1', initiativeId: 'kitchen', category: 'missing', text: 'Breakfast. Dinner is covered. Morning isn\'t.', attribution: 'Anonymous neighbour' },
  { id: 'seed-ki-m2', initiativeId: 'kitchen', category: 'missing', text: 'A place to store things while you cook. Dignity is in the details.', attribution: 'Thomas' },
  // whoElse
  { id: 'seed-ki-w1', initiativeId: 'kitchen', category: 'whoElse', text: 'The restaurant workers from the area. They have real skills.', attribution: 'Kim' },
  { id: 'seed-ki-w2', initiativeId: 'kitchen', category: 'whoElse', text: 'Neighbourhood families who want to cook with new people.', attribution: 'Elena' },
  { id: 'seed-ki-w3', initiativeId: 'kitchen', category: 'whoElse', text: 'Muslim community kitchen volunteers. They do this every Ramadan.', attribution: 'Khalid' },
  // canOffer
  { id: 'seed-ki-c1', initiativeId: 'kitchen', category: 'canOffer', text: 'I cook for 30 every Sunday already. Happy to help.', attribution: 'Fatima' },
  { id: 'seed-ki-c2', initiativeId: 'kitchen', category: 'canOffer', text: 'Two evenings a week. I\'m a trained nurse.', attribution: 'Anonymous neighbour' },
  { id: 'seed-ki-c3', initiativeId: 'kitchen', category: 'canOffer', text: 'I run a small food NGO. We have surplus produce.', attribution: 'Noor' },
  { id: 'seed-ki-c4', initiativeId: 'kitchen', category: 'canOffer', text: 'Strong back and free Saturdays.', attribution: 'Mikkel' },
  // extra
  { id: 'seed-ki-e1', initiativeId: 'kitchen', category: 'extra', text: 'The people who eat there have knowledge and skills too. Ask them.', attribution: 'Anonymous neighbour' },
  { id: 'seed-ki-e2', initiativeId: 'kitchen', category: 'extra', text: 'Please don\'t photograph residents without clear consent.', attribution: 'Aisha', context: 'Social worker' },
  { id: 'seed-ki-e3', initiativeId: 'kitchen', category: 'extra', text: 'Has to be open in winter. That\'s when it matters most.', attribution: 'Carl' },
];
