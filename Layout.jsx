import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Telescope, Sparkles, Calculator, Map, Save, BookOpen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Astro Finder",
    url: createPageUrl("AstroFinder"),
    icon: Sparkles,
  },
  {
    title: "Sky View",
    url: createPageUrl("SkyFinder"),
    icon: Telescope,
  },
  {
    title: "Birth Chart",
    url: createPageUrl("BirthChartCalculator"),
    icon: Calculator,
  },
  {
    title: "My Charts",
    url: createPageUrl("MyCharts"),
    icon: Save,
  },
  {
    title: "Star Map",
    url: createPageUrl("StarMap"),
    icon: Map,
  },
  {
    title: "Observations",
    url: createPageUrl("Observations"),
    icon: Save,
  },
  {
    title: "Guide",
    url: createPageUrl("Guide"),
    icon: BookOpen,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --mist: #fffff4;
          --nimbus: #8cbdf8;
          --plasma: #8d7cee;
          --cosmic: #ac3af2;
          --astral: #6e55d7;
          --void: #26110e;
        }
        
        body {
          background: #0a0612;
          color: #fffff4;
        }
      `}</style>
      
      <div className="min-h-screen flex w-full bg-[#0a0612]">
        <Sidebar style={{ 
          borderRight: '1px solid rgba(141, 124, 238, 0.1)',
          background: 'rgba(15, 10, 20, 0.95)',
          backdropFilter: 'blur(20px)'
        }}>
          <SidebarHeader style={{ 
            borderBottom: '1px solid rgba(141, 124, 238, 0.1)',
            padding: '1.5rem'
          }}>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(135deg, #ac3af2, #8d7cee)',
                  boxShadow: '0 0 30px rgba(172, 58, 242, 0.6)'
                }}
              >
                <Sparkles className="w-6 h-6" style={{ color: '#fffff4' }} />
              </div>
              <div>
                <h2 className="font-bold text-lg tracking-tight" style={{ color: '#fffff4' }}>
                  Astro Finder
                </h2>
                <p className="text-xs" style={{ color: '#8cbdf8' }}>Vedic Observatory</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel 
                className="text-xs font-medium uppercase tracking-wider px-3 py-2"
                style={{ color: '#8cbdf8' }}
              >
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-[#8d7cee]/10 transition-all duration-300 rounded-lg mb-1 ${
                          location.pathname === item.url 
                            ? 'border' 
                            : ''
                        }`}
                        style={location.pathname === item.url ? {
                          background: 'linear-gradient(90deg, rgba(172, 58, 242, 0.15), rgba(141, 124, 238, 0.15))',
                          borderColor: 'rgba(172, 58, 242, 0.4)',
                          color: '#fffff4',
                          boxShadow: '0 0 15px rgba(172, 58, 242, 0.3)'
                        } : {
                          color: '#8cbdf8'
                        }}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="backdrop-blur-xl border-b px-6 py-4 md:hidden" style={{ 
            backgroundColor: 'rgba(15, 10, 20, 0.8)',
            borderColor: 'rgba(141, 124, 238, 0.2)'
          }}>
            <div className="flex items-center gap-4">
              <SidebarTrigger 
                className="hover:bg-[#8d7cee]/20 p-2 rounded-lg transition-colors duration-200"
                style={{ color: '#fffff4' }}
              />
              <h1 className="text-xl font-bold" style={{ color: '#fffff4' }}>Astro Finder</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}