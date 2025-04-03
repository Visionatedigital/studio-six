import FAQ from '../components/FAQ';
import DashboardLayout from '../../components/DashboardLayout';

export default function FAQPage() {
  return (
    <DashboardLayout currentPage="FAQ">
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#1B1464]">Frequently Asked Questions</h1>
        <FAQ />
      </div>
    </DashboardLayout>
  );
} 