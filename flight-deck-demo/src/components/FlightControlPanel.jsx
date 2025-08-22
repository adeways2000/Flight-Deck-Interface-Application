import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { 
  Plane, 
  Gauge, 
  RotateCcw, 
  ArrowUp, 
  ArrowDown, 
  Settings,
  Zap,
  Fuel
} from 'lucide-react'

const FlightControlPanel = ({ flightData, onControlChange }) => {
  const [controlInputs, setControlInputs] = useState({
    throttle: [75],
    elevator: [0],
    aileron: [0],
    rudder: [0],
    flaps: 0,
    gear: false,
    spoilers: false,
    autoThrottle: true
  })

  const [engineControls, setEngineControls] = useState({
    engine1: { n1: 85.2, n2: 92.1, egt: 650, fuelFlow: 2100 },
    engine2: { n1: 85.5, n2: 92.3, egt: 648, fuelFlow: 2080 }
  })

  const updateControl = (control, value) => {
    const newInputs = { ...controlInputs, [control]: value }
    setControlInputs(newInputs)
    onControlChange?.(newInputs)
  }

  const FlapSelector = () => {
    const flapPositions = [0, 1, 5, 10, 15, 25, 30, 40]
    
    return (
      <div className="space-y-2">
        <label className="text-xs text-gray-400 font-medium">FLAPS</label>
        <div className="grid grid-cols-4 gap-1">
          {flapPositions.map(pos => (
            <Button
              key={pos}
              variant={controlInputs.flaps === pos ? "default" : "outline"}
              size="sm"
              onClick={() => updateControl('flaps', pos)}
              className={`text-xs ${
                controlInputs.flaps === pos 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : ''
              }`}
            >
              {pos}°
            </Button>
          ))}
        </div>
        <div className="text-center">
          <span className="text-green-400 font-mono text-sm">
            FLAPS {controlInputs.flaps}°
          </span>
        </div>
      </div>
    )
  }

  const ControlSlider = ({ label, value, onChange, min = -100, max = 100, step = 1, unit = "" }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-xs text-gray-400 font-medium">{label}</label>
        <span className="text-green-400 font-mono text-xs">
          {Array.isArray(value) ? value[0] : value}{unit}
        </span>
      </div>
      <Slider
        value={Array.isArray(value) ? value : [value]}
        onValueChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  )

  const ToggleControl = ({ label, value, onChange, icon: Icon, color = "blue" }) => (
    <Button
      variant={value ? "default" : "outline"}
      size="sm"
      onClick={() => onChange(!value)}
      className={`
        ${value ? `bg-${color}-600 hover:bg-${color}-700 text-white` : ''}
        transition-all duration-200 w-full
      `}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
      <span className="ml-2 text-xs">
        {value ? "ON" : "OFF"}
      </span>
    </Button>
  )

  const EngineDisplay = ({ engineNum, data }) => (
    <div className="bg-gray-900 rounded p-3 space-y-2">
      <h4 className="text-xs font-semibold text-gray-400 text-center">
        ENGINE {engineNum}
      </h4>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-gray-400">N1:</span>
          <span className="text-green-400 font-mono ml-1">{data.n1}%</span>
        </div>
        <div>
          <span className="text-gray-400">N2:</span>
          <span className="text-green-400 font-mono ml-1">{data.n2}%</span>
        </div>
        <div>
          <span className="text-gray-400">EGT:</span>
          <span className="text-green-400 font-mono ml-1">{data.egt}°C</span>
        </div>
        <div>
          <span className="text-gray-400">FF:</span>
          <span className="text-green-400 font-mono ml-1">{data.fuelFlow}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Primary Flight Controls */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-blue-400 text-center flex items-center justify-center">
            <Plane className="w-5 h-5 mr-2" />
            Flight Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ControlSlider
            label="THROTTLE"
            value={controlInputs.throttle}
            onChange={(val) => updateControl('throttle', val)}
            min={0}
            max={100}
            unit="%"
          />
          
          <ControlSlider
            label="ELEVATOR"
            value={controlInputs.elevator}
            onChange={(val) => updateControl('elevator', val)}
            min={-30}
            max={30}
            unit="°"
          />
          
          <ControlSlider
            label="AILERON"
            value={controlInputs.aileron}
            onChange={(val) => updateControl('aileron', val)}
            min={-25}
            max={25}
            unit="°"
          />
          
          <ControlSlider
            label="RUDDER"
            value={controlInputs.rudder}
            onChange={(val) => updateControl('rudder', val)}
            min={-30}
            max={30}
            unit="°"
          />

          <div className="grid grid-cols-1 gap-2">
            <ToggleControl
              label="AUTO THROTTLE"
              value={controlInputs.autoThrottle}
              onChange={(val) => updateControl('autoThrottle', val)}
              icon={Zap}
              color="green"
            />
            <ToggleControl
              label="LANDING GEAR"
              value={controlInputs.gear}
              onChange={(val) => updateControl('gear', val)}
              icon={ArrowDown}
              color="orange"
            />
            <ToggleControl
              label="SPOILERS"
              value={controlInputs.spoilers}
              onChange={(val) => updateControl('spoilers', val)}
              icon={ArrowUp}
              color="red"
            />
          </div>

          <FlapSelector />
        </CardContent>
      </Card>

      {/* Engine Controls and Monitoring */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-blue-400 text-center flex items-center justify-center">
            <Settings className="w-5 h-5 mr-2" />
            Engine Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <EngineDisplay engineNum={1} data={engineControls.engine1} />
            <EngineDisplay engineNum={2} data={engineControls.engine2} />
          </div>

          {/* Engine Control Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Fuel className="w-4 h-4 mr-1" />
              FUEL PUMP
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Zap className="w-4 h-4 mr-1" />
              IGNITION
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <RotateCcw className="w-4 h-4 mr-1" />
              ENGINE START
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Gauge className="w-4 h-4 mr-1" />
              REVERSER
            </Button>
          </div>

          {/* Control Surface Status */}
          <div className="bg-gray-900 rounded p-3">
            <h4 className="text-xs font-semibold text-gray-400 mb-2">CONTROL STATUS</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">Throttle:</span>
                <span className="text-green-400 font-mono ml-1">{controlInputs.throttle[0]}%</span>
              </div>
              <div>
                <span className="text-gray-400">Flaps:</span>
                <span className="text-green-400 font-mono ml-1">{controlInputs.flaps}°</span>
              </div>
              <div>
                <span className="text-gray-400">Gear:</span>
                <span className={`font-mono ml-1 ${controlInputs.gear ? 'text-orange-400' : 'text-green-400'}`}>
                  {controlInputs.gear ? 'DOWN' : 'UP'}
                </span>
              </div>
              <div>
                <span className="text-gray-400">A/T:</span>
                <span className={`font-mono ml-1 ${controlInputs.autoThrottle ? 'text-green-400' : 'text-gray-400'}`}>
                  {controlInputs.autoThrottle ? 'ENG' : 'OFF'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FlightControlPanel
