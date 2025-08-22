import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const NavigationDisplay = ({ data }) => {
  const { heading, navigation } = data

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-blue-400 text-center">Navigation Display</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative bg-black rounded-lg p-4 h-80">
          {/* Compass Rose */}
          <div className="absolute inset-4">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Compass Circle */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="#22d3ee" strokeWidth="1" />
              
              {/* Compass Markings */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => (
                <g key={angle}>
                  <line
                    x1="100"
                    y1="10"
                    x2="100"
                    y2={angle % 90 === 0 ? "25" : "20"}
                    stroke="#22d3ee"
                    strokeWidth={angle % 90 === 0 ? "2" : "1"}
                    transform={`rotate(${angle} 100 100)`}
                  />
                  {angle % 90 === 0 && (
                    <text
                      x="100"
                      y="35"
                      textAnchor="middle"
                      fill="#22d3ee"
                      fontSize="12"
                      transform={`rotate(${angle} 100 100)`}
                    >
                      {angle === 0 ? 'N' : angle === 90 ? 'E' : angle === 180 ? 'S' : 'W'}
                    </text>
                  )}
                </g>
              ))}
              
              {/* Aircraft Symbol */}
              <polygon
                points="100,95 105,105 100,100 95,105"
                fill="#fbbf24"
                stroke="#fbbf24"
                strokeWidth="1"
              />
              
              {/* Heading Bug */}
              <polygon
                points="100,15 105,25 95,25"
                fill="#ef4444"
                transform={`rotate(${heading} 100 100)`}
              />
              
              {/* Flight Path */}
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="40"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="5,5"
                transform={`rotate(${heading} 100 100)`}
              />
              
              {/* Waypoints */}
              <circle cx="100" cy="50" r="3" fill="#a855f7" transform={`rotate(${heading} 100 100)`} />
              <text x="105" y="55" fill="#a855f7" fontSize="10" transform={`rotate(${heading} 100 100)`}>
                {navigation.nextWaypoint}
              </text>
            </svg>
          </div>
          
          {/* Navigation Info */}
          <div className="absolute top-2 left-2 bg-black bg-opacity-70 rounded p-2">
            <div className="text-cyan-400 text-sm">
              FROM: {navigation.currentWaypoint}
            </div>
            <div className="text-purple-400 text-sm">
              TO: {navigation.nextWaypoint}
            </div>
          </div>
          
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded p-2">
            <div className="text-green-400 text-sm">
              DIST: {navigation.distance} NM
            </div>
            <div className="text-green-400 text-sm">
              ETA: {navigation.eta}
            </div>
          </div>
          
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 rounded p-2">
            <div className="text-yellow-400 text-lg font-mono">
              HDG {Math.round(heading).toString().padStart(3, '0')}°
            </div>
          </div>
        </div>
        
        {/* Range and Mode Controls */}
        <div className="flex justify-between mt-4">
          <div className="bg-gray-700 rounded p-2">
            <div className="text-center text-sm text-gray-300 mb-1">RANGE</div>
            <div className="text-center text-lg font-mono text-cyan-400">160 NM</div>
          </div>
          
          <div className="bg-gray-700 rounded p-2">
            <div className="text-center text-sm text-gray-300 mb-1">MODE</div>
            <div className="text-center text-lg font-mono text-cyan-400">MAP</div>
          </div>
          
          <div className="bg-gray-700 rounded p-2">
            <div className="text-center text-sm text-gray-300 mb-1">WX</div>
            <div className="text-center text-lg font-mono text-green-400">OFF</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default NavigationDisplay

