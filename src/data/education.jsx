import React from 'react';
import { FaGraduationCap, FaBookOpen, FaSchool } from 'react-icons/fa';

export const EDUCATION = [
  {
    degree: 'B.Tech AI & Data Science',
    school: 'NBKRIST',
    period: '2023 – 2027',
    grade: 'CGPA: 7.5 / 10',
    detail: 'Undergraduate study in Artificial Intelligence & Data Science. Active in national hackathons, technical projects, and ethical hacking.',
    icon: <FaGraduationCap size={18} />,
    color: '#E67E22',
  },
  {
    degree: 'Intermediate (MPC)',
    school: 'Vamsi Junior College',
    period: '2021 – 2023',
    grade: 'Score: 756 / 1000',
    detail: 'Mathematics, Physics & Chemistry stream with strong mathematical and algorithmic foundations.',
    icon: <FaBookOpen size={16} />,
    color: '#A855F7',
  },
  {
    degree: 'SSC Board',
    school: 'RPBS ZP High School',
    period: '2020',
    grade: 'Score: 564 / 600',
    detail: 'Completed secondary education with distinguished performance in science and mathematics.',
    icon: <FaSchool size={16} />,
    color: '#14B8A6',
  },
];
