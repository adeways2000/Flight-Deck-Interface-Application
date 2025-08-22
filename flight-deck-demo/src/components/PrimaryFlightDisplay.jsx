import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const PrimaryFlightDisplay = ({ data }) => {
  const { altitude, airspeed, heading, verticalSpeed, attitude } = data

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-blue-400 text-center">Primary Flight Display</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative bg-gradient-to-b from-blue-900 to-amber-900 rounded-lg p-4 h-80">
          {/* Artificial Horizon */}
          <div className="absolute inset-4 overflow-hidden rounded">
            <div 
              className="absolute inset-0 bg-gradient-to-b from-blue-600 to-amber-600 transition-transform duration-300"
              style={{
                transform: `rotate(${attitude.roll}deg) translateY(${attitude.pitch * 3}px)`
              }}
            >
              {/* Horizon Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white"></div>
            </div>
            
            {/* Aircraft Symbol */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-8 h-0.5 bg-yellow-400"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-yellow-400"></div>
            </div>
            
            {/* Pitch Scale */}
            {[-20, -10, 0, 10, 20].map(pitch => (
              <div 
                key={pitch}
                className="absolute left-1/2 transform -translate-x-1/2 text-white text-xs"
                style={{ top: `${50 - pitch * 2}%` }}
              >
                <div className="flex items-center">
                  <div className="w-4 h-0.5 bg-white mr-2"></div>
                  <span>{pitch}</span>
                  <div className="w-4 h-0.5 bg-white ml-2"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Flight Data */}
          <div className="absolute top-2 left-2 bg-black bg-opacity-70 rounded p-2">
            <div className="text-green-400 text-lg font-mono">
              {Math.round(airspeed)} KTS
            </div>
          </div>
          
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded p-2">
            <div className="text-green-400 text-lg font-mono">
              {Math.round(altitude)} FT
            </div>
          </div>
          
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 rounded p-2">
            <div className="text-green-400 text-lg font-mono">
              HDG {Math.round(heading).toString().padStart(3, '0')}°
            </div>
          </div>
          
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 rounded p-2">
            <div className="text-green-400 text-lg font-mono">
              {verticalSpeed > 0 ? '+' : ''}{Math.round(verticalSpeed)} FPM
            </div>
          </div>
        </div>
        
        {/* Speed and Altitude Tapes */}
        <div className="flex justify-between mt-4">
          <div className="bg-gray-700 rounded p-2 flex-1 mr-2">
            <div className="text-center text-sm text-gray-300 mb-1">AIRSPEED</div>
            <div className="text-center text-2xl font-mono text-green-400">
              {Math.round(airspeed)}
            </div>
          </div>
          
          <div className="bg-gray-700 rounded p-2 flex-1 ml-2">
            <div className="text-center text-sm text-gray-300 mb-1">ALTITUDE</div>
            <div className="text-center text-2xl font-mono text-green-400">
              {Math.round(altitude).toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PrimaryFlightDisplay

