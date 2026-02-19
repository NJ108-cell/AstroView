import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Telescope, Star, Satellite, Info } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function GuidePage() {
  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: '#0a0612' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Astronomy Guide
          </h1>
          <p className="text-blue-200">Learn how to navigate the night sky</p>
        </div>

        <div className="space-y-6">
          <Card className="bg-black/40 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-400" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-200 space-y-4">
              <p>
                The Sky Finder uses your device's GPS to show you a real-time map of celestial objects 
                visible from your location. The compass overlay helps you orient yourself with cardinal directions.
              </p>
              <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
                <p className="text-sm">
                  <strong className="text-white">Tip:</strong> Altitude of 0° is the horizon, 90° is directly overhead (zenith).
                  Azimuth of 0° is North, 90° is East, 180° is South, and 270° is West.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Quick Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="planets" className="bg-white/5 rounded-lg px-4 border-none">
                  <AccordionTrigger className="text-white hover:text-blue-300">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-purple-400" />
                      Planets
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-blue-200 text-sm">
                    Planets appear as bright dots that move relative to the stars. Venus is the brightest, 
                    often visible near sunrise or sunset. Jupiter and Saturn are also easily visible. 
                    Mars has a distinctive reddish color.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="stars" className="bg-white/5 rounded-lg px-4 border-none">
                  <AccordionTrigger className="text-white hover:text-blue-300">
                    <div className="flex items-center gap-2">
                      <Telescope className="w-4 h-4 text-yellow-400" />
                      Stars & Constellations
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-blue-200 text-sm">
                    Stars are distant suns that appear to twinkle due to atmospheric turbulence. 
                    Constellations are patterns humans have identified in the stars. Polaris (North Star) 
                    can help you find true north in the Northern Hemisphere.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="satellites" className="bg-white/5 rounded-lg px-4 border-none">
                  <AccordionTrigger className="text-white hover:text-blue-300">
                    <div className="flex items-center gap-2">
                      <Satellite className="w-4 h-4 text-cyan-400" />
                      Satellites
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-blue-200 text-sm">
                    Artificial satellites like the ISS appear as moving points of light. They don't twinkle 
                    and move steadily across the sky. The ISS is one of the brightest objects and can be 
                    as bright as Venus. Best viewing is shortly after sunset or before sunrise.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="deep-sky" className="bg-white/5 rounded-lg px-4 border-none">
                  <AccordionTrigger className="text-white hover:text-blue-300">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-pink-400" />
                      Deep Sky Objects
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-blue-200 text-sm">
                    Galaxies, nebulae, and star clusters require dark skies and often binoculars or telescopes. 
                    The Andromeda Galaxy (M31) is the most distant object visible to the naked eye at 2.5 million light-years away.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/30 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Best Viewing Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-blue-200 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5"></div>
                <p>Find a location away from city lights (dark sky sites)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5"></div>
                <p>Choose clear nights with minimal cloud cover</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5"></div>
                <p>Allow 20-30 minutes for your eyes to adapt to darkness</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5"></div>
                <p>New moon periods offer the darkest skies</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}