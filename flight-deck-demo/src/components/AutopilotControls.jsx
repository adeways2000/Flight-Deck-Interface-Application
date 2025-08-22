import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Power, Navigation, TrendingUp, Gauge } from 'lucide-react'

const AutopilotControls = ({ flightData, onAutopilotChange }) => {
  const [autopilotState, setAutopilotState] = useState({
    masterEngaged: true,
    lnav: true,
    vnav: true,
    approach: false,
    altitudeHold: true,
    headingHold: false,
    speedHold: true
  })

  const [selectedValues, setSelectedValues] = useState({
    targetAltitude: 35000,
    targetHeading: 270,
    targetSpeed: 450
  })

  const toggleAutopilotMode = (mode) => {
    const newState = {
      ...autopilotState,
      [mode]: !autopilotState[mode]
    }
    
    // If master is disengaged, turn off all other modes
    if (mode === 'masterEngaged' && !newState.masterEngaged) {
      Object.keys(newState).forEach(key => {
        if (key !== 'masterEngaged') newState[key] = false
      })
    }
    
    setAutopilotState(newState)
    onAutopilotChange?.(newState)
  }

  const updateTarget = (type, value) => {
    const newValues = { ...selectedValues, [type]: value }
    setSelectedValues(newValues)
    onAutopilotChange?.(autopilotState, newValues)
  }

  const ControlButton = ({ mode, label, icon: Icon, color = "blue" }) => {
    const isEngaged = autopilotState[mode]
    const isDisabled = !autopilotState.masterEngaged && mode !== 'masterEngaged'
    
    return (
      <Button
        variant={isEngaged ? "default" : "outline"}
        size="sm"
        onClick={() => toggleAutopilotMode(mode)}
        disabled={isDisabled}
        className={`
          ${isEngaged ? `bg-${color}-600 hover:bg-${color}-700 text-white` : ''}
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
          transition-all duration-200 min-w-[80px]
        `}
      >
        <Icon className="w-4 h-4 mr-1" />
        {label}
      </Button>
    )
  }

  const TargetSelector = ({ label, value, onChange, min, max, step = 1, unit }) => (
    <div className="flex flex-col items-center space-y-1">
      <label className="text-xs text-gray-400 font-medium">{label}</label>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(Math.max(min, value - step))}
          disabled={!autopilotState.masterEngaged}
          className="w-8 h-8 p-0"
        >
          -
        </Button>
        <div className="bg-gray-800 px-3 py-1 rounded text-center min-w-[80px]">
          <span className="text-green-400 font-mono text-sm">
            {value}{unit}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(Math.min(max, value + step))}
          disabled={!autopilotState.masterEngaged}
          className="w-8 h-8 p-0"
        >
          +
        </Button>
      </div>
    </div>
  )

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-blue-400 text-center flex items-center justify-center">
          <Navigation className="w-5 h-5 mr-2" />
          Autopilot Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Master Autopilot Control */}
        <div className="text-center">
          <ControlButton
            mode="masterEngaged"
            label="A/P"
            icon={Power}
            color={autopilotState.masterEngaged ? "green" : "red"}
          />
          <p className="text-xs text-gray-400 mt-1">
            {autopilotState.masterEngaged ? "AUTOPILOT ENGAGED" : "AUTOPILOT DISENGAGED"}
          </p>
        </div>

        {/* Navigation Modes */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-300 border-b border-gray-600 pb-1">
            Navigation Modes
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <ControlButton mode="lnav" label="LNAV" icon={Navigation} />
            <ControlButton mode="vnav" label="VNAV" icon={TrendingUp} />
            <ControlButton mode="approach" label="APP" icon={Navigation} />
            <ControlButton mode="headingHold" label="HDG" icon={Navigation} />
          </div>
        </div>

        {/* Flight Control Modes */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-300 border-b border-gray-600 pb-1">
            Flight Control
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <ControlButton mode="altitudeHold" label="ALT" icon={TrendingUp} />
            <ControlButton mode="speedHold" label="SPD" icon={Gauge} />
          </div>
        </div>

        {/* Target Selectors */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-300 border-b border-gray-600 pb-1">
            Target Values
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <TargetSelector
              label="ALTITUDE"
              value={selectedValues.targetAltitude}
              onChange={(val) => updateTarget('targetAltitude', val)}
              min={0}
              max={45000}
              step={100}
              unit=" FT"
            />
            <TargetSelector
              label="HEADING"
              value={selectedValues.targetHeading}
              onChange={(val) => updateTarget('targetHeading', val)}
              min={0}
              max={359}
              step={1}
              unit="°"
            />
            <TargetSelector
              label="SPEED"
              value={selectedValues.targetSpeed}
              onChange={(val) => updateTarget('targetSpeed', val)}
              min={100}
              max={600}
              step={5}
              unit=" KTS"
            />
          </div>
        </div>

        {/* Status Display */}
        <div className="bg-gray-900 rounded p-3">
          <h4 className="text-xs font-semibold text-gray-400 mb-2">ACTIVE MODES</h4>
          <div className="flex flex-wrap gap-1">
            {Object.entries(autopilotState)
              .filter(([key, value]) => value && key !== 'masterEngaged')
              .map(([key, _]) => (
                <span
                  key={key}
                  className="bg-green-700 text-green-100 px-2 py-1 rounded text-xs font-mono"
                >
                  {key.toUpperCase().replace(/([A-Z])/g, ' $1').trim()}
                </span>
              ))}
            {Object.values(autopilotState).every(val => !val) && (
              <span className="text-gray-500 text-xs">NO ACTIVE MODES</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AutopilotControls