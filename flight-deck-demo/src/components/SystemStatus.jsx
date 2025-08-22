import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

const SystemStatus = ({ data }) => {
  const { systems } = data

  const StatusIndicator = ({ status, label }) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'normal':
        case 'engaged':
          return { color: 'text-green-400', icon: CheckCircle, bg: 'bg-green-900' }
        case 'caution':
          return { color: 'text-yellow-400', icon: AlertTriangle, bg: 'bg-yellow-900' }
        case 'warning':
        case 'failed':
          return { color: 'text-red-400', icon: XCircle, bg: 'bg-red-900' }
        default:
          return { color: 'text-gray-400', icon: CheckCircle, bg: 'bg-gray-700' }
      }
    }

    const { color, icon: Icon, bg } = getStatusColor(status)

    return (
      <div className={`${bg} rounded-lg p-4 flex items-center justify-between`}>
        <div>
          <div className="text-sm text-gray-300">{label}</div>
          <div className={`text-lg font-semibold ${color}`}>{status}</div>
        </div>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-blue-400 text-center">System Status</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatusIndicator status={systems.hydraulics} label="HYDRAULICS" />
          <StatusIndicator status={systems.electrical} label="ELECTRICAL" />
          <StatusIndicator status={systems.pressurization} label="PRESSURIZATION" />
          <StatusIndicator status={systems.autopilot} label="AUTOPILOT" />
        </div>
        
        {/* Crew Alerting System */}
        <div className="mt-6 bg-gray-900 rounded-lg p-4">
          <h3 className="text-center text-lg font-semibold text-cyan-400 mb-4">
            Crew Alerting System
          </h3>
          
          <div className="space-y-2">
            <div className="bg-green-900 border border-green-600 rounded p-3 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              <div>
                <div className="text-green-400 font-semibold">ALL SYSTEMS NORMAL</div>
                <div className="text-green-300 text-sm">No active alerts or warnings</div>
              </div>
            </div>
            
            <div className="bg-blue-900 border border-blue-600 rounded p-3 flex items-center">
              <div className="w-5 h-5 bg-blue-400 rounded-full mr-3 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <div className="text-blue-400 font-semibold">AUTOPILOT ENGAGED</div>
                <div className="text-blue-300 text-sm">LNAV/VNAV active - FL350</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Flight Mode Annunciator */}
        <div className="mt-6 bg-gray-900 rounded-lg p-4">
          <h3 className="text-center text-lg font-semibold text-cyan-400 mb-4">
            Flight Mode Annunciator
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="bg-green-700 text-center py-2 rounded text-white font-mono text-sm">
              LNAV
            </div>
            <div className="bg-green-700 text-center py-2 rounded text-white font-mono text-sm">
              VNAV
            </div>
            <div className="bg-blue-700 text-center py-2 rounded text-white font-mono text-sm">
              A/T
            </div>
            <div className="bg-blue-700 text-center py-2 rounded text-white font-mono text-sm">
              CMD
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SystemStatus

