import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import StatsCard from './StatsCard';
import JobCard from './JobCard';
import { ChevronDown } from 'lucide-react';

const Dashboard = () => {
  // Sample data
  const stats = [
    {
      title: 'Total Articles',
      value: '127',
      description: 'Generated this month',
      trend: { value: '+12%', isPositive: true },
      icon: <div className="text-2xl">📄</div>
    },
    {
      title: 'Articles Published',
      value: '89',
      description: 'Live on your website',
      trend: { value: '+8%', isPositive: true },
      icon: <div className="text-2xl">🚀</div>
    },
    {
      title: 'Processing Queue',
      value: '3',
      description: 'Currently in progress',
      icon: <div className="text-2xl">⏳</div>
    },
    {
      title: 'Average Words',
      value: '2,847',
      description: 'Per generated article',
      trend: { value: '+156 words', isPositive: true },
      icon: <div className="text-2xl">📊</div>
    }
  ];

  const jobs = [
    {
      id: 'job-001',
      title: 'The Future of AI in Content Marketing: Strategies for 2024',
      status: 'ready' as const,
      podcastName: 'Marketing Mastery Podcast',
      uploadDate: '2 hours ago',
      wordCount: 3240,
      estimatedReadTime: '13 min'
    },
    {
      id: 'job-002', 
      title: 'Building Scalable SaaS Products: Lessons from Y Combinator',
      status: 'processing' as const,
      podcastName: 'SaaS Growth Stories',
      uploadDate: '4 hours ago',
      wordCount: 2890,
      estimatedReadTime: '12 min'
    },
    {
      id: 'job-003',
      title: 'Customer Success Metrics That Actually Matter in 2024',
      status: 'published' as const,
      podcastName: 'Customer Success Weekly',
      uploadDate: '1 day ago',
      wordCount: 2456,
      estimatedReadTime: '10 min'
    },
    {
      id: 'job-004',
      title: 'Remote Team Management: Best Practices from Tech Leaders',
      status: 'ready' as const,
      podcastName: 'Leadership in Tech',
      uploadDate: '2 days ago',
      wordCount: 3180,
      estimatedReadTime: '13 min'
    },
    {
      id: 'job-005',
      title: 'The Psychology of User Experience Design',
      status: 'failed' as const,
      podcastName: 'Design Thinking Podcast',
      uploadDate: '3 days ago'
    },
    {
      id: 'job-006',
      title: 'Data-Driven Product Development: A Framework for Success',
      status: 'published' as const,
      podcastName: 'Product Management Today',
      uploadDate: '5 days ago',
      wordCount: 2678,
      estimatedReadTime: '11 min'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Stats Overview */}
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-brand-text mb-2">Dashboard</h2>
          <p className="text-gray-600">Transform your podcast content into engaging articles</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Jobs Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-brand-text">Recent Jobs</h3>
                <p className="text-gray-600 text-sm mt-1">Your podcast transcript transformations</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Search jobs..." 
                    className="w-64"
                  />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white">
                  + Upload New
                </Button>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
            
            {/* Load More */}
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="flex items-center gap-2">
                Load More Jobs
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
