import { Poppins } from 'next/font/google';

const poppins = Poppins({ weight: ['300','400','600','700','800'], preload: true, subsets: ['latin'] });

export const fonts = {
  poppins: poppins.style.fontFamily,
};