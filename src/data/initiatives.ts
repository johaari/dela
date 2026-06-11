import type { Initiative } from './types';

export const initiatives: Initiative[] = [
  {
    id: 'afterschool',
    title: 'After-school space for migrant kids',
    partner: 'with Settlementet på Vesterbro',
    description:
      'Settlementet has run after-school programmes in Vesterbro for decades. Together, we\'re opening a new weekday space where kids aged 7 to 14 can do homework, play, and just be. The physical space is secured. What we haven\'t figured out yet is what the programme actually looks like, who runs it alongside Settlementet\'s staff, and what would make children who are new to Denmark feel genuinely at home there, not just accommodated.',
    stillOpen:
      'What activities would feel welcoming. Whether parents should be part of it. What languages are needed. Who else in the neighbourhood is already doing this.',
    tags: ['Children', 'Migrants', 'Families', 'Education'],
    imageSeed: '42',
    ikeaBrings: [
      'Furniture and play materials',
      'A small operating grant',
      'Staff volunteer hours',
    ],
    partnerBrings: [
      '30 years working with Vesterbro families',
      'Trained pedagogues',
      'An existing space on Saxogade',
    ],
    shapedBy: [
      'Members asked for bilingual staff. Settlementet is now recruiting a Somali-Danish pedagogue.',
      'Several families mentioned food. Every session will now include a shared snack.',
      'One member offered two afternoons a week as a homework helper. She starts in September.',
    ],
    nextMeeting: {
      date: 'Thursday 22 May',
      time: '17:00 to 18:30',
      location: 'Settlementet, Saxogade 89',
    },
  },
  {
    id: 'mentorship',
    title: 'Mentorship for young women entering trades',
    partner: 'with KVINFO',
    description:
      'KVINFO has spent years connecting women who broke into male-dominated industries with those just starting out. We\'re building a mentorship programme specifically for young women in Vesterbro interested in trades: carpentry, plumbing, electrical, welding. We know there\'s demand. We have the organisational partnership. What we\'re still working out is the format, the matching process, and crucially what the women who would benefit from this actually say they need. We don\'t want to assume it.',
    stillOpen:
      'How formal or informal the matching should be. Whether it\'s one-on-one or group-based. What practical support looks like beyond mentoring. Who should lead it.',
    tags: ['Women', 'Youth', 'Trades', 'Mentorship'],
    imageSeed: '87',
    ikeaBrings: [
      'Paid apprenticeship slots',
      'Tools and workwear',
      'Mentors from IKEA\'s own teams',
    ],
    partnerBrings: [
      'Research on gender in trades',
      'A network of mentors across Denmark',
      'Recruitment reach',
    ],
    shapedBy: [
      'Members flagged welding specifically. KVINFO has added welding to the first programme cohort.',
      'The request for less bureaucracy led to a single-page plain-language guide for applicants.',
      'A member connected us with a female electrician willing to mentor. First meeting is in June.',
    ],
    nextMeeting: {
      date: 'Tuesday 27 May',
      time: '17:30 to 19:00',
      location: 'KVINFO, Nytorv 5',
    },
  },
  {
    id: 'lgbtq',
    title: 'Meeting place for LGBTQ+ youth in Vesterbro',
    partner: 'with AIDS-Fondet & Sjakket',
    description:
      'We\'re working with Sjakket and AIDS-Fondet to open a weekly drop-in space for LGBTQ+ young people in Vesterbro: a place to meet, talk, and not have to explain yourself. The location is confirmed. What it actually offers is still being shaped: the activities, the hours, the tone, the people who staff it. We want this to be built with the community, not just for it.',
    stillOpen:
      'What activities happen there. Whether it runs weekends or only weekdays. What "safe space" actually means to young people here. Who else belongs at the table.',
    tags: ['Youth', 'LGBTQ+', 'Mental health', 'Community'],
    imageSeed: '23',
    ikeaBrings: [
      'A renovated room near the showroom',
      'Funding for the first year',
      'Staff training on inclusion',
    ],
    partnerBrings: [
      'Trained youth workers',
      'Trust built over decades',
      'Peer facilitators from the community',
    ],
    shapedBy: [
      'Members asked for weekend hours. The space will open Saturdays from the start.',
      'Several members suggested trans-inclusive staff training. AIDS-Fondet is leading this in May.',
      'One member offered to run a peer-led art night. We are talking with her now.',
    ],
    nextMeeting: {
      date: 'Thursday 29 May',
      time: '16:30 to 18:00',
      location: 'Sjakket, Istedgade 80',
    },
  },
  {
    id: 'kitchen',
    title: 'Community kitchen for unhoused neighbours',
    partner: 'with Mændenes Hjem',
    description:
      'Mændenes Hjem has been a lifeline for unhoused people in Vesterbro for over 100 years. We\'re building a community kitchen. Not just a place to get a meal, but a space for cooking together, learning, and connection. The partnership is in place and the kitchen is being refitted. What\'s still open is the programme: who cooks, when, whether neighbours from the wider community participate alongside residents, and what dignity looks like in practice.',
    stillOpen:
      'Who participates beyond residents. Whether there are shared cooking sessions open to the neighbourhood. What skills or knowledge residents want to offer, not just receive. How to make it sustainable.',
    tags: ['Unhoused', 'Food', 'Community', 'Dignity'],
    imageSeed: '65',
    ikeaBrings: [
      'Kitchen equipment',
      'Weekly food supply',
      'A covered outdoor area',
    ],
    partnerBrings: [
      '100 years of work in Vesterbro',
      'Trauma-informed staff',
      'Daily relationships with the people the kitchen would serve',
    ],
    shapedBy: [
      'Members said breakfast matters more than dinner. The kitchen will run mornings first.',
      'A member offered regular produce from a food NGO. It is now part of the supply plan.',
      'Residents asked to be cooks, not just guests. Half the kitchen shifts will be resident-led.',
    ],
    nextMeeting: {
      date: 'Monday 2 June',
      time: '15:00 to 16:30',
      location: 'Mændenes Hjem, Lille Istedgade 2',
    },
  },
];
