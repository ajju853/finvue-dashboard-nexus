
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PortfolioSummary } from '@/components/dashboard/PortfolioSummary';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { AssetsTable } from '@/components/dashboard/AssetsTable';

const Portfolio = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <p className="text-muted-foreground">Track your investments and performance</p>
      </div>
      
      <PortfolioSummary />
      <PerformanceChart />
      <AssetsTable />
    </DashboardLayout>
  );
};

export default Portfolio;
