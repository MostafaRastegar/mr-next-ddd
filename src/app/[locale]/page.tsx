import { useTranslations } from 'next-intl';

export default function LocalePage() {
  const t = useTranslations('IndexPage');

  return (
    <div>
      <h1 className="mb-4 text-4xl font-semibold">{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
