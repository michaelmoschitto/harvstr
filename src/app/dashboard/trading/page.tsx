import PageContainer from '@/components/layout/page-container';
import TradingContent from '@/components/TradingContent';

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <TradingContent />
    </PageContainer>
  );
}
