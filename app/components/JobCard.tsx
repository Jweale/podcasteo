import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface JobCardProps {
  id: string;
  title: string;
  status: 'processing' | 'ready' | 'published' | 'failed';
  podcastName: string;
  uploadDate: string;
  wordCount?: number;
  estimatedReadTime?: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  status,
  podcastName,
  uploadDate,
  wordCount,
  estimatedReadTime
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'processing':
        return { label: 'Processing', className: 'status-processing' };
      case 'ready':
        return { label: 'Ready for Review', className: 'status-ready' };
      case 'published':
        return { label: 'Published', className: 'status-published' };
      case 'failed':
        return { label: 'Failed', className: 'status-failed' };
      default:
        return { label: 'Unknown', className: 'bg-gray-100 text-gray-800' };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-brand-text group-hover:text-brand-primary transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{podcastName}</p>
          </div>
          <Badge 
            variant="outline" 
            className={`ml-3 flex-shrink-0 ${statusConfig.className} border`}
          >
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>Uploaded {uploadDate}</span>
          {wordCount && (
            <span>{wordCount.toLocaleString()} words</span>
          )}
        </div>
        
        {estimatedReadTime && (
          <div className="text-sm text-gray-600 mb-4">
            <span className="inline-flex items-center">
              📖 {estimatedReadTime} read
            </span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            ID: {id}
          </div>
          
          {status === 'ready' && (
            <Button 
              size="sm" 
              className="bg-brand-primary hover:bg-brand-primary/90 text-white"
            >
              Review Article
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
          
          {status === 'published' && (
            <Button variant="outline" size="sm">
              View Article
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
          
          {status === 'processing' && (
            <div className="flex items-center text-sm text-amber-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600 mr-2"></div>
              Processing...
            </div>
          )}
          
          {status === 'failed' && (
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
              Retry
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
