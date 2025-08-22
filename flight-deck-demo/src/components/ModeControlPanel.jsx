import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Plane, 
  Navigation, 
  TrendingUp, 
  Gauge,
  Radio,
  Wifi,
  Volume2
} from 'lucide-react'

const ModeControlPanel = ({ flightData, autopilotState }) => {
  const activeModes = []
  
  if (autopilotState?.masterEngaged) activeModes.push('A/P')
  if (autopilotState?.lnav) activeModes.push('LNAV')
  if (autopilotState?.vnav) activeModes.push('VNAV')
  if (autopilotState?.altitudeHold) activeModes.push('ALT HOLD')
  if (autopilotState?.speedHold) activeModes.push('SPD')

  return (
    <Card className="bg-gray-800 border-gray-700 mb-4">
      <CardContent className="py-3">
        <div className="flex items-center justify-between">
          {/* Flight Phase Indicator */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Plane className="w-5 h-5 text-blue-400" />
              <div className="text-sm">
                <span className="text-gray-400">PHASE:</span>
                <span className="text-green-400 font-semibold ml-2">CRUISE</span>
              </div>
            </div>
            
            {/* Flight Level */}
            <div className="text-sm">
              <span className="text-gray-400">FL:</span>
              <span className="text-green-400 font-mono ml-2">
                {Math.round((flightData.altitude || 0) / 100)}
              </span>
            </div>
          </div>

          {/* Active Autopilot Modes */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">ACTIVE MODES:</span>
            <div className="flex space-x-1">
              {activeModes.length > 0 ? (
                activeModes.map((mode, index) => (
                  <Badge 
                    key={index}
                    variant="secondary" 
                    className="bg-green-700 text-green-100 text-xs px-2 py-1"
                  >
                    {mode}
                  </Badge>
                ))
              ) : (
                <Badge 
                  variant="secondary" 
                  className="bg-gray-700 text-gray-300 text-xs px-2 py-1"
                >
                  MANUAL
                </Badge>
              )}
            </div>
          </div>

          {/* Communication Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Radio className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">COM1</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">NAV1</span>
            </div>
            <div className="flex items-center space-x-1">
              <Volume2 className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-blue-400">ATC</span>
            </div>
          </div>

          {/* Current Time */}
          <div className="text-sm">
            <span className="text-gray-400">UTC:</span>
            <span className="text-green-400 font-mono ml-2">
              {new Date().toUTCString().slice(17, 25)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ModeControlPanel
