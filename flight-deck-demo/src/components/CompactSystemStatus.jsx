import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Settings,
  Zap,
  Droplets,
  Thermometer,
  Gauge
} from 'lucide-react'

const CompactSystemStatus = ({ data }) => {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'caution':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case 'warning':
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <Settings className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return 'bg-green-700 text-green-100'
      case 'caution':
        return 'bg-yellow-700 text-yellow-100'
      case 'warning':
        return 'bg-red-700 text-red-100'
      default:
        return 'bg-gray-700 text-gray-100'
    }
  }

  const systems = [
    { name: 'HYD', status: data.systems?.hydraulics || 'NORMAL', icon: Droplets },
    { name: 'ELEC', status: data.systems?.electrical || 'NORMAL', icon: Zap },
    { name: 'PRESS', status: data.systems?.pressurization || 'NORMAL', icon: Gauge },
    { name: 'A/P', status: data.systems?.autopilot || 'ENGAGED', icon: Settings }
  ]

  return (
    <Card className="bg-gray-800 border-gray-700 h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-400 text-center text-sm flex items-center justify-center">
          <Settings className="w-4 h-4 mr-2" />
          Systems
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {systems.map((system, index) => {
          const IconComponent = system.icon
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <IconComponent className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium text-gray-300">{system.name}</span>
              </div>
              <Badge 
                variant="secondary" 
                className={`${getStatusColor(system.status)} text-xs px-2 py-1`}
              >
                {system.status}
              </Badge>
            </div>
          )
        })}

        {/* Quick Status Indicators */}
        <div className="mt-4 pt-3 border-t border-gray-600">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">ALT:</span>
              <span className="text-green-400 font-mono">{Math.round(data.altitude || 0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">SPD:</span>
              <span className="text-green-400 font-mono">{Math.round(data.airspeed || 0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">HDG:</span>
              <span className="text-green-400 font-mono">{Math.round(data.heading || 0)}°</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">VS:</span>
              <span className="text-green-400 font-mono">{Math.round(data.verticalSpeed || 0)}</span>
            </div>
          </div>
        </div>

        {/* Master Warning/Caution */}
        <div className="mt-4 pt-3 border-t border-gray-600">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-red-900 border border-red-600 rounded p-2 text-center">
              <div className="text-red-400 font-bold text-xs">MASTER</div>
              <div className="text-red-400 font-bold text-xs">WARNING</div>
            </div>
            <div className="bg-yellow-900 border border-yellow-600 rounded p-2 text-center">
              <div className="text-yellow-400 font-bold text-xs">MASTER</div>
              <div className="text-yellow-400 font-bold text-xs">CAUTION</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CompactSystemStatus
