import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  const videoData = [
    {
      id: 1,
      title: "Как создать React приложение за 10 минут",
      author: "CodeMaster",
      views: "1.2M",
      time: "2 дня назад",
      duration: "10:24",
      thumbnail: "https://v3.fal.media/files/penguin/2voJ6CIQyyomR1WCUezea_output.png"
    },
    {
      id: 2,
      title: "Лучшие фишки TypeScript в 2024",
      author: "DevGuru",
      views: "856K",
      time: "1 неделя назад",
      duration: "15:42",
      thumbnail: "https://v3.fal.media/files/penguin/2voJ6CIQyyomR1WCUezea_output.png"
    },
    {
      id: 3,
      title: "Tailwind CSS: секреты профессионалов",
      author: "StyleNinja",
      views: "2.1M",
      time: "3 дня назад",
      duration: "8:15",
      thumbnail: "https://v3.fal.media/files/penguin/2voJ6CIQyyomR1WCUezea_output.png"
    },
    {
      id: 4,
      title: "LIVE: Создаём Instagram клон",
      author: "LiveCoder",
      views: "12K зрителей",
      time: "Прямой эфир",
      duration: "LIVE",
      thumbnail: "https://v3.fal.media/files/penguin/2voJ6CIQyyomR1WCUezea_output.png",
      isLive: true
    }
  ];

  const liveStreams = videoData.filter(video => video.isLive);
  const regularVideos = videoData.filter(video => !video.isLive);

  const sidebarItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'subscriptions', label: 'Подписки', icon: 'Users' },
    { id: 'trending', label: 'Трендовое', icon: 'TrendingUp' },
    { id: 'history', label: 'История', icon: 'History' },
    { id: 'library', label: 'Библиотека', icon: 'BookOpen' },
    { id: 'upload', label: 'Загрузка', icon: 'Upload' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded-lg">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                NeoTube
              </h1>
            </div>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Поиск видео..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-700 border-slate-600 text-white placeholder-slate-400 pr-12"
              />
              <Button 
                size="sm" 
                className="absolute right-1 top-1 bg-blue-600 hover:bg-blue-700"
              >
                <Icon name="Search" size={16} />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Icon name="Bell" size={20} />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-600 text-white text-sm">П</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800 min-h-screen p-4">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {/* Live streams section */}
          {liveStreams.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h2 className="text-xl font-bold">Прямые трансляции</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {liveStreams.map((video) => (
                  <Card key={video.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer group">
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1">
                        {video.duration}
                      </Badge>
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="secondary" className="bg-slate-900/80 text-white text-xs">
                          {video.views}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <span>{video.author}</span>
                        <span>•</span>
                        <span>{video.time}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regular videos section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Рекомендации</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {regularVideos.map((video) => (
                <Card key={video.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer group">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-slate-900/80 text-white text-xs px-2 py-1">
                      {video.duration}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                      <span>{video.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <span>{video.views} просмотров</span>
                      <span>•</span>
                      <span>{video.time}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;