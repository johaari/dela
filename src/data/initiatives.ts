import type { Initiative } from './types';

export const initiatives: Initiative[] = [
  {
    id: 'afterschool',
    title: 'A room on Saxogade for kids to land after school',
    partner: 'with Settlementet på Vesterbro',
    description:
      "Settlementet has been running the building on Saxogade for decades. They know the families on that block by name. We're working with them to open an after-school space that gives kids somewhere to land between school and home. Homework help, food, and a room that's theirs. It's for kids whose families are new to Denmark, but it's also just a good thing to have on a street that's changed a lot in ten years.",
    stillOpen:
      "Still being worked out: the hours, what language support looks like, and whether there's space for a small outdoor area.",
    tags: ['Children', 'Migrants', 'Families', 'Education'],
    image: '/ini1.jpg',
    ikeaBrings: ['Furniture and play materials', 'A small operating grant', 'Staff volunteer hours'],
    partnerBrings: [
      '30 years working with Vesterbro families',
      'Trained pedagogues',
      'An existing space on Saxogade',
    ],
    trackRecord: [
      {
        date: 'February 2025',
        text: "Met with Karin and the afternoon team at Saxogade to walk through the space and talk about what's actually missing after three o'clock.",
        person: 'Karin',
      },
      {
        date: 'April 2025',
        text: 'IKEA brought furniture samples to a session with eight families. Three pieces got vetoed immediately. That was useful.',
      },
      {
        date: 'May 2025',
        text: 'Agreed on a layout for the main room. Construction starts in August.',
      },
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
    title: 'More women on the tools in Vesterbro, and further',
    partner: 'with KVINFO',
    description:
      "KVINFO has spent years documenting why young women don't end up in carpentry, electrical work, or plumbing, and what actually changes that. We're building a mentorship program with them that pairs young women in Vesterbro with tradespeople already working in the field. Some of those mentors will come from IKEA's own teams. The goal isn't a one-off program. It's a different-looking workforce in ten years, starting here.",
    stillOpen:
      'Still being worked out: whether it runs through schools, who recruits the first cohort, and how long each mentorship lasts.',
    tags: ['Women', 'Youth', 'Trades', 'Mentorship'],
    image: '/ini2.jpg',
    ikeaBrings: [
      'Paid apprenticeship slots',
      'Tools and workwear',
      "Mentors from IKEA's own teams",
    ],
    partnerBrings: [
      'Research on gender in trades',
      'A network of mentors across Denmark',
      'Recruitment reach',
    ],
    trackRecord: [
      {
        date: 'January 2025',
        text: "KVINFO shared their research on dropout points for women in trade apprenticeships. We sat with it for a month before responding.",
      },
      {
        date: 'March 2025',
        text: 'First conversation with four IKEA tradespeople about becoming mentors. Two said yes on the spot.',
      },
      {
        date: 'May 2025',
        text: 'Mapped out a pilot with twelve young women from two schools in Vesterbro and Sydhavn. Pilot runs in the autumn.',
      },
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
    title: 'Vesterbro has always been that neighborhood, and this is how we keep it that way.',
    partner: 'with AIDS-Fondet & Sjakket',
    description:
      "Sjakket has been on Istedgade for years. AIDS-Fondet knows what young LGBTQ+ people in this city actually need. Together they're opening a weekly drop-in. A room where young people can show up without an appointment or a reason, meet people, and not have to explain themselves. It's for LGBTQ+ youth in Vesterbro specifically. It's also what makes Vesterbro the kind of place people choose to live.",
    stillOpen:
      'Still being worked out: weekend versus weekday hours, whether peer facilitators run it, and what the room actually looks like.',
    tags: ['Youth', 'LGBTQ+', 'Mental health', 'Community'],
    image: '/ini3.jpg',
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
    trackRecord: [
      {
        date: 'November 2024',
        text: "Visited Sjakket's current space on Istedgade. It's too small and the lease runs out next year.",
      },
      {
        date: 'February 2025',
        text: "AIDS-Fondet ran a listening session with young people. Forty-three showed up. We weren't there. That was deliberate.",
      },
      {
        date: 'April 2025',
        text: 'Found a room near the showroom. AIDS-Fondet reviewed it with three young people from the February session. They said yes.',
      },
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
    title: "A kitchen on Mændenes Hjem's block that's open, warm, and run by people who know the street",
    partner: 'with Mændenes Hjem',
    description:
      "Mændenes Hjem has been on Dannebrogsgade for over a hundred years. They know every person who sleeps rough on that end of Vesterbro. We're building out a kitchen with them, bringing equipment, a weekly food supply, and a covered outdoor area so they can serve hot meals at a scale they haven't been able to reach before. It's not a soup kitchen with a sign. It's an extension of the work Mændenes Hjem already does, every day, without much fuss.",
    stillOpen:
      "Still being worked out: opening days, whether the kitchen can be used by other neighborhood groups on off-days, and staffing.",
    tags: ['Unhoused', 'Food', 'Community', 'Dignity'],
    image: '/ini4.jpg',
    ikeaBrings: ['Kitchen equipment', 'Weekly food supply', 'A covered outdoor area'],
    partnerBrings: [
      '100 years of work in Vesterbro',
      'Trauma-informed staff',
      'Daily relationships with the people the kitchen would serve',
    ],
    trackRecord: [
      {
        date: 'October 2024',
        text: "Walked Dannebrogsgade with two people from Mændenes Hjem's day staff. They showed us where the current kitchen breaks down at scale.",
      },
      {
        date: 'January 2025',
        text: "IKEA's facilities team drew up a kitchen plan. Mændenes Hjem changed about half of it. The second version is better.",
      },
      {
        date: 'April 2025',
        text: 'Equipment ordered. Covered outdoor structure approved by the building owner.',
      },
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
