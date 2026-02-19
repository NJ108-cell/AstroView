import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Sparkles, Globe } from 'lucide-react';

export default function StarMapPage() {
  const constellations = [
    {
      name: 'Ursa Major (Big Dipper)',
      stars: ['Dubhe', 'Merak', 'Phecda', 'Megrez', 'Alioth', 'Mizar', 'Alkaid'],
      description: 'The Great Bear, one of the most recognizable constellations in the northern sky.',
      season: 'Visible year-round in northern latitudes'
    },
    {
      name: 'Orion',
      stars: ['Betelgeuse', 'Rigel', 'Bellatrix', 'Mintaka', 'Alnilam', 'Alnitak'],
      description: 'The Hunter, featuring the famous Orion Belt and the Orion Nebula.',
      season: 'Best visible: November to February'
    },
    {
      name: 'Cassiopeia',
      stars: ['Schedar', 'Caph', 'Gamma Cas', 'Ruchbah', 'Segin'],
      description: 'The Queen, forming a distinctive W shape in the northern sky.',
      season: 'Visible year-round in northern latitudes'
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: '#0a0612' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Star Map & Constellations
          </h1>
          <p className="text-blue-200">Explore the celestial patterns visible from your location</p>
        </div>

        <Tabs defaultValue="constellations" className="space-y-6">
          <TabsList className="bg-black/40 backdrop-blur-xl border border-white/20">
            <TabsTrigger value="constellations" className="data-[state=active]:bg-purple-600">
              <Star className="w-4 h-4 mr-2" />
              Constellations
            </TabsTrigger>
            <TabsTrigger value="stars" className="data-[state=active]:bg-purple-600">
              <Sparkles className="w-4 h-4 mr-2" />
              Bright Stars
            </TabsTrigger>
            <TabsTrigger value="deep-sky" className="data-[state=active]:bg-purple-600">
              <Globe className="w-4 h-4 mr-2" />
              Deep Sky
            </TabsTrigger>
          </TabsList>

          <TabsContent value="constellations" className="space-y-6">
            {constellations.map((constellation) => (
              <Card key={constellation.name} className="bg-black/40 backdrop-blur-xl border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    {constellation.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-blue-200">{constellation.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {constellation.stars.map((star) => (
                      <div key={star} className="bg-white/5 rounded-lg p-3 text-sm">
                        <div className="w-2 h-2 bg-white rounded-full mb-2"></div>
                        <p className="text-white font-medium">{star}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-900/30 rounded-lg p-3 text-sm text-blue-200 border border-blue-500/30">
                    <span className="font-semibold">Visibility:</span> {constellation.season}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="stars">
            <Card className="bg-black/40 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">Brightest Stars Visible Tonight</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {['Sirius', 'Vega', 'Arcturus', 'Polaris', 'Betelgeuse', 'Rigel'].map((star) => (
                    <div key={star} className="bg-gradient-to-r from-white/5 to-blue-500/10 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-full shadow-lg shadow-white/50"></div>
                        <div>
                          <p className="text-white font-bold">{star}</p>
                          <p className="text-xs text-blue-300">Currently visible</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deep-sky">
            <Card className="bg-black/40 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">Deep Sky Objects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Andromeda Galaxy', code: 'M31', distance: '2.5 million ly' },
                  { name: 'Orion Nebula', code: 'M42', distance: '1,344 ly' },
                  { name: 'Pleiades', code: 'M45', distance: '444 ly' }
                ].map((obj) => (
                  <div key={obj.code} className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg p-4 border border-purple-500/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-bold text-lg">{obj.name}</p>
                        <p className="text-purple-300 text-sm">{obj.code}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Distance</p>
                        <p className="text-white font-semibold">{obj.distance}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}