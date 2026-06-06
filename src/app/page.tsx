import type { Metadata } from 'next';
import { HomeHero } from '@/components/sections/HomeHero';
import { HomeQuizInitial } from '@/components/sections/HomeQuizInitial';
import { HomePremise } from '@/components/sections/HomePremise';
import { HomeSectionGrid } from '@/components/sections/HomeSectionGrid';
import { HomeRVAccess } from '@/components/sections/HomeRVAccess';
import { SITE_DESCRIPTION } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Archivo — Blue Eye Samurai | Universo Transmedia',
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeQuizInitial />
      <HomePremise />
      <HomeSectionGrid />
      <HomeRVAccess />
    </>
  );
}
