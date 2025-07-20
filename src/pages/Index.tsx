import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [openTabs, setOpenTabs] = useState(['home', 'subscriptions', 'trending']);
  const [checkedVideos, setCheckedVideos] = useState<number[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [cursorTimeout, setCursorTimeout] = useState<NodeJS.Timeout | null>(null);

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

  const handleCloseTab = (tabId: string) => {
    const newTabs = openTabs.filter(tab => tab !== tabId);
    setOpenTabs(newTabs);
    if (activeSection === tabId && newTabs.length > 0) {
      setActiveSection(newTabs[0]);
    }
  };

  const handleOpenTab = (tabId: string) => {
    if (!openTabs.includes(tabId)) {
      setOpenTabs([...openTabs, tabId]);
    }
    setActiveSection(tabId);
  };

  const toggleVideoCheck = (videoId: number) => {
    setCheckedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Ошибка полноэкранного режима:', error);
    }
  };

  const handleMouseMove = () => {
    setShowCursor(true);
    if (cursorTimeout) clearTimeout(cursorTimeout);
    
    if (isFullscreen) {
      const timeout = setTimeout(() => {
        setShowCursor(false);
      }, 3000);
      setCursorTimeout(timeout);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (!document.fullscreenElement) {
        setShowCursor(true);
        if (cursorTimeout) clearTimeout(cursorTimeout);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mousemove', handleMouseMove);
      if (cursorTimeout) clearTimeout(cursorTimeout);
    };
  }, [cursorTimeout, isFullscreen]);

  return (
    <div className={`min-h-screen bg-slate-900 text-white transition-all duration-300 ${
      isFullscreen ? (showCursor ? 'cursor-auto' : 'cursor-none') : 'cursor-auto'
    }`}>
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
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleFullscreen}
              className="text-slate-300 hover:text-white hover:bg-slate-700"
              title={isFullscreen ? 'Выйти из полноэкранного режима' : 'Полноэкранный режим'}
            >
              <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={20} />
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Icon name="Bell" size={20} />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-600 text-white text-sm">П</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className={`bg-slate-800 border-b border-slate-700 transition-all duration-300 ${
        isFullscreen ? 'px-2' : 'px-6'
      }`}>
        <div className="flex gap-1 overflow-x-auto">
          {openTabs.map((tabId) => {
            const tabItem = sidebarItems.find(item => item.id === tabId);
            if (!tabItem) return null;
            
            return (
              <div
                key={tabId}
                className={`group flex items-center border-b-2 transition-all duration-200 min-w-fit ${
                  isFullscreen ? 'gap-1 px-2 py-2' : 'gap-2 px-4 py-2'
                } ${
                  activeSection === tabId
                    ? 'border-blue-500 bg-slate-700 text-white'
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <button
                  onClick={() => setActiveSection(tabId)}
                  className={`flex items-center hover:text-blue-400 transition-colors ${
                    isFullscreen ? 'gap-1' : 'gap-2'
                  }`}
                  title={isFullscreen ? tabItem.label : undefined}
                >
                  <Icon name={tabItem.icon as any} size={16} />
                  {!isFullscreen && (
                    <span className="font-medium text-sm">{tabItem.label}</span>
                  )}
                </button>
                
                {openTabs.length > 1 && !isFullscreen && (
                  <button
                    onClick={() => handleCloseTab(tabId)}
                    className="ml-2 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-slate-600 transition-all duration-200"
                  >
                    <Icon name="X" size={12} className="text-slate-400 hover:text-white" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-slate-800 min-h-screen p-4 transition-all duration-300 ${
          isFullscreen ? 'w-16' : 'w-64'
        }`}>
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleOpenTab(item.id)}
                className={`w-full flex items-center rounded-lg transition-all duration-200 ${
                  isFullscreen ? 'justify-center px-2 py-3' : 'gap-3 px-4 py-3'
                } ${
                  activeSection === item.id 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white hover:scale-105'
                }`}
                title={isFullscreen ? item.label : undefined}
              >
                <Icon name={item.icon as any} size={20} />
                {!isFullscreen && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {openTabs.includes(item.id) && (
                      <Badge variant="secondary" className="ml-auto bg-blue-500/20 text-blue-300 text-xs">
                        •
                      </Badge>
                    )}
                  </>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className={`flex-1 transition-all duration-300 ${
          isFullscreen ? 'p-2' : 'p-6'
        }`}>
          {/* Live streams section */}
          {liveStreams.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h2 className="text-xl font-bold">Прямые трансляции</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {liveStreams.map((video) => (
                  <Card key={video.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-xl">
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
                      
                      {/* Checkbox for marking videos */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVideoCheck(video.id);
                        }}
                        className={`absolute top-2 left-2 w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          checkedVideos.includes(video.id)
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-slate-900/60 border-slate-400 hover:border-blue-400'
                        }`}
                      >
                        {checkedVideos.includes(video.id) && (
                          <Icon name="Check" size={14} className="text-white" />
                        )}
                      </button>
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
                <Card key={video.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-xl">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-slate-900/80 text-white text-xs px-2 py-1">
                      {video.duration}
                    </Badge>
                    
                    {/* Checkbox for marking videos */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVideoCheck(video.id);
                      }}
                      className={`absolute top-2 left-2 w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        checkedVideos.includes(video.id)
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-slate-900/60 border-slate-400 hover:border-blue-400'
                      }`}
                    >
                      {checkedVideos.includes(video.id) && (
                        <Icon name="Check" size={14} className="text-white" />
                      )}
                    </button>
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