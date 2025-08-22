import { useState, useEffect } from 'react'
import './App.css'
import PrimaryFlightDisplay from './components/PrimaryFlightDisplay'
import NavigationDisplay from './components/NavigationDisplay'
import EngineDisplay from './components/EngineDisplay'
import SystemStatus from './components/SystemStatus'
import CompactSystemStatus from './components/CompactSystemStatus'
import AutopilotControls from './components/AutopilotControls'
import FlightControlPanel from './components/FlightControlPanel'
import ModeControlPanel from './components/ModeControlPanel'

function App() {
  const [flightData, setFlightData] = useState({
    altitude: 35000,
    airspeed: 450,
    heading: 270,
    verticalSpeed: 0,
    attitude: { pitch: 2, roll: -1 },
    navigation: {
      currentWaypoint: 'KORD',
      nextWaypoint: 'KJFK',
      distance: 740,
      eta: '14:35'
    },
    engine: {
      n1: [85.2, 84.8],
      n2: [92.1, 91.9],
      egt: [650, 645],
      fuelFlow: [2850, 2820]
    },
    systems: {
      hydraulics: 'NORMAL',
      electrical: 'NORMAL',
      pressurization: 'NORMAL',
      autopilot: 'ENGAGED'
    }
  })

  const [autopilotState, setAutopilotState] = useState({
    masterEngaged: true,
    lnav: true,
    vnav: true,
    approach: false,
    altitudeHold: true,
    headingHold: false,
    speedHold: true
  })

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

  const handleAutopilotChange = (newState, targets) => {
    setAutopilotState(newState)
    if (targets) {
      // Update flight data based on autopilot targets
      setFlightData(prev => ({
        ...prev,
        systems: {
          ...prev.systems,
          autopilot: newState.masterEngaged ? 'ENGAGED' : 'DISENGAGED'
        }
      }))
    }
  }

  const handleControlChange = (newInputs) => {
    setControlInputs(newInputs)
    // In a real system, these would affect flight dynamics
  }

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFlightData(prev => ({
        ...prev,
        altitude: prev.altitude + (Math.random() - 0.5) * 20,
        airspeed: prev.airspeed + (Math.random() - 0.5) * 5,
        heading: (prev.heading + (Math.random() - 0.5) * 2 + 360) % 360,
        verticalSpeed: (Math.random() - 0.5) * 200,
        attitude: {
          pitch: prev.attitude.pitch + (Math.random() - 0.5) * 0.5,
          roll: prev.attitude.roll + (Math.random() - 0.5) * 0.5
        },
        engine: {
          ...prev.engine,
          n1: prev.engine.n1.map(val => val + (Math.random() - 0.5) * 0.5),
          n2: prev.engine.n2.map(val => val + (Math.random() - 0.5) * 0.3)
        }
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">
            Flight Deck Interface Demo
          </h1>
          <p className="text-gray-400">
            Interactive demonstration of modern flight deck systems
          </p>
        </header>
        
        <div className="space-y-4">
          {/* Mode Control Panel - Top Bar */}
          <ModeControlPanel 
            flightData={flightData}
            autopilotState={autopilotState}
          />
          
          {/* Main Flight Deck Layout - Integrated Design */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
            {/* Left Side - Primary Flight Display */}
            <div className="xl:col-span-1">
              <PrimaryFlightDisplay data={flightData} />
            </div>
            
            {/* Center - Navigation Display */}
            <div className="xl:col-span-1">
              <NavigationDisplay data={flightData} />
            </div>
            
            {/* Right Side - Engine Parameters */}
            <div className="xl:col-span-1">
              <EngineDisplay data={flightData} />
            </div>
            
            {/* Far Right - Autopilot Controls */}
            <div className="xl:col-span-1">
              <AutopilotControls 
                flightData={flightData}
                onAutopilotChange={handleAutopilotChange}
              />
            </div>
            
            {/* System Status - Compact */}
            <div className="xl:col-span-1">
              <CompactSystemStatus data={flightData} />
            </div>
          </div>

          {/* Lower Panel - Flight Control Panel (Full Width) */}
          <div className="w-full">
            <FlightControlPanel 
              flightData={flightData}
              onControlChange={handleControlChange}
            />
          </div>
        </div>
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Developed by Ayokunle Adebisi - Flight Deck Application</p>
          <p>Demonstrating modern flight deck interface design principles</p>
        </footer>
      </div>
    </div>
  )
}

export default App